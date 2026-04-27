"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { AnimatedConnector } from "@/components/decoration/AnimatedConnector";
import { press } from "@/content/home";

export function PressTeaser() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            surface="light"
            eyebrow="Press"
            title="In the press."
            subtitle="Two campus newsrooms, two continents, one story about how a National Service bunk in Singapore became the unlikely starting point for an investing app used in fifteen countries."
          />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {press.map((p, i) => (
            <Reveal key={p.publication} delay={i * 0.1}>
              <Card surface="light" interactive className="h-full">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep">{p.publication}</p>
                  <p className="font-mono text-caption text-ink-on-light-soft">{p.date}</p>
                </div>
                <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug text-ink-on-light">{p.headline}</h3>
                <div className="mt-5 flex gap-3">
                  <Sparkle tone="violet" size={20} className="shrink-0" />
                  <p className="text-[15px] italic leading-relaxed text-ink-on-light-soft">“{p.quote}”</p>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-violet-deep hover:text-starry-violet"
                >
                  Read the full article <span aria-hidden>→</span>
                </a>
              </Card>
            </Reveal>
          ))}

          <div className="hidden lg:flex pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 items-center justify-center">
            <AnimatedConnector label="Singapore ↔ Chicago" surface="light" />
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Link href="/press" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-violet-deep hover:text-starry-violet">
              See all press <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
