"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Massive "Too many words." pull quote that reveals word-by-word
 * as the user scrolls past. Andre's signature founder moment.
 */
const sentence = "Too many words.";
const words = sentence.split(" ");

export function TooManyWords() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative my-20">
      <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
        The three-word answer that started a company
      </p>
      <h2
        className="font-display font-bold leading-[1.02] tracking-[-0.025em] text-ink-primary"
        style={{ fontSize: "clamp(56px, 11vw, 144px)" }}
      >
        <span className="text-ink-primary/30">“</span>
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        ))}
        <span className="text-ink-primary/30">”</span>
      </h2>
      <motion.p
        className="mt-8 max-w-xl text-body-lg italic text-ink-soft"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        That single line is the entire founding insight. The financial information was already free, already public, already accessible. It just wasn’t legible.
      </motion.p>
    </div>
  );
}

/**
 * NS bunk → NUS → future star. Constellation drawn as the user scrolls in.
 */
export function NsBunkToNus() {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div className="relative my-16">
      <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
        The path so far
      </p>
      <svg ref={ref} viewBox="0 0 600 160" className="w-full max-w-2xl">
        <motion.path
          d="M60 110 Q 220 30 320 90 T 540 60"
          stroke="#7FC8FF"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {[
          { x: 60, y: 110, label: "Singapore", sub: "NS bunk · 2024" },
          { x: 320, y: 90, label: "Singapore", sub: "NUS School of Computing · 2026" },
          { x: 540, y: 60, label: "·", sub: "Future" },
        ].map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={i === 1 ? 6 : 4.5}
              fill="#7FC8FF"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.6 }}
            />
            <motion.text
              x={p.x}
              y={p.y + 24}
              textAnchor="middle"
              fontSize="11"
              fontFamily="ui-monospace, JetBrains Mono, monospace"
              fill="#C7CCE6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.6 }}
            >
              {p.label}
            </motion.text>
            <motion.text
              x={p.x}
              y={p.y + 38}
              textAnchor="middle"
              fontSize="9"
              fontFamily="ui-monospace, JetBrains Mono, monospace"
              fill="#8089AD"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.6 }}
            >
              {p.sub}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}
