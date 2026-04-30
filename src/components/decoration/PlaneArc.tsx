"use client";

import { useEffect, useRef } from "react";

type Variant = "home" | "team";

interface PlaneArcProps {
  variant?: Variant;
}

/**
 * Scroll-driven plane animation tracing a curved dotted arc between
 * Singapore and Chicago. Same component, two sizing variants:
 *
 *   - "home" — 120/160px tall, sits inside the home page TeamTeaser
 *   - "team" — 140/180px tall, sits inside the /team hero
 *
 * The plane's position on the curve maps to the user's scroll progress
 * within the surrounding section. A 0.12 low-pass filter smooths the
 * motion so the plane glides rather than jerks. The plane's nose
 * rotates to match the direction of travel.
 *
 * Decorative only: aria-hidden, pointer-events: none. The Singapore /
 * Chicago meaning is conveyed in the surrounding copy.
 *
 * Reduced-motion fallback: parks the plane mid-flight (50%) and skips
 * the rAF loop entirely, so no scroll listeners are attached.
 */
export function PlaneArc({ variant = "home" }: PlaneArcProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const flightPathProgressRef = useRef<SVGPathElement>(null);
  const planeGroupRef = useRef<SVGGElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const flightPath = flightPathRef.current;
    const flightPathProgress = flightPathProgressRef.current;
    const planeGroup = planeGroupRef.current;
    const plane = planeRef.current;
    if (!stage || !flightPath || !flightPathProgress || !planeGroup || !plane) return;

    let pathLength = flightPath.getTotalLength();
    let easedProgress = 0.5;
    let rafId: number | null = null;
    let resizeTimeout: number | null = null;

    const setupPath = () => {
      pathLength = flightPath.getTotalLength();
      flightPathProgress.setAttribute("stroke-dasharray", String(pathLength));
    };

    const updatePlanePosition = (progress: number) => {
      const point = flightPath.getPointAtLength(progress * pathLength);
      const lookAhead = Math.min(progress + 0.01, 1);
      const lookPoint = flightPath.getPointAtLength(lookAhead * pathLength);
      const angleRad = Math.atan2(lookPoint.y - point.y, lookPoint.x - point.x);
      const angleDeg = angleRad * (180 / Math.PI);
      planeGroup.setAttribute("transform", `translate(${point.x}, ${point.y})`);
      plane.setAttribute("transform", `rotate(${angleDeg})`);
      flightPathProgress.setAttribute("stroke-dashoffset", String(pathLength * (1 - progress)));
    };

    const getProgressFromScroll = () => {
      const stageRect = stage.getBoundingClientRect();
      const stageTop = stageRect.top + window.scrollY;
      const stageHeight = stageRect.height;
      const viewportHeight = window.innerHeight;
      const scrollStart = stageTop - viewportHeight * 0.85;
      const scrollEnd = stageTop + stageHeight - viewportHeight * 0.15;
      const totalScrollRange = scrollEnd - scrollStart;
      if (totalScrollRange <= 0) return 0.5;
      const raw = (window.scrollY - scrollStart) / totalScrollRange;
      return Math.max(0, Math.min(1, raw));
    };

    setupPath();
    updatePlanePosition(0.5);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const tick = () => {
      const target = getProgressFromScroll();
      easedProgress += (target - easedProgress) * 0.12;
      updatePlanePosition(easedProgress);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const handleResize = () => {
      if (resizeTimeout !== null) return;
      resizeTimeout = window.setTimeout(() => {
        setupPath();
        resizeTimeout = null;
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heightClass = variant === "home" ? "h-[120px] md:h-[160px]" : "h-[140px] md:h-[180px]";

  return (
    <div
      ref={stageRef}
      aria-hidden
      className={`pointer-events-none relative w-full overflow-visible ${heightClass}`}
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {/* Endpoint rings */}
        <circle cx={60} cy={100} r={14} fill="none" stroke="#7FC8FF" strokeWidth="1" opacity="0.4" />
        <circle cx={1140} cy={100} r={14} fill="none" stroke="#7FC8FF" strokeWidth="1" opacity="0.4" />

        {/* Endpoint dots with soft glow */}
        <circle
          cx={60}
          cy={100}
          r={6}
          fill="#7FC8FF"
          style={{ filter: "drop-shadow(0 0 6px rgba(127, 200, 255, 0.6))" }}
        />
        <circle
          cx={1140}
          cy={100}
          r={6}
          fill="#7FC8FF"
          style={{ filter: "drop-shadow(0 0 6px rgba(127, 200, 255, 0.6))" }}
        />

        {/* Base path: faint dotted line for the full route */}
        <path
          ref={flightPathRef}
          d="M 60 100 Q 600 -20 1140 100"
          fill="none"
          stroke="#9B8FFF"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />

        {/* Progress path: bright dotted line, drawn as the plane advances */}
        <path
          ref={flightPathProgressRef}
          d="M 60 100 Q 600 -20 1140 100"
          fill="none"
          stroke="#7FC8FF"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.95"
        />

        {/* Plane group: outer translates along the path, inner rotates to face direction of travel */}
        <g ref={planeGroupRef} transform="translate(600, 60)">
          <path
            d="M -16 4 L 16 4 L 14 6 L -14 6 Z"
            transform="translate(0, 8)"
            fill="#4C3FE0"
            opacity="0.2"
          />
          <g ref={planeRef} transform="rotate(0)">
            <path
              d="M 18 0 L 4 4 L -8 4 L -16 12 L -10 12 L -2 6 L -8 14 L 0 12 L 6 4 Z M 18 0 L 4 -4 L -8 -4 L -16 -12 L -10 -12 L -2 -6 L -8 -14 L 0 -12 L 6 -4 Z"
              fill="#7FC8FF"
              stroke="#7FC8FF"
              strokeWidth="0.5"
              style={{ filter: "drop-shadow(0 0 12px rgba(127, 200, 255, 0.45))" }}
            />
          </g>
        </g>
      </svg>

      {/* HTML labels overlaid on top of the SVG so type renders at a real
       *  pixel size at every viewport (preserveAspectRatio="none" would
       *  squash <text> non-uniformly on narrow phones). */}
      <span className="pointer-events-none absolute left-[5%] top-[68%] -translate-x-1/2 select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft sm:text-[11px] md:text-[12px]">
        Singapore
      </span>
      <span className="pointer-events-none absolute left-[95%] top-[68%] -translate-x-1/2 select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft sm:text-[11px] md:text-[12px]">
        Chicago
      </span>
    </div>
  );
}
