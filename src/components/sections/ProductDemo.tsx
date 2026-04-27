"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { useUi } from "@/components/providers/UiProvider";

const chapters = [
  { i: 0, label: "Onboarding and the Learning Path", time: "0:00" },
  { i: 1, label: "Stock Stories and Watchlist AI Summaries", time: "0:35" },
  { i: 2, label: "LeetTrade and the global leaderboard", time: "1:15" },
];

export function ProductDemo() {
  const { openDemo, openContact } = useUi();

  return (
    <section id="demo" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Product walkthrough"
            title="See it work."
            subtitle="A two-minute walkthrough of the platform, end to end."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <button
              type="button"
              onClick={() => openDemo(0)}
              aria-label="Play product walkthrough"
              className="group relative block w-full overflow-hidden rounded-[24px] border border-white/10 bg-starry-mid shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-starry-soft via-starry-deep to-starry-mid">
                <div className="flex h-full items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-starry-violet-deep text-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7L8 5Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.05}>
              <button
                type="button"
                onClick={() => openDemo(c.i)}
                className="group flex w-full flex-col gap-1 rounded-2xl border border-white/[0.06] bg-starry-mid/40 p-4 text-left transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:bg-starry-mid"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{c.time}</span>
                <span className="text-[14px] text-ink-primary">{c.label}</span>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-caption text-ink-muted">
          Want a live walkthrough?{" "}
          <button onClick={openContact} className="text-starry-blue-light underline underline-offset-4 hover:text-starry-blue-soft">
            Get in touch →
          </button>
        </p>
      </div>
    </section>
  );
}
