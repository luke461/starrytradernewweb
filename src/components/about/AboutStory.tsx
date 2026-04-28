"use client";

import { Reveal } from "@/components/decoration/Reveal";
import { aboutStory } from "@/content/about";

/**
 * Section B. Three-paragraph story column with a vertical timeline on the
 * right. The bridge sentence gets a typographic emphasis to lead into
 * "Why we're free".
 */
export function AboutStory() {
  return (
    <section className="relative bg-light-mist py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
              {aboutStory.eyebrow}
            </p>
            <h2 className="mt-5 text-section text-ink-on-light">{aboutStory.title}</h2>
          </Reveal>

          <div className="mt-8 space-y-6 text-body-lg text-ink-on-light-soft">
            {aboutStory.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.04}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl font-display text-[24px] font-semibold leading-snug text-ink-on-light md:text-[28px]">
              {aboutStory.bridge}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Timeline />
        </Reveal>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <ol className="relative hidden lg:block">
      <span
        aria-hidden
        className="absolute left-[7px] top-1 bottom-1 w-px"
        style={{ background: "var(--starry-violet-soft)" }}
      />
      {aboutStory.timeline.map((node, i) => (
        <li key={i} className={`relative pl-8 ${i > 0 ? "mt-10" : ""}`}>
          <span
            aria-hidden
            className="absolute left-0 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white"
            style={{ borderColor: "var(--starry-blue-light)" }}
          >
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--starry-violet-deep)" }} />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep">{node.year}</p>
          <p className="mt-1 text-[15px] text-ink-on-light-soft">{node.note}</p>
        </li>
      ))}
    </ol>
  );
}
