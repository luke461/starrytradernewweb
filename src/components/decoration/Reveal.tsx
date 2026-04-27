"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Section reveal-on-scroll. Translates up 16px and fades in once.
 * Honours prefers-reduced-motion via the global CSS rule in globals.css.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
