import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/decoration/CountUp";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ResearchIndex } from "@/components/sections/ResearchIndex";
import { problemStats } from "@/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The research",
  description: "The peer-reviewed evidence that grounds StarryTrader. Citations, sources, and the reasoning behind each design decision.",
};

const stages = [
  {
    name: "Beginner",
    headline: "The shame barrier.",
    body: "65% of low-to-moderate-income students cite fear of loss as their primary investing barrier. Most beginner content treats them as people who need to be sold a product. We treat them as learners.",
    citation: "Commonwealth, 2024",
  },
  {
    name: "Intermediate",
    headline: "The hype cycle.",
    body: "79% of Gen Z and Millennials turn to social media for financial advice. 50% began investing due to FOMO. Real-time context, in plain English, gives them an alternative to the loudest voice in the timeline.",
    citation: "CFA Institute, 2023; PYMNTS, 2024",
  },
  {
    name: "Advanced",
    headline: "Cognitive bias does not retire.",
    body: "Cognitive biases do not diminish with experience. Advanced investors develop sophisticated rationalisations for irrational decisions. Skill-building requires friction-aware practice, not more content.",
    citation: "Thaler and Sunstein, 2008",
  },
];

const sources = [
  "Commonwealth (2024). Accumulating Wealth Among Low-and-Moderate-Income Households.",
  "CFA Institute (2023). Gen Z and Investing: Social Media, Crypto, FOMO, and Family.",
  "PYMNTS (2024). Generation Z and Investing: How Young Adults Are Building Wealth.",
  "FINRA Investor Education Foundation (2022). National Financial Capability Study.",
  "Motley Fool (2024). Gen Z Money Stress Survey.",
  "TIAA Institute (2024). Personal Finance Index.",
  "Thaler, R. and Sunstein, C. (2008). Nudge: Improving Decisions About Health, Wealth, and Happiness.",
];

export default function ResearchPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">The research</p>
            <h1 className="mt-4 text-hero text-balance text-ink-primary">
              The numbers describe a generation, not a niche.
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-ink-soft">
              StarryTrader is built on peer-reviewed research about how Gen Z learns, invests, and feels about money. Every design decision traces back to a citation.
            </p>
            {/* PDF download CTA hidden until the file exists at /research/starrytrader-research-2026.pdf.
                Re-enable once the asset is shipped. site.research.pdfPath is still defined. */}
          </Reveal>
        </div>
      </section>

      <ResearchIndex />

      <section className="relative py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 md:grid-cols-3 md:px-8">
          {problemStats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <Card glow="blue" interactive className="h-full !p-10">
                <CountUp value={s.value} className="text-[96px] md:text-[120px]" duration={1400} />
                <p className="mt-6 text-body-lg text-ink-primary">{s.headline}</p>
                <p className="mt-4 font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">Source: {s.source}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Across every stage of investor"
              title="One product, three audiences."
              subtitle="The fears change with experience. The need for plain language and honest feedback does not."
            />
          </Reveal>
          <div className="mt-14 space-y-6">
            {stages.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <Card interactive className="!p-10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-starry-blue-light md:w-32 md:shrink-0">{s.name}</p>
                    <div>
                      <h3 className="font-display text-[26px] font-semibold text-ink-primary">{s.headline}</h3>
                      <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{s.body}</p>
                      <p className="mt-4 font-mono text-caption text-ink-muted">{s.citation}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Card glow="violet" interactive className="!p-10 text-center">
              <Sparkle tone="violet" size={32} className="mx-auto" />
              <h2 className="mt-6 text-sub text-ink-primary">Find out what kind of investor you tend to be.</h2>
              <p className="mt-4 text-body text-ink-soft">
                A short bias quiz. Three quick questions. We tell you which cognitive bias is most likely to bite you, and which capabilities in StarryTrader help you spot it next time.
              </p>
              <p className="mt-6 font-mono text-caption text-ink-muted">Coming soon.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" size="md" href="/contact">Get notified</Button>
                <Button variant="ghost" size="md" href={site.appLinks.appStore} external>
                  Get the app
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Academic sources</p>
            <h2 className="mt-3 font-display text-[28px] font-semibold text-ink-primary">Read the underlying research.</h2>
            <ul className="mt-8 space-y-3">
              {sources.map((s) => (
                <li key={s} className="flex gap-3 text-[15px] text-ink-soft">
                  <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-starry-blue-light" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
