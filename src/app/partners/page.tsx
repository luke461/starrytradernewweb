import type { Metadata } from "next";
import { Reveal } from "@/components/decoration/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { WaveDivider } from "@/components/decoration/WaveDivider";
import { Sparkle } from "@/components/decoration/Sparkle";
import { PartnerSection } from "@/components/partners/PartnerSection";
import { PartnerHeroLogos } from "@/components/partners/PartnerHeroLogos";
import { TransparencyBand } from "@/components/partners/TransparencyBand";
import { partners } from "@/content/partners";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The brokerages and institutions StarryTrader works with, and what learners get from each partnership.",
};

const howItWorks = [
  {
    n: "01",
    title: "Educational fit first.",
    body: "We evaluate every partner against one question: does this make learners better at understanding investing?",
  },
  {
    n: "02",
    title: "No money for placement.",
    body: "Partners do not pay us to feature them on this page or anywhere in the app.",
  },
  {
    n: "03",
    title: "Disclosure, always.",
    body: "Every partnership is disclosed here. If a partnership ends, this page updates within a week.",
  },
];

export default function PartnersPage() {
  const orderedPartners = [...partners].sort((a, b) => a.order - b.order);

  return (
    <div className="relative">
      {/* 3.1 Hero */}
      <section className="relative overflow-hidden bg-starry-deep pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
              Partners
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ink-primary md:text-[64px] lg:text-[72px]">
              The brokerages we work with, and why.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-soft">
              Education without practice is theory. We work with brokerages who give StarryTrader learners a way to apply what they learn, with the same transparency we ask of ourselves.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <PartnerHeroLogos partners={orderedPartners} />
          </Reveal>
        </div>
      </section>

      {/* 3.2 Transparency band */}
      <WaveDivider to="pale" />
      <TransparencyBand />

      {/* 3.3 Partner sections (alternating dark / light) */}
      {orderedPartners.map((p, i) => {
        const surface: "dark" | "light" = i % 2 === 0 ? "dark" : "light";
        const prevWasLight = i > 0 && (i - 1) % 2 === 1;
        const prevWasDark = i > 0 && (i - 1) % 2 === 0;
        // First partner is dark and follows the light transparency band.
        const enteringDarkFromLight = i === 0 || prevWasLight;
        const enteringLightFromDark = surface === "light" && prevWasDark;
        return (
          <div key={p.name}>
            {enteringDarkFromLight && surface === "dark" && (
              <WaveDivider to="deep" direction="up" />
            )}
            {enteringLightFromDark && (
              <WaveDivider to="pale" />
            )}
            <PartnerSection partner={p} index={i} surface={surface} />
          </div>
        );
      })}

      {/* 3.4 How partnerships work */}
      <WaveDivider to="pale" />
      <section className="relative bg-light-pale py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              surface="light"
              eyebrow="The model"
              title="How partnerships work, in three steps."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal key={step.n} delay={0.05 + i * 0.06}>
                <Card surface="light" className="h-full">
                  <p className="font-mono text-[20px] tracking-[0.16em] text-starry-violet-soft">
                    {step.n}
                  </p>
                  <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug text-ink-on-light">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body text-ink-on-light-soft">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Closer */}
      <WaveDivider to="deep" direction="up" />
      <section className="relative overflow-hidden bg-starry-deep py-28 md:py-36">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Sparkle tone="violet" size={28} className="mx-auto mb-6" />
          <Reveal>
            <h2 className="text-balance font-display text-[36px] font-semibold leading-tight tracking-tight text-ink-primary md:text-[48px]">
              Want to partner with us?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              We work with brokerages, foundations, and universities who share the mission of free, plain-English financial education. If you&rsquo;re one of them, write to the team.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-col items-center gap-5">
              <a
                href={`mailto:${site.contact.partnerships}?subject=Partnership%20inquiry`}
                className="group inline-flex items-center gap-2 rounded-full bg-starry-violet-deep px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-starry-violet"
              >
                Send us a partnership inquiry
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                  href="/funding"
                  className="group/fund inline-flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors hover:text-ink-primary"
                >
                  Want to fund the work? Read about funding
                  <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/fund:translate-x-1">→</span>
                </a>
                <a
                  href="/about#join"
                  className="group/sec inline-flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors hover:text-ink-primary"
                >
                  Or browse our open roles
                  <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3.6 Footer breathing room (footer is rendered globally in layout) */}
      <div className="h-24" aria-hidden />
    </div>
  );
}
