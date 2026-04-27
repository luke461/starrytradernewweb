"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Soft radial-gradient glow that follows the cursor.
 * Hidden on touch devices and under prefers-reduced-motion.
 * Listens to body data-surface attribute to switch tone on light sections.
 */
export function CursorFollow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || motion.matches) return;
    setEnabled(true);

    function onMove(e: PointerEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    function tick() {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.18;
      current.current.y += dy * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 100}px, ${current.current.y - 100}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[200px] w-[200px] rounded-full opacity-70 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(155,143,255,0.32) 0%, rgba(127,200,255,0.18) 35%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
