"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { awards } from "@/content/home";

export function Awards() {
  // Brief Section 6.9: only show landed awards on the live site.
  const featured = awards.find((a) => a.featured);
  const others = awards.filter((a) => !a.featured);

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Awards and recognition"
            title="Recognised by the people we respect."
          />
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <Card glow="blue" interactive className="mt-12 !p-10 border-starry-blue-light/30">
              <div className="flex items-start gap-6">
                <div className="hidden sm:block">
                  <Sparkle size={48} />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-starry-blue-light">Featured award</p>
                  <h3 className="mt-2 text-section text-ink-primary">{featured.name}</h3>
                  <p className="mt-2 text-body-lg text-ink-soft">{featured.body}</p>
                  {featured.subline && (
                    <p className="mt-3 text-[15px] text-ink-soft">{featured.subline}</p>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        )}

        {others.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 0.05}>
                <Card interactive className="h-full">
                  <Sparkle size={20} />
                  <p className="mt-4 text-[15px] font-semibold text-ink-primary">{a.name}</p>
                  <p className="mt-1 text-caption text-ink-soft">{a.body}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{a.date}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
