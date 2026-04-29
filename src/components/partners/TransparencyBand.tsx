"use client";

import { motion, type Variants } from "framer-motion";

const principles = [
  {
    icon: SearchIcon,
    text: "We choose partners on educational fit, not on payment.",
  },
  {
    icon: EyeOffIcon,
    text: "We do not accept payment for placement. Anywhere.",
  },
  {
    icon: EyeIcon,
    text: "We disclose every partnership in plain English on this page.",
  },
];

const tick: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function TransparencyBand() {
  return (
    <section className="relative bg-light-pale py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-center font-display text-[28px] font-semibold leading-tight text-ink-on-light md:text-[32px]">
          How we work with partners.
        </h2>

        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((p, i) => (
            <li key={i} className="flex flex-col items-center text-center md:items-start md:text-left">
              <motion.span
                aria-hidden
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={tick}
                transition={{
                  delay: 0.12 * i,
                  duration: 0.2,
                  ease: [0.16, 1.6, 0.3, 1],
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-starry-violet-soft/20 text-starry-violet-deep"
              >
                <p.icon />
              </motion.span>
              <p className="mt-5 max-w-[260px] text-[15px] leading-relaxed text-ink-on-light-soft md:max-w-none">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.88 5.08A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7-.39.86-.88 1.66-1.46 2.39" />
      <path d="M6.61 6.61C4.31 8.07 2.7 10.34 2 12c1.73 3.89 6 7 11 7a10.94 10.94 0 0 0 5.43-1.43" />
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
