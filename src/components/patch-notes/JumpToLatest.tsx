"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating jump pill for /patch-notes. Appears once the user has
 * scrolled past the hero. Default state points down to the latest
 * patch ("Jump to today"). Once the closer card is in view, it
 * flips and points back to the top of the timeline ("Back to start").
 * Hidden during the hero so it does not compete with the page intro.
 *
 * Anchor ids it scrolls to:
 *   #patch-timeline-top   (first patch card, set in PatchTimeline)
 *   #patch-notes-closer   (closer card, set in PatchTimeline)
 */
export function JumpToLatest() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    let raf = 0;
    function tick() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      // Hide while still inside the hero (first ~60% of the first viewport).
      const passedHero = scrollY > vh * 0.6;
      // Treat the closer as "in view" when within half a viewport of the bottom.
      const nearBottom = scrollY + vh > docH - vh * 0.5;
      setVisible(passedHero);
      setAtBottom(nearBottom);
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

  const handleClick = useCallback(() => {
    const targetId = atBottom ? "patch-timeline-top" : "patch-notes-closer";
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: atBottom ? "start" : "center",
    });
  }, [atBottom, reduceMotion]);

  const label = atBottom ? "Back to start" : "Jump to today";
  const ariaLabel = atBottom
    ? "Scroll back to the first patch"
    : "Scroll to the latest patch";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.94 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className="group fixed right-5 z-40 inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-white/15 bg-starry-mid/85 py-3 pl-3.5 pr-5 text-[13px] font-medium text-ink-primary shadow-[0_18px_40px_-18px_rgba(11,16,36,0.85)] backdrop-blur-md transition-colors duration-200 hover:bg-starry-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light focus-visible:ring-offset-2 focus-visible:ring-offset-starry-deep md:right-8"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)",
            touchAction: "manipulation",
          }}
        >
          <span
            aria-hidden
            className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 scale-[1.4] rounded-full opacity-80 blur-md transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, rgba(127,200,255,0.35), rgba(127,200,255,0) 70%)",
              }}
            />
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
              <path
                d="M12 2c.4 4.5 1.6 7 4.5 8.2-2.9 1.3-4 3.8-4.5 8.3-.4-4.5-1.6-7-4.5-8.3C10.4 9 11.6 6.5 12 2Z"
                fill="#7FC8FF"
              />
            </svg>
          </span>

          <span className="leading-none">{label}</span>

          <motion.span
            aria-hidden
            key={atBottom ? "up" : "down"}
            initial={{ opacity: 0, y: atBottom ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex shrink-0 items-center text-starry-blue-light"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                atBottom ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
              }`}
            >
              {atBottom ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
            </svg>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
