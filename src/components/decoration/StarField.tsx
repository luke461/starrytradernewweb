"use client";

import { useEffect, useRef, useState } from "react";

type Star = { x: number; y: number; r: number; depth: 0 | 1 | 2; baseAlpha: number };

const STAR_COUNT = 200;

const LAUNCH_COMPLETE_EVENT = "starry:launch-complete";

/**
 * Three-layer star field rendered on a fixed-position canvas.
 * Subtle parallax follows scroll. Skips animation under prefers-reduced-motion.
 *
 * v4.2 launch coordination: when the LaunchAnimation overlay is in flight
 * (signalled via `document.body.dataset.launchPending = "1"`), the canvas
 * starts at opacity 0 and fades to its normal opacity over 800ms once the
 * `starry:launch-complete` event fires. On repeat session visits the canvas
 * mounts at normal opacity immediately.
 */
export function StarField() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [opacity, setOpacity] = useState<number>(() => {
    if (typeof document === "undefined") return 0.8;
    return document.body.dataset.launchPending === "1" ? 0 : 0.8;
  });

  useEffect(() => {
    if (opacity === 0.8) return;
    const onComplete = () => setOpacity(0.8);
    window.addEventListener(LAUNCH_COMPLETE_EVENT, onComplete, { once: true });
    return () => window.removeEventListener(LAUNCH_COMPLETE_EVENT, onComplete);
  }, [opacity]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    let stars: Star[] = [];
    function seed() {
      stars = Array.from({ length: STAR_COUNT }, () => {
        const depth = (Math.floor(Math.random() * 3) as 0 | 1 | 2);
        const r = depth === 0 ? Math.random() * 0.6 + 0.3 : depth === 1 ? Math.random() * 0.9 + 0.5 : Math.random() * 1.3 + 0.7;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 1.6,
          r,
          depth,
          baseAlpha: Math.random() * 0.5 + 0.25,
        };
      });
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const scrollY = window.scrollY;
      const t = reduceMotion ? 0 : performance.now() * 0.0006;
      for (const s of stars) {
        const offset = s.depth === 0 ? scrollY * 0.04 : s.depth === 1 ? scrollY * 0.08 : scrollY * 0.16;
        const y = s.y - offset;
        if (y < -10 || y > window.innerHeight + 10) continue;
        const twinkle = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(t + s.x * 0.01 + s.y * 0.013);
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.fillStyle = s.depth === 2 ? `rgba(184, 222, 255, ${alpha})` : `rgba(199, 204, 230, ${alpha})`;
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let raf = 0;
    function tick() {
      render();
      raf = requestAnimationFrame(tick);
    }

    function onResize() {
      size();
      seed();
    }

    size();
    seed();
    if (reduceMotion) {
      render();
    } else {
      tick();
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity,
        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}
