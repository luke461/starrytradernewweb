"use client";

import { useEffect, useState } from "react";
import type { PrivacySection } from "@/content/privacy";

type Props = {
  sections: readonly PrivacySection[];
};

/**
 * Layer 2 navigation. Sticky table of contents on the left for desktop;
 * a collapsible dropdown using native <details>/<summary> on mobile.
 *
 * The active section is the one closest to the top of the viewport,
 * detected via IntersectionObserver. Anchor jumps use the browser's
 * native smooth scroll (set globally in globals.css).
 */
export function PrivacyTOC({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>(); // id -> top distance from viewport top

    function recompute() {
      let bestId = activeId;
      let bestTop = Infinity;
      visible.forEach((top, id) => {
        // The section whose top is just past the nav (positive small) wins.
        if (top >= -8 && top < bestTop) {
          bestTop = top;
          bestId = id;
        }
      });
      setActiveId(bestId);
    }

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visible.set(s.id, entry.boundingClientRect.top - 96);
            } else {
              visible.delete(s.id);
            }
          });
          recompute();
        },
        // Activate while the section is anywhere in the viewport, biased to the top.
        { rootMargin: "-96px 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
    // sections is a stable readonly array from a const file, safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Desktop sticky TOC */}
      <nav
        aria-label="On this page"
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-auto"
      >
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-starry-violet-deep">
          On this page
        </p>
        <ul className="space-y-1">
          {sections.map((s) => {
            const active = activeId === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block rounded-r-md border-l-[3px] py-2 pl-4 pr-3 text-[14px] leading-snug transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light focus-visible:ring-offset-2 focus-visible:ring-offset-light-pale ${
                    active
                      ? "border-starry-blue-light bg-starry-violet-soft/15 font-medium text-starry-violet-deep"
                      : "border-transparent text-ink-on-light-soft hover:border-starry-violet-soft/40 hover:bg-starry-violet-soft/5 hover:text-ink-on-light"
                  }`}
                  aria-current={active ? "true" : undefined}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep/70">
                    {s.letter}.
                  </span>{" "}
                  {s.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile dropdown TOC */}
      <details className="group sticky top-16 z-20 mb-6 rounded-xl border border-starry-violet-soft/25 bg-white shadow-sm lg:hidden">
        <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-[14px] font-medium text-ink-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light marker:hidden [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-starry-violet-deep">
            Jump to section
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="text-starry-violet-deep transition-transform duration-200 group-open:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <ul className="border-t border-starry-violet-soft/20 px-2 pb-2 pt-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block min-h-[44px] rounded-md px-3 py-2.5 text-[14px] text-ink-on-light-soft hover:bg-starry-violet-soft/10 hover:text-ink-on-light"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep/70">
                  {s.letter}.
                </span>{" "}
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
