"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/decoration/CountUp";
import { Reveal } from "@/components/decoration/Reveal";
import { problemStats } from "@/content/home";

export function ResearchTeaser() {
  return (
    <section id="research" className="relative overflow-hidden py-24 md:py-32">
      {/* Brand watermark. Same treatment as the About hero: anchored off the
          right edge, mask-faded on the left so it dissolves before reaching
          the headline column. The light-surface logo is flipped to white via
          a brightness(0) invert(1) filter so it reads on the dark surface.
          Hidden under md so mobile keeps the headline uncrowded. */}
      <Image
        src="/brand/starrytrader-logo-light.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="pointer-events-none absolute right-[-2%] top-4 hidden h-auto max-h-[260px] w-auto select-none opacity-[0.10] md:block md:top-6 lg:right-[4%]"
        style={{
          filter: "brightness(0) invert(1)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
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
