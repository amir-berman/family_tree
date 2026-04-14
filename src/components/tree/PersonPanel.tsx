"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Person, PersonId } from "@/mock/family";
import { getCloseRelatives } from "@/mock/family";
import { RoseIcon } from "@/components/tree/icons";
import { cn } from "@/lib/cn";

function formatLifeDates(person: Person) {
  const b = person.birthDate ?? "—";
  const d = person.deathDate ? person.deathDate : person.isDeceased ? "—" : null;
  if (!d) return `נולד/ה: ${b}`;
  return `(${b}–${d})`;
}

function avatarSeed(person: Person) {
  const seed = person.id.length + person.fullNameHe.length;
  const hues = [268, 204, 156, 38, 338];
  const h = hues[seed % hues.length]!;
  return `linear-gradient(135deg, hsla(${h}, 92%, 70%, .28), hsla(${h + 22}, 92%, 55%, .10))`;
}

function RelRow({
  title,
  people,
  onPick,
}: {
  title: string;
  people: Person[];
  onPick: (id: PersonId) => void;
}) {
  if (!people.length) return null;
  return (
    <div className="space-y-2">
      <div className="text-xs text-pearl-400/90">{title}</div>
      <div className="flex flex-wrap gap-2">
        {people.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(p.id)}
            className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.08]"
          >
            {p.fullNameHe}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PersonPanel({
  person,
  onClose,
  onPickRelative,
}: {
  person: Person | null;
  onClose: () => void;
  onPickRelative: (id: PersonId) => void;
}) {
  const rel = person ? getCloseRelatives(person.id) : null;

  return (
    <AnimatePresence>
      {person ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className={cn(
              "fixed left-0 top-0 z-50 h-dvh w-[380px] max-w-[92vw]",
              "border-r border-white/10 bg-ink-50/75 shadow-soft backdrop-blur-xl",
            )}
            aria-label="פרטי אדם"
          >
            <div className="flex h-full flex-col">
              <div className="relative border-b border-white/10 p-5">
                <div className="absolute inset-0 bg-[radial-gradient(800px_220px_at_35%_0%,rgba(124,58,237,.18),rgba(0,0,0,0)),radial-gradient(700px_220px_at_85%_20%,rgba(14,165,233,.10),rgba(0,0,0,0))]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="relative h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-white/12 shadow-glow"
                      style={{ backgroundImage: avatarSeed(person) }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(22px_22px_at_30%_25%,rgba(255,255,255,.22),rgba(255,255,255,0))]" />
                      <div className="relative grid h-full w-full place-items-center text-lg font-semibold text-pearl-50">
                        {person.fullNameHe.slice(0, 1)}
                      </div>
                      {person.isDeceased ? (
                        <div className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink-50/80 ring-1 ring-white/12">
                          <RoseIcon className="h-3.5 w-3.5 text-rose-200/90" />
                        </div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold tracking-tight text-pearl-50">
                          {person.fullNameHe}
                        </div>
                        {person.isDeceased ? (
                          <div className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-1 text-[11px] text-pearl-200/90 ring-1 ring-white/10">
                            <RoseIcon className="h-3.5 w-3.5 text-rose-200/90" />
                            <span>לזכרו/ה</span>
                          </div>
                        ) : null}
                      </div>
                      <div className="text-xs text-pearl-400/90">{formatLifeDates(person)}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.09]"
                  >
                    סגירה
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-5 overflow-auto p-5">
                <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                  <div className="text-xs text-pearl-400/90">ביוגרפיה קצרה</div>
                  <div className="mt-2 text-sm leading-7 text-pearl-200/85">
                    {person.bioHe ?? "—"}
                  </div>
                </div>

                {rel ? (
                  <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                    <div className="text-sm font-semibold tracking-tight text-pearl-50">
                      קשרים קרובים
                    </div>
                    <div className="mt-4 space-y-4">
                      <RelRow title="בן/בת זוג" people={rel.spouses} onPick={onPickRelative} />
                      <RelRow title="הורים" people={rel.parents} onPick={onPickRelative} />
                      <RelRow title="ילדים" people={rel.children} onPick={onPickRelative} />
                    </div>
                  </div>
                ) : null}

                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                  <div className="text-xs text-pearl-400/90">פעולות</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/person/${person.id}`}
                      className="rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-ink-50 shadow-glow"
                    >
                      לפרופיל מלא
                    </Link>
                    <button
                      type="button"
                      onClick={() => onPickRelative(person.id)}
                      className="rounded-full bg-white/[0.06] px-4 py-2 text-xs font-medium text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.09]"
                    >
                      מיקוד בעץ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

