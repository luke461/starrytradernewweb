import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { ReadingProgress } from "@/components/privacy/ReadingProgress";
import { AtAGlanceCards } from "@/components/privacy/AtAGlanceCards";
import { PrivacyTOC } from "@/components/privacy/PrivacyTOC";
import { PrivacyBody } from "@/components/privacy/PrivacyBody";
import { privacyContent } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What StarryTrader collects, how we use it, who we share it with, and the rights you have over it. In plain English.",
};

export default function PrivacyPage() {
  const c = privacyContent;
  const lastUpdatedDate = new Date(c.lastUpdated);
  const lastUpdatedDisplay = lastUpdatedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative">
      <ReadingProgress />

      {/* Hero (dark) */}
      <section className="relative overflow-hidden bg-starry-deep pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
              {c.hero.label}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-tight text-ink-primary md:text-[56px]">
              {c.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-soft">
              {c.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[14px] text-ink-muted">
              Last updated:{" "}
              <time dateTime={c.lastUpdated} className="text-ink-soft">
                {lastUpdatedDisplay}
              </time>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Draft banner (conditional) */}
      {c.isDraft && (
        <div className="bg-starry-deep">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div
              role="note"
              className="rounded-r-lg border-l-4 border-starry-violet bg-starry-violet-soft/15 px-6 py-4"
            >
              <p className="text-[14px] leading-relaxed text-ink-soft">
                <span className="font-mono uppercase tracking-[0.16em] text-starry-blue-light">Draft.</span>{" "}
                {c.draftBanner.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* At a glance (light, Layer 1) */}
      <section className="relative bg-light-pale py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[28px] font-semibold leading-tight text-ink-on-light md:text-[36px]">
              {c.atAGlance.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-on-light-soft">
              {c.atAGlance.lead}
            </p>
          </Reveal>

          <div className="mt-12">
            <AtAGlanceCards cards={c.atAGlance.cards} />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <a
                href="#full-notice"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-starry-violet-deep transition-colors hover:text-starry-violet"
              >
                {c.atAGlance.fullNoticeCta}
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full notice (Layer 2). Light surface continues. */}
      <section
        id="full-notice"
        className="relative scroll-mt-28 bg-light-pale pb-20 pt-8 md:pb-28 md:pt-12"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-ink-on-light md:text-[32px]">
              {c.fullNotice.heading}
            </h2>
          </Reveal>

          <div className="mt-10 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
            <PrivacyTOC sections={c.fullNotice.sections} />

            <div className="max-w-[720px]">
              <PrivacyBody sections={c.fullNotice.sections} />

              {/* Layer 3: Definitions and details */}
              <details className="group mt-16 rounded-2xl border border-starry-violet-soft/25 bg-white">
                <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-3 rounded-2xl px-6 py-4 text-[15px] font-medium text-ink-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-starry-violet-deep">
                      Section L
                    </span>
                    <span className="ml-2">{c.definitions.title}</span>
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="text-starry-violet-deep transition-transform duration-200 group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="border-t border-starry-violet-soft/20 px-6 py-5">
                  <p className="text-[15px] leading-relaxed text-ink-on-light-soft">
                    {c.definitions.placeholder}
                  </p>
                </div>
              </details>

              {/* Footer of Layer 2: back to top + last updated */}
              <div className="mt-12 flex flex-col gap-3 border-t border-starry-violet-soft/30 pt-6 text-[13px] text-ink-on-light-soft md:flex-row md:items-center md:justify-between">
                <p>
                  Last updated:{" "}
                  <time dateTime={c.lastUpdated}>{lastUpdatedDisplay}</time>
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-starry-violet-deep transition-colors hover:text-starry-violet"
                >
                  Back to top
                  <span aria-hidden>↑</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closer (dark) */}
      <section className="relative overflow-hidden bg-starry-deep py-24 md:py-32">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Sparkle tone="violet" size={26} className="mx-auto mb-5" />
          <Reveal>
            <h2 className="text-balance font-display text-[32px] font-semibold leading-tight tracking-tight text-ink-primary md:text-[40px]">
              {c.closer.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {c.closer.sub}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={c.closer.primaryCta.mailto}
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-starry-violet-deep px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-starry-violet"
              >
                {c.closer.primaryCta.label}
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link
                href={c.closer.secondaryCta.href}
                className="group/sec inline-flex min-h-[48px] items-center gap-1.5 px-3 text-[14px] text-ink-soft transition-colors hover:text-ink-primary"
              >
                {c.closer.secondaryCta.label}
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-16" aria-hidden />
    </div>
  );
}
