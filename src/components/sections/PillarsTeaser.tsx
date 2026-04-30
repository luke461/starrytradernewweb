"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { PillarScreen } from "@/components/decoration/PillarScreen";

const teaser = [
  {
    id: "learn",
    index: "01",
    name: "Learn",
    blurb: "A re-entry point that doesn’t make you feel stupid. Daily jargon streaks, learning paths, AI-on-demand definitions.",
    href: "/product#learn",
  },
  {
    id: "research",
    index: "02",
    name: "Research",
    blurb: "Real-time context without the hype cycle. Watchlist AI summaries, sentiment splits, swipeable Stock Stories.",
    href: "/product#research",
  },
  {
    id: "compete",
    index: "03",
    name: "Compete",
    blurb: "Skill-building that feels like a game and teaches like a coach. LeetTrade scenarios, leaderboards, polls.",
    href: "/product#compete",
  },
];

export function PillarsTeaser() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            surface="light"
            eyebrow="What we’re building"
            title="Three pillars. One path to financial literacy."
            subtitle="Foundational knowledge, real-time context, and competitive practice. Three connected experiences that match how Gen Z actually learns."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {teaser.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Link href={p.href} className="group block focus-visible:outline-none">
                <Card surface="light" interactive className="h-full !p-6 md:!p-7">
                  <div className="relative mb-7 flex justify-center">
                    <PhoneMockup ariaLabel={`${p.name} screen preview`} tilt={false} className="!w-[180px]">
                      <PillarScreen pillarId={p.id} />
                    </PhoneMockup>
                  </div>

                  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">Pillar {p.index}</p>
                  <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight text-ink-on-light">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-on-light-soft">{p.blurb}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-violet-deep transition-transform duration-200 group-hover:translate-x-1">
                    Read more <span aria-hidden>→</span>
                  </p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
