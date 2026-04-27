"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/decoration/CountUp";
import { Reveal } from "@/components/decoration/Reveal";
import { problemStats } from "@/content/home";

export function ResearchTeaser() {
  return (
    <section id="research" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">The why</p>
          <h2 className="mt-3 max-w-3xl text-section text-balance text-ink-primary">
            The numbers describe a generation, not a niche.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {problemStats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <Card glow="blue" interactive className="h-full">
                <CountUp value={s.value} className="text-[64px] md:text-[72px]" />
                <p className="mt-5 text-body-lg text-ink-primary">{s.headline}</p>
                <p className="mt-4 font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">
                  Source: {s.source}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-[15px] text-starry-blue-light hover:text-starry-blue-soft"
            >
              Read the full research <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
