"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AtAGlanceIcon } from "@/content/privacy";

type Card = {
  icon: AtAGlanceIcon;
  title: string;
  answer: string;
  anchor: string;
};

/**
 * Layer 1 of the privacy notice: an 8-card scannable summary.
 * Each card anchor-links to its corresponding section in Layer 2.
 */
export function AtAGlanceCards({ cards }: { cards: readonly Card[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => {
        const Icon = iconMap[c.icon];
        return (
          <motion.li
            key={c.title + c.anchor}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={`#${c.anchor}`}
              className="group block h-full rounded-2xl border border-starry-violet-soft/25 bg-white p-6 shadow-[0_10px_24px_-16px_rgba(31,39,71,0.18)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_18px_36px_-18px_rgba(76,63,224,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light focus-visible:ring-offset-2 focus-visible:ring-offset-light-pale"
            >
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-starry-violet-soft/15 text-starry-violet-deep transition-colors duration-200 group-hover:bg-starry-violet-soft/25"
              >
                <Icon />
              </span>
              <h3 className="mt-4 font-display text-[16px] font-semibold leading-snug text-ink-on-light">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-on-light-soft">
                {c.answer}
              </p>
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const iconMap: Record<AtAGlanceIcon, () => React.ReactElement> = {
  Eye: () => (
    <svg {...iconProps}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Target: () => (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  Ban: () => (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6 18.4 18.4" />
    </svg>
  ),
  Share2: () => (
    <svg {...iconProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  ),
  Clock: () => (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Globe: () => (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  User: () => (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  Mail: () => (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
};
