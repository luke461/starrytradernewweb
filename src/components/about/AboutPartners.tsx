"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/decoration/Reveal";
import { useUi } from "@/components/providers/UiProvider";
import { aboutPartners } from "@/content/about";

/**
 * Section G. Trimmed per v4.3.3: heading + lead + two CTAs only. The
 * partner logo wall moved to the home page and team page so the About
 * page treats this section as the institutional outreach moment rather
 * than a visual showcase.
 */
export function AboutPartners() {
  const { openContact } = useUi();

  return (
    <section id="partners" className="relative bg-starry-deep py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
            {aboutPartners.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-primary">{aboutPartners.title}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-body-lg text-ink-soft">{aboutPartners.lead}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={() => openContact("partnership")} withArrow magnetic>
              Partner with us
            </Button>
            <button
              type="button"
              onClick={() => openContact("sponsorship")}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
            >
              Support our mission <span aria-hidden>→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
