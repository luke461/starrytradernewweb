"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar fixed beneath the nav. Tracks how far through
 * the document the reader has scrolled. Always visible (a privacy notice
 * is long enough that progress is a useful affordance, not decoration),
 * so it tracks under prefers-reduced-motion as well.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    function tick() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, Math.max(0, scrollY / docH)) : 0);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-16 z-30 h-[3px] origin-left bg-starry-blue-light/80"
      style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
    />
  );
}
