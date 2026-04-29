"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { PhoneScreenshot } from "@/components/decoration/PhoneScreenshot";
import { Sparkle } from "@/components/decoration/Sparkle";
import { useUi } from "@/components/providers/UiProvider";
import { hero, press } from "@/content/home";

// Drop a 9:19.5 portrait screenshot (e.g. 1080x2340) into /public/screenshots/
// and set this to its path, e.g. "/screenshots/hero-watchlist.png".
// Leave as null to render the stylised placeholder watchlist screen below.
const HERO_SCREENSHOT: string | null = "/screenshots/hero-v2.webp";

export function Hero() {
  const { openContact } = useUi();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-cosmic" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="relative max-w-2xl">
            <h1 className="text-hero text-balance text-ink-primary">
              Investing, explained.
            </h1>
            <p className="mt-7 max-w-xl text-body-lg text-ink-soft">
              Free, non-profit financial education for the generation finance forgot. Built on peer-reviewed research. Designed for the way they actually learn.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" onClick={() => openContact()} magnetic>
                Get in touch
              </Button>
              <Link
                href="/product"
                className="group inline-flex items-center gap-1.5 text-[15px] text-ink-soft transition-colors hover:text-ink-primary"
              >
                See what we’re building
                <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <Sparkle tone="violet" size={28} className="absolute -left-6 top-32 hidden md:block" />
            <Sparkle tone="violet-soft" size={20} className="absolute -right-6 top-2 hidden md:block" />
          </div>

          <div className="relative flex items-center justify-center">
            <Sparkle size={32} className="absolute -left-2 top-6 z-10" />
            <Sparkle tone="violet" size={20} className="absolute right-2 top-32 z-10" />
            <Sparkle tone="violet-soft" size={26} className="absolute bottom-10 -left-2 z-10" />
            <PhoneMockup ariaLabel="StarryTrader Watchlist AI Summary card">
              {HERO_SCREENSHOT ? (
                <PhoneScreenshot src={HERO_SCREENSHOT} alt="StarryTrader app screen" priority />
              ) : (
                <WatchlistScreen />
              )}
            </PhoneMockup>
          </div>
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}

function WatchlistScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4 text-[12px] text-ink-soft">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Watchlist</p>
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-ink-soft">AI Summary</span>
      </div>
      <div className="surface-card !rounded-2xl !p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-starry-blue-light">Why it moved today</p>
        <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-ink-primary">
          NVDA traded sideways as investors waited for the Fed minutes.
        </p>
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
          Three analysts trimmed near-term targets, but kept long-term outlooks unchanged. Volume below average.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-success-soft/15 px-2 py-0.5 text-[10px] text-success-soft">+ Positive 54%</span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-soft">Neutral 32%</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { sym: "AAPL", price: "187.20", chg: "+0.4%" },
          { sym: "TSLA", price: "242.10", chg: "−1.1%" },
          { sym: "MSFT", price: "412.55", chg: "+0.9%" },
          { sym: "AMZN", price: "176.42", chg: "+0.2%" },
        ].map((t) => (
          <div key={t.sym} className="surface-card !rounded-xl !p-3">
            <p className="font-display text-[12px] font-semibold text-ink-primary">{t.sym}</p>
            <p className="font-mono text-[12px] text-ink-soft">{t.price}</p>
            <p className="font-mono text-[10px] text-starry-blue-light">{t.chg}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 text-center text-[10px] text-ink-muted">Plain English. Always.</div>
    </div>
  );
}

/**
 * Logo-wall style press strip. Hairline-bracketed eyebrow above a row of
 * white cards, one per publication. Text wordmarks for now since no
 * official logo SVGs are on hand; drop a logoPath into the press entry
 * later and the card will render the image instead of the wordmark.
 */
function TrustStrip() {
  const features = press.slice(0, 2);
  if (features.length === 0) return null;

  return (
    <div className="mt-20 md:mt-24">
      {/* Hairline-bracketed eyebrow, mimics the reference layout */}
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 px-5">
        <span aria-hidden className="h-px flex-1 bg-white/[0.10]" />
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
          As featured in
        </p>
        <span aria-hidden className="h-px flex-1 bg-white/[0.10]" />
      </div>

      {/* Logo-wall cards. Centered grid, 2 cards equal-width, room for more later. */}
      <ul
        className={`mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 px-5 sm:grid-cols-${Math.min(
          features.length,
          2,
        )} sm:gap-5`}
        style={{ gridTemplateColumns: `repeat(${Math.min(features.length, 2)}, minmax(0, 1fr))` }}
      >
        {features.map((p) => (
          <li key={p.publication}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the ${p.publication} feature`}
              className="group flex h-[96px] w-full items-center justify-center rounded-xl bg-white px-6 ring-1 ring-white/15 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light"
            >
              {p.logoPath && p.logoWidth && p.logoHeight ? (
                <Image
                  src={p.logoPath}
                  alt={p.publication}
                  width={p.logoWidth}
                  height={p.logoHeight}
                  className="h-auto max-h-[56px] w-auto max-w-full object-contain"
                />
              ) : (
                <span className="text-balance text-center font-display text-[16px] font-semibold leading-tight tracking-tight text-ink-on-light transition-colors duration-200 group-hover:text-starry-violet-deep md:text-[18px]">
                  {p.publication}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
