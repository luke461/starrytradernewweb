"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const chapters = [
  { label: "Onboarding and the Learning Path", time: "0:00" },
  { label: "Stock Stories and Watchlist AI Summaries", time: "0:35" },
  { label: "LeetTrade and the global leaderboard", time: "1:15" },
];

export function DemoModal({ open, chapter, onClose }: { open: boolean; chapter: number; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-title"
        >
          <div className="absolute inset-0 bg-starry-deep/80 backdrop-blur-md" />
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[20px] border border-white/10 bg-starry-mid shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-start justify-between gap-3 px-6 pt-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Product walkthrough</p>
                <h3 id="demo-title" className="mt-1 font-display text-[20px] font-semibold text-ink-primary">See it work.</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 rounded-full p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-5 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Coming soon</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                The recorded walkthrough is in production. Want a live demo?{" "}
                <a className="text-starry-blue-light underline underline-offset-4" href="mailto:team@starrytrader.com">Email us</a>.
              </p>
            </div>
            <div className="border-t border-white/5 bg-starry-deep/40 px-6 py-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">Chapters</p>
              <ul className="space-y-1.5">
                {chapters.map((c, i) => (
                  <li key={c.label} className={`flex items-baseline gap-3 text-[13px] ${i === chapter ? "text-ink-primary" : "text-ink-soft"}`}>
                    <span className="font-mono text-ink-muted shrink-0 w-9">{c.time}</span>
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
