"use client";

import { CountUp } from "@/components/decoration/CountUp";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { stats } from "@/content/home";

export function StatsBand() {
  return (
    <section className="relative py-20 md:py-24">
      <Sparkle tone="violet-soft" size={20} className="pointer-events-none absolute left-[6%] top-12 hidden md:block" />
      <Sparkle size={24} className="pointer-events-none absolute right-[8%] bottom-10 hidden md:block" />

      <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/[0.06] bg-section-fade px-5 py-14 md:px-12">
        <Sparkle tone="violet" size={18} className="pointer-events-none absolute right-6 top-6 hidden md:block" />

        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Us in numbers</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div>
                <CountUp value={s.value} className="text-[56px] md:text-[64px]" />
                <p className="mt-3 text-[14px] text-ink-soft">{s.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
