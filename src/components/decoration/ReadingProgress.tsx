"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress bar pinned to the top of the viewport.
 * Tracks how far the reader has scrolled through the document.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function compute() {
      const h = document.documentElement;
      const scrollTop = window.scrollY;
      const docHeight = h.scrollHeight - h.clientHeight;
      if (docHeight <= 0) {
        setPct(0);
        return;
      }
      setPct(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    }
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-starry-blue-light transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
