import { useCallback, useEffect, useMemo, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";

type PanZoomConfig = {
  minScale?: number;
  maxScale?: number;
};

export function usePanZoom(config: PanZoomConfig = {}) {
  const minScale = config.minScale ?? 0.35;
  const maxScale = config.maxScale ?? 1.85;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const api = useMemo(() => {
    function clamp(v: number, lo: number, hi: number) {
      return Math.min(hi, Math.max(lo, v));
    }

    function toNumber(v: unknown) {
      return typeof v === "number" ? v : Number(v);
    }

    const get = () => ({
      x: toNumber(x.get()),
      y: toNumber(y.get()),
      scale: toNumber(scale.get()),
    });

    const set = (next: { x?: number; y?: number; scale?: number }) => {
      if (typeof next.x === "number") x.set(next.x);
      if (typeof next.y === "number") y.set(next.y);
      if (typeof next.scale === "number") scale.set(clamp(next.scale, minScale, maxScale));
    };

    const animateTo = (next: { x?: number; y?: number; scale?: number }) => {
      if (typeof next.x === "number") animate(x, next.x, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
      if (typeof next.y === "number") animate(y, next.y, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
      if (typeof next.scale === "number")
        animate(scale, clamp(next.scale, minScale, maxScale), { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
    };

    const zoomAt = (clientX: number, clientY: number, nextScale: number) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = clientX - rect.left;
      const cy = clientY - rect.top;

      const cur = get();
      const s2 = clamp(nextScale, minScale, maxScale);

      const worldX = (cx - cur.x) / cur.scale;
      const worldY = (cy - cur.y) / cur.scale;

      const x2 = cx - worldX * s2;
      const y2 = cy - worldY * s2;

      set({ x: x2, y: y2, scale: s2 });
    };

    const focusWorldPoint = (worldX: number, worldY: number, opts?: { scale?: number }) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const s2 = clamp(opts?.scale ?? get().scale, minScale, maxScale);
      const x2 = rect.width / 2 - worldX * s2;
      const y2 = rect.height / 2 - worldY * s2;
      animateTo({ x: x2, y: y2, scale: s2 });
    };

    const reset = () => animateTo({ x: 0, y: 0, scale: 1 });

    return { clamp, get, set, animateTo, zoomAt, focusWorldPoint, reset };
  }, [maxScale, minScale, scale, x, y]);

  const bind = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const cur = api.get();
      api.set({ x: cur.x + dx, y: cur.y + dy });
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cur = api.get();
      const delta = -e.deltaY;
      const intensity = 0.0016;
      const next = api.clamp(cur.scale * (1 + delta * intensity), minScale, maxScale);
      api.zoomAt(e.clientX, e.clientY, next);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [api, maxScale, minScale]);

  useEffect(() => {
    const cleanup = bind();
    return cleanup;
  }, [bind]);

  return { containerRef, x, y, scale, api };
}

