"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone3D } from "@/components/decoration/Phone3D";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { PhoneScreenshot } from "@/components/decoration/PhoneScreenshot";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { Sparkle } from "@/components/decoration/Sparkle";
import { useUi } from "@/components/providers/UiProvider";
import { hero, press } from "@/content/home";
import { site } from "@/lib/site";

// Drop a 9:19.5 portrait screenshot (e.g. 1080x2340) into /public/screenshots/
// and set this to its path, e.g. "/screenshots/hero-watchlist.png".
// Leave as null to render the stylised placeholder watchlist screen below.
const HERO_SCREENSHOT: string | null = "/screenshots/hero-v3.png";

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

            <div className="mt-9">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={site.appLinks.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="inline-flex transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-starry-blue-light focus-visible:outline-offset-4"
                >
                  <GracefulImage
                    src="/images/store/app-store.webp"
                    alt="Download on the App Store"
                    width={200}
                    height={60}
                    priority
                    className="h-[60px] w-auto"
                    fallback={
                      <span className="inline-flex h-[60px] items-center gap-2 rounded-xl bg-black px-5 text-[15px] font-semibold text-white ring-1 ring-white/10">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M16.5 1.5c.1 1.4-.5 2.7-1.4 3.7-1 1-2.3 1.7-3.6 1.6-.1-1.3.5-2.7 1.4-3.6.9-1 2.4-1.7 3.6-1.7Zm4.4 16.5c-.6 1.4-.9 2-1.7 3.2-1.1 1.7-2.6 3.7-4.5 3.7-1.7 0-2.2-1.1-4.5-1.1-2.3 0-2.8 1.1-4.5 1.1-1.9 0-3.4-1.9-4.5-3.5C-.4 16.7-1 11.5 1 8.4 2.5 6.2 4.7 4.9 6.8 4.9c1.7 0 3 .9 4.4.9 1.4 0 2.2-.9 4.3-.9 1.6 0 3.3.9 4.5 2.4-3.9 2.1-3.3 7.7 1.0 8.7Z" />
                        </svg>
                        App Store
                      </span>
                    }
                  />
                </a>
                <a
                  href={site.appLinks.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="inline-flex transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-starry-blue-light focus-visible:outline-offset-4"
                >
                  <GracefulImage
                    src="/images/store/google-play.webp"
                    alt="Get it on Google Play"
                    width={200}
                    height={60}
                    priority
                    className="h-[60px] w-auto"
                    fallback={
                      <span className="inline-flex h-[60px] items-center gap-2 rounded-xl bg-black px-5 text-[15px] font-semibold text-white ring-1 ring-white/10">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M3.6 1.5c-.4.4-.6 1-.6 1.7v17.6c0 .7.2 1.3.6 1.7l11.1-11-11.1-10Zm12.5 11.4 3.6 2c1.1.6 1.1 1.7 0 2.3l-3.4 1.9-3.6-3.6 3.4-2.6Zm-1.4-1.4L4.6 22.4l9.5-5.4-2.4-3.5Zm0-2.0L11.7 6 4.6 1.6l10.1 7.9Z" />
                        </svg>
                        Google Play
                      </span>
                    }
                  />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.03] px-5 text-[14px] font-medium text-ink-soft transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/[0.06] hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-starry-blue-light focus-visible:outline-offset-2"
                >
                  Get in touch
                </button>
                <Link
                  href="/product"
                  className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 text-[14px] font-medium text-ink-soft transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/[0.06] hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-starry-blue-light focus-visible:outline-offset-2"
                >
                  See what we&rsquo;re building
                  <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>

            <Sparkle tone="violet" size={28} className="absolute -left-6 top-32 hidden md:block" />
            <Sparkle tone="violet-soft" size={20} className="absolute -right-6 top-2 hidden md:block" />
          </div>

          <div className="relative flex items-center justify-center">
            <Sparkle size={32} className="absolute -left-2 top-6 z-10" />
            <Sparkle tone="violet" size={20} className="absolute right-2 top-32 z-10" />
            <Sparkle tone="violet-soft" size={26} className="absolute bottom-10 -left-2 z-10" />
            <Phone3D
              screenshot={HERO_SCREENSHOT ?? undefined}
              ariaLabel="StarryTrader Watchlist AI Summary card"
              fallback={
                <PhoneMockup ariaLabel="StarryTrader Watchlist AI Summary card" bezel="glass">
                  {HERO_SCREENSHOT ? (
                    <PhoneScreenshot src={HERO_SCREENSHOT} alt="StarryTrader app screen" priority />
                  ) : (
                    <WatchlistScreen />
                  )}
                </PhoneMockup>
              }
            />
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
              className="group flex h-[96px] w-full items-center justify-center rounded-2xl bg-white px-6 ring-1 ring-white/15 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starry-blue-light"
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
