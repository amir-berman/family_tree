"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import {
  getPersonById,
  getCloseRelatives,
  persons,
  relationships,
  type Person,
  type PersonId,
} from "@/mock/family";
import { usePanZoom } from "@/components/tree/usePanZoom";
import { PersonNode } from "@/components/tree/PersonNode";
import { PersonPanel } from "@/components/tree/PersonPanel";
import { buildGenerationLayout } from "@/components/tree/layout";

function nodeCenter(n: { x: number; y: number }, meta: { nodeWidth: number; nodeHeight: number }) {
  return { cx: n.x + meta.nodeWidth / 2, cy: n.y + meta.nodeHeight / 2 - 6 };
}

function edgePath(from: { cx: number; cy: number }, to: { cx: number; cy: number }) {
  const dx = Math.abs(to.cx - from.cx);
  const curve = Math.max(90, dx * 0.45);
  const c1x = from.cx + (to.cx > from.cx ? curve : -curve);
  const c2x = to.cx + (to.cx > from.cx ? -curve : curve);
  return `M ${from.cx} ${from.cy} C ${c1x} ${from.cy}, ${c2x} ${to.cy}, ${to.cx} ${to.cy}`;
}

export function TreeScene() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const layout = useMemo(
    () => buildGenerationLayout(persons.map((p) => p.id), relationships),
    [],
  );
  const { nodes, edges, nodeById, world, meta } = layout;
  const { containerRef, x, y, scale, api } = usePanZoom();

  const [selectedId, setSelectedId] = useState<PersonId | null>(null);
  const selectedPerson: Person | null = selectedId ? getPersonById(selectedId) : null;

  const select = (id: PersonId, opts?: { focus?: boolean; pushUrl?: boolean }) => {
    setSelectedId(id);

    const pushUrl = opts?.pushUrl ?? true;
    if (pushUrl) {
      const next = new URLSearchParams(searchParams?.toString());
      next.set("p", id);
      router.replace(`/tree?${next.toString()}`);
    }

    if (opts?.focus ?? true) {
      const n = nodeById.get(id);
      if (n) api.focusWorldPoint(n.x + meta.nodeWidth / 2, n.y + meta.nodeHeight / 2, { scale: Math.max(0.92, api.get().scale) });
    }
  };

  useEffect(() => {
    const p = searchParams?.get("p");
    if (!p) return;
    const maybe = getPersonById(p as PersonId);
    if (maybe) {
      setSelectedId(maybe.id);
      const n = nodeById.get(maybe.id);
      if (n) {
        // initial focus feels cinematic
        api.animateTo({ scale: 1.05 });
        api.focusWorldPoint(n.x + meta.nodeWidth / 2, n.y + meta.nodeHeight / 2, { scale: 1.05 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Start with a gentle framing that feels like “arriving” in the world.
    const initial = nodeById.get("p_noa") ?? nodes[0];
    api.set({ x: -240, y: -160, scale: 0.9 });
    if (initial) api.focusWorldPoint(initial.x + meta.nodeWidth / 2, initial.y + meta.nodeHeight / 2, { scale: 0.98 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edgeGeoms = useMemo(() => {
    return edges
      .map((e) => {
        const a = nodeById.get(e.from);
        const b = nodeById.get(e.to);
        if (!a || !b) return null;
        const p = edgePath(nodeCenter(a, meta), nodeCenter(b, meta));
        return { ...e, path: p };
      })
      .filter((e): e is NonNullable<typeof e> => Boolean(e));
  }, [edges, meta, nodeById]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();

      const rel = getCloseRelatives(selectedId);
      const cur = nodeById.get(selectedId);
      if (!cur) return;

      const parents = rel.parents.map((p) => p.id);
      const children = rel.children.map((p) => p.id);
      const spouses = rel.spouses.map((p) => p.id);

      const siblingIds = (() => {
        // siblings: share at least one parent with current
        const parentSet = new Set(parents);
        const sibs = new Set<PersonId>();
        for (const c of persons) {
          if (c.id === selectedId) continue;
          const r2 = getCloseRelatives(c.id);
          const theirParents = r2.parents.map((p) => p.id);
          if (theirParents.some((p) => parentSet.has(p))) sibs.add(c.id);
        }
        return [...sibs];
      })();

      const pickFrom = (ids: PersonId[], chooser: (a: PersonId, b: PersonId) => PersonId) => {
        if (!ids.length) return null;
        return ids.reduce((acc, id) => (acc ? chooser(acc, id) : id), null as PersonId | null);
      };

      const leftRightCandidate = (dir: "left" | "right") => {
        const candidates = [...spouses, ...siblingIds]
          .map((id) => ({ id, n: nodeById.get(id) }))
          .filter((x): x is { id: PersonId; n: NonNullable<typeof x.n> } => Boolean(x.n))
          .filter((x) => x.n.generation === cur.generation);
        const filtered = candidates.filter((c) => (dir === "left" ? c.n.x < cur.x : c.n.x > cur.x));
        if (!filtered.length) return null;
        filtered.sort((a, b) => Math.abs(a.n.x - cur.x) - Math.abs(b.n.x - cur.x));
        return filtered[0]!.id;
      };

      if (e.key === "ArrowUp") {
        const next = pickFrom(parents, (a, b) => {
          const na = nodeById.get(a);
          const nb = nodeById.get(b);
          if (!na || !nb) return a;
          return Math.abs(na.x - cur.x) < Math.abs(nb.x - cur.x) ? a : b;
        });
        if (next) select(next);
      }

      if (e.key === "ArrowDown") {
        const next = pickFrom(children, (a, b) => {
          const na = nodeById.get(a);
          const nb = nodeById.get(b);
          if (!na || !nb) return a;
          return Math.abs(na.x - cur.x) < Math.abs(nb.x - cur.x) ? a : b;
        });
        if (next) select(next);
      }

      if (e.key === "ArrowLeft") {
        const next = leftRightCandidate("left");
        if (next) select(next);
      }

      if (e.key === "ArrowRight") {
        const next = leftRightCandidate("right");
        if (next) select(next);
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as EventListener);
  }, [nodeById, selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative h-[74vh] min-h-[560px] bg-white/[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_0%,rgba(255,255,255,.10),rgba(0,0,0,0)),radial-gradient(900px_520px_at_80%_20%,rgba(124,58,237,.16),rgba(0,0,0,0)),radial-gradient(820px_480px_at_35%_95%,rgba(14,165,233,.10),rgba(0,0,0,0))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.04),rgba(255,255,255,0))]" />

          <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
            <div className="rounded-full bg-ink-50/70 px-3 py-1.5 text-xs text-pearl-200/90 ring-1 ring-white/10 backdrop-blur-xl">
              גררו כדי לנוע · גלגלת כדי להתקרב/להתרחק
            </div>
          </div>

          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => api.animateTo({ scale: api.get().scale * 1.12 })}
              className="rounded-full bg-ink-50/70 px-3 py-1.5 text-xs text-pearl-50 ring-1 ring-white/10 hover:bg-ink-50/85 backdrop-blur-xl"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => api.animateTo({ scale: api.get().scale / 1.12 })}
              className="rounded-full bg-ink-50/70 px-3 py-1.5 text-xs text-pearl-50 ring-1 ring-white/10 hover:bg-ink-50/85 backdrop-blur-xl"
            >
              –
            </button>
            <button
              type="button"
              onClick={() => api.reset()}
              className="rounded-full bg-ink-50/70 px-3 py-1.5 text-xs text-pearl-50 ring-1 ring-white/10 hover:bg-ink-50/85 backdrop-blur-xl"
            >
              איפוס
            </button>
          </div>

          <div
            ref={containerRef}
            className={cn(
              "absolute inset-0 z-10",
              "touch-none cursor-grab active:cursor-grabbing",
            )}
          >
            <motion.div
              className="relative"
              style={{ width: world.width, height: world.height, x, y, scale }}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${world.width} ${world.height}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 .55 0"
                      result="glow"
                    />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(255,255,255,0)" />
                    <stop offset="0.5" stopColor="rgba(255,255,255,.30)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <linearGradient id="edgeGradWarm" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(255,255,255,0)" />
                    <stop offset="0.5" stopColor="rgba(251,191,36,.22)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                {edgeGeoms.map((e) => {
                  const active =
                    selectedId && (e.from === selectedId || e.to === selectedId);
                  const stroke =
                    e.kind === "spouse"
                      ? active
                        ? "rgba(251,191,36,.34)"
                        : "rgba(251,191,36,.18)"
                      : active
                        ? "rgba(255,255,255,.38)"
                        : "rgba(255,255,255,.20)";

                  return (
                    <g key={e.id} filter="url(#softGlow)">
                      <motion.path
                        d={e.path}
                        stroke={stroke}
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        fill="none"
                        initial={false}
                        animate={{
                          opacity: active ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.path
                        d={e.path}
                        stroke={e.kind === "spouse" ? "url(#edgeGradWarm)" : "url(#edgeGrad)"}
                        strokeWidth={6}
                        strokeLinecap="round"
                        fill="none"
                        opacity={active ? 0.9 : 0.55}
                        strokeDasharray="10 26"
                        animate={{
                          strokeDashoffset: [0, -72],
                          opacity: active ? 0.9 : 0.55,
                        }}
                        transition={{
                          duration: active ? 4.8 : 7.2,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-0">
                {nodes.map((n) => {
                  const p = getPersonById(n.id);
                  if (!p) return null;
                  const selected = selectedId === n.id;
                  return (
                    <div
                      key={n.id}
                      className="absolute"
                      style={{ left: n.x, top: n.y }}
                    >
                      <PersonNode
                        person={p}
                        selected={selected}
                        onSelect={() => select(n.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className="rounded-full bg-ink-50/70 px-3 py-1.5 text-[11px] text-pearl-300/90 ring-1 ring-white/10 backdrop-blur-xl">
              {persons.length} אנשים · {relationships.length} קשרים
            </div>
          </div>
        </div>
      </Card>

      <PersonPanel
        person={selectedPerson}
        onClose={() => setSelectedId(null)}
        onPickRelative={(id) => select(id, { focus: true, pushUrl: true })}
      />
    </div>
  );
}

