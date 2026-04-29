import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { Card } from "@/components/ui/Card";
import { WaveDivider } from "@/components/decoration/WaveDivider";
import { Sparkle } from "@/components/decoration/Sparkle";
import { fundingContent, type FundingCategoryIcon } from "@/content/funding";

export const metadata: Metadata = {
  title: "Funding",
  description:
    "How StarryTrader is funded, how we plan to be funded, and the organisations we work with to keep financial education free.",
};

export default function FundingPage() {
  const c = fundingContent;
  return (
    <div className="relative">
      {/* 3.1 Hero */}
      <section className="relative overflow-hidden bg-starry-deep pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
              {c.hero.label}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ink-primary md:text-[64px] lg:text-[72px]">
              {c.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-soft">
              {c.hero.sub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3.2 Where we are today */}
      <WaveDivider to="pale" />
      <section className="relative bg-light-pale py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold leading-tight text-ink-on-light md:text-[32px]">
              {c.currentState.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-ink-on-light-soft">
              {c.currentState.body}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {c.currentState.chips.map((chip) => (
                <li
                  key={chip.label}
                  className="rounded-2xl border border-starry-violet-soft/30 bg-starry-violet-soft/15 p-5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-starry-violet-soft/60"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep">
                    {chip.label}
                  </p>
                  <p className="mt-2 font-display text-[18px] font-semibold leading-snug tracking-tight text-ink-on-light">
                    {chip.value}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 3.3 What we are looking for */}
      <WaveDivider to="deep" direction="up" />
      <section className="relative bg-starry-deep py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold leading-tight text-ink-primary md:text-[36px]">
              {c.lookingFor.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[760px] text-[17px] leading-relaxed text-ink-soft">
              {c.lookingFor.leadParts.map((part, i) =>
                "href" in part ? (
                  <Link
                    key={i}
                    href={part.href}
                    className="text-starry-blue-light underline-offset-4 hover:underline"
                  >
                    {part.text}
                  </Link>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {c.lookingFor.categories.map((cat, i) => {
              const Icon = categoryIcons[cat.icon];
              return (
                <Reveal key={cat.heading} delay={0.1 + i * 0.05}>
                  <Card interactive className="h-full">
                    <Icon className="text-starry-blue-light" />
                    <h3 className="mt-5 font-display text-[20px] font-semibold leading-snug text-ink-primary">
                      {cat.heading}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {cat.body}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-12 max-w-[540px] text-center text-[15px] italic leading-relaxed text-ink-soft">
              {c.lookingFor.closingLine}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3.4 How we will use funds */}
      <section className="relative bg-starry-deep pb-24 pt-4 md:pb-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold leading-tight text-ink-primary md:text-[36px]">
              {c.useOfFunds.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[680px] text-[17px] leading-relaxed text-ink-soft">
              {c.useOfFunds.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-white/[0.06] overflow-hidden rounded-[20px] border border-white/[0.06] bg-starry-mid/40">
              {c.useOfFunds.allocations.map((a) => (
                <li key={a.name} className="grid grid-cols-1 gap-2 p-6 md:grid-cols-[minmax(0,260px)_1fr] md:items-center md:gap-8 md:px-8 md:py-7">
                  <p className="font-display text-[17px] font-semibold leading-snug text-ink-primary">
                    {a.name}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    {a.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 font-mono text-caption text-ink-muted">
              {c.useOfFunds.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3.5 Impact Report + 3.6 Governance (both light) */}
      <WaveDivider to="pale" />
      <section className="relative bg-light-pale py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-ink-on-light md:text-[32px]">
              {c.impactReport.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-ink-on-light-soft">
              {c.impactReport.body}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-4xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-ink-on-light md:text-[32px]">
              {c.governance.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-ink-on-light-soft">
              {c.governance.body}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={c.governance.ctaMailto}
              className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-violet-deep transition-colors hover:text-starry-violet"
            >
              {c.governance.ctaLabel}
              <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 3.7 Closer */}
      <WaveDivider to="deep" direction="up" />
      <section className="relative overflow-hidden bg-starry-deep py-28 md:py-36">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Sparkle tone="violet" size={28} className="mx-auto mb-6" />
          <Reveal>
            <h2 className="text-balance font-display text-[36px] font-semibold leading-tight tracking-tight text-ink-primary md:text-[48px]">
              {c.closer.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {c.closer.sub}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-col items-center gap-5">
              <a
                href={c.closer.primaryCtaMailto}
                className="group inline-flex items-center gap-2 rounded-full bg-starry-violet-deep px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-starry-violet"
              >
                {c.closer.primaryCtaLabel}
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  →
                </span>
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {c.closer.secondaryLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group/sec inline-flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors hover:text-ink-primary"
                  >
                    {l.label}
                    <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-24" aria-hidden />
    </div>
  );
}

const categoryIcons: Record<FundingCategoryIcon, (props: { className?: string }) => React.ReactElement> = {
  Award: ({ className }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5 7 22l5-3 5 3-2-7.5" />
    </svg>
  ),
  GraduationCap: ({ className }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  ),
};
