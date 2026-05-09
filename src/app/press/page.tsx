import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { Awards } from "@/components/sections/Awards";
import { FinalCta } from "@/components/sections/FinalCta";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { press } from "@/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "In the press",
  description: "Every press feature about StarryTrader, in one place.",
};

export default function PressPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Press"
              title="In the press."
              subtitle="Two campus newsrooms, two continents, one story about how a National Service bunk in Singapore became the unlikely starting point for an investing app used in fifteen countries."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {press.map((p, i) => (
              <Reveal key={p.publication} delay={i * 0.08}>
                <Card interactive className="h-full !p-0 overflow-hidden">
                  {p.image && (
                    <GracefulImage
                      src={p.image}
                      alt={p.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      wrapperClassName="relative aspect-[16/9] w-full bg-starry-soft"
                    />
                  )}
                  <div className="p-10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-starry-blue-light">{p.publication}</p>
                      <p className="font-mono text-caption text-ink-muted">{p.date}</p>
                    </div>
                    <h2 className="mt-5 text-sub text-ink-primary">{p.headline}</h2>
                    <div className="mt-6 flex gap-3">
                      <Sparkle size={22} className="shrink-0" />
                      <p className="text-[16px] italic leading-relaxed text-ink-soft">“{p.quote}”</p>
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-blue-light hover:text-starry-blue-soft"
                    >
                      Read the full article ↗
                    </a>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 flex items-center justify-center gap-3 opacity-70">
              <Constellation className="h-10 w-40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">Singapore ↔ Chicago</span>
              <Constellation className="h-10 w-40" />
            </div>
          </Reveal>
        </div>
      </section>

      <Awards />

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <Card className="!p-12 text-center" glow="violet">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">More coming soon</p>
              <h2 className="mt-3 text-sub text-ink-primary">The press list grows as we land coverage.</h2>
              <p className="mx-auto mt-4 max-w-xl text-body text-ink-soft">
                Working on a story about Gen Z and financial literacy, fintech in education, or unusual founder paths? We’d love to talk.
              </p>
              <p className="mt-6 text-body-lg text-ink-primary">
                <a href={`mailto:${site.contact.press}`} className="text-starry-blue-light underline-offset-4 hover:underline">{site.contact.press}</a>
              </p>
              <p className="mt-2 text-caption text-ink-muted">We respond within 48 hours.</p>
            </Card>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
