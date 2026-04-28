"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Six-dot light-blue constellation that animates in once when the hero
 * scrolls into view, then stays static. Six dots arrange around the word
 * "Free" and thin lines draw between them to form an outline. 1.2s total.
 *
 * Renders as an absolutely-positioned SVG overlay above the headline.
 * Respects prefers-reduced-motion (renders the final state immediately).
 */
export function FreeConstellation({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Six dots laid out roughly above the F-R-E-E shape.
  const dots: { x: number; y: number; r: number }[] = [
    { x: 12, y: 18, r: 2.6 },
    { x: 38, y: 8, r: 2.0 },
    { x: 70, y: 12, r: 2.4 },
    { x: 102, y: 20, r: 2.0 },
    { x: 132, y: 8, r: 2.4 },
    { x: 168, y: 18, r: 2.8 },
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ] as const;

  // Stagger durations chosen so the full sequence completes in ~1.2s.
  // Dots: 0–700ms (six dots, ~120ms apart). Lines: 600–1200ms.
  const showFinal = revealed || reduceMotion;

  return (
    <svg
      ref={ref}
      viewBox="0 0 180 28"
      className={className}
      aria-hidden
      role="presentation"
    >
      <g>
        {lines.map(([a, b], i) => {
          const da = dots[a];
          const db = dots[b];
          const length = Math.hypot(db.x - da.x, db.y - da.y);
          return (
            <line
              key={`l-${i}`}
              x1={da.x}
              y1={da.y}
              x2={db.x}
              y2={db.y}
              stroke="#7FC8FF"
              strokeWidth={0.9}
              strokeLinecap="round"
              opacity={showFinal ? 0.7 : 0}
              strokeDasharray={length}
              strokeDashoffset={showFinal ? 0 : length}
              style={{
                transition: reduceMotion
                  ? "none"
                  : `stroke-dashoffset 380ms cubic-bezier(0.16, 1, 0.3, 1) ${600 + i * 90}ms, opacity 200ms ease ${600 + i * 90}ms`,
              }}
            />
          );
        })}
      </g>
      <g>
        {dots.map((d, i) => (
          <circle
            key={`d-${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#7FC8FF"
            opacity={showFinal ? 1 : 0}
            style={{
              transformOrigin: `${d.x}px ${d.y}px`,
              transform: showFinal ? "scale(1)" : "scale(0.4)",
              transition: reduceMotion
                ? "none"
                : `opacity 240ms ease ${i * 110}ms, transform 320ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 110}ms`,
              filter: "drop-shadow(0 0 6px rgba(127, 200, 255, 0.6))",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
