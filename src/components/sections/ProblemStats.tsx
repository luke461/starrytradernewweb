"use client";

import { Card } from "@/components/ui/Card";
import { StatNumber } from "@/components/ui/StatNumber";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { problemStats } from "@/content/home";
import { site } from "@/lib/site";

export function ProblemStats() {
  return (
    <section id="research" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The why"
            title="The numbers describe a generation, not a niche."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {problemStats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <Card glow="blue" interactive className="h-full">
                <StatNumber value={s.value} className="text-[64px] md:text-[72px]" />
                <p className="mt-5 text-body-lg text-ink-primary">{s.headline}</p>
                <p className="mt-4 font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">
                  Source: {s.source}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-14 max-w-3xl text-balance text-body-lg text-ink-soft">
            Gen Z is the most financially anxious, least financially literate, and most easily misled generation in modern history. They grew up with social media as their primary financial educator, entered markets during the most volatile decade in recent memory, and faced systemic headwinds their predecessors did not. StarryTrader is the alternative.
          </p>
          <div className="mt-8">
            <Button variant="secondary" size="md" href={site.research.pdfPath} withArrow>
              Read the full research
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
