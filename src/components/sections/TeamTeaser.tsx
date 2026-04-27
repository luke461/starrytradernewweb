"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { team } from "@/content/home";

export function TeamTeaser() {
  const andre = team.find((m) => m.slug === "andre-liu");
  if (!andre) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Meet the team"
            title="Built across two cities, by people who learned this the hard way."
            subtitle="StarryTrader operates between Singapore and Chicago. The 13-hour timezone gap means somebody on our team is always thinking about how to make this better."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Link href={`/team/${andre.slug}`} className="group mt-14 block focus-visible:outline-none">
            <Card interactive glow="violet" className="!p-10">
              <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:gap-10">
                <Portrait name={andre.name} />
                <div className="flex-1">
                  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Co-founder</p>
                  <h3 className="mt-3 font-display text-[32px] font-semibold leading-tight text-ink-primary">
                    {andre.name}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-body text-ink-soft">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-starry-blue-light" />
                    {andre.location}
                  </p>
                  <p className="mt-5 max-w-xl italic text-body-lg text-ink-soft">“{andre.thinking}”</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-blue-light transition-transform duration-200 group-hover:translate-x-1">
                    Meet the team <span aria-hidden>→</span>
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Portrait({ name }: { name: string }) {
  const initial = name.replace(/[\[\]]/g, "").trim().charAt(0) || "★";
  return (
    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light text-[40px] font-display font-semibold text-white shadow-[0_20px_60px_-20px_rgba(107,91,255,0.6)]">
      <span>{initial}</span>
      <Sparkle size={20} className="absolute right-2 top-2" />
    </div>
  );
}
