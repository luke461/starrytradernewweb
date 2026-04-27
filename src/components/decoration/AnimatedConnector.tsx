"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Soft animated SVG line "drawn" between two endpoints when scrolled into view.
 * Stars at each end pulse subtly.
 */
export function AnimatedConnector({ label, surface = "dark" }: { label?: string; surface?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const stroke = surface === "light" ? "#9B8FFF" : "#7FC8FF";
  const labelColor = surface === "light" ? "text-ink-on-light-soft" : "text-ink-muted";

  return (
    <div ref={ref} className="flex items-center gap-3" aria-hidden>
      <svg viewBox="0 0 200 40" className="h-8 w-40 sm:w-56">
        <motion.circle
          cx="6"
          cy="20"
          r="3.5"
          fill={stroke}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M10 20 C 60 8, 140 32, 194 20"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <motion.circle
          cx="194"
          cy="20"
          r="3.5"
          fill={stroke}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        />
      </svg>
      {label && <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${labelColor}`}>{label}</span>}
      <svg viewBox="0 0 200 40" className="h-8 w-40 sm:w-56 scale-x-[-1]">
        <motion.circle cx="6" cy="20" r="3.5" fill={stroke} initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.4 }} />
        <motion.path
          d="M10 20 C 60 8, 140 32, 194 20"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <motion.circle cx="194" cy="20" r="3.5" fill={stroke} initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.4, delay: 1.4 }} />
      </svg>
    </div>
  );
}
