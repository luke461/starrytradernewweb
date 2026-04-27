"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { partners } from "@/content/home";

const categoryLabel: Record<string, string> = {
  academic: "Academic",
  ai: "AI and infrastructure",
  industry: "Industry",
  media: "Distribution and media",
};

export function Partners() {
  // Brief Section 6.8: only show real partners on the live site.
  const real = partners.filter((p) => p.status === "real");

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted partners"
            title="The people we work with."
            subtitle="StarryTrader is built in partnership with academic institutions, AI providers, and distribution partners who share the mission."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.04] sm:grid-cols-3 md:grid-cols-3">
          {real.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <div className="group flex h-32 items-center justify-center bg-starry-mid px-5 text-center transition-colors duration-300 hover:bg-starry-soft">
                <div>
                  <p className="text-[15px] font-medium text-ink-soft transition-colors group-hover:text-ink-primary">{p.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {categoryLabel[p.category]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
