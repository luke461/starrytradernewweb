"use client";

import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { Sparkle } from "@/components/decoration/Sparkle";
import { useUi } from "@/components/providers/UiProvider";
import { hero } from "@/content/home";

export function Hero() {
  const { openContact, openDemo } = useUi();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-cosmic" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 md:px-8 md:pt-28 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="relative max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">
              <Sparkle size={14} /> Capability showcase
            </p>
            <h1 className="text-hero text-balance text-ink-primary">
              Investing, explained.
            </h1>
            <p className="mt-4 max-w-xl text-sub italic text-ink-soft">
              An education platform for the generation finance forgot.
            </p>
            <p className="mt-7 max-w-xl text-body-lg text-ink-soft">
              StarryTrader teaches Gen Z how markets actually work. Without the shame, without the hype, without the trading-app gamification that got them burned in the first place. Built on peer-reviewed research. Designed for the way they actually learn.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" onClick={openContact}>
                Get in touch
              </Button>
              <button
                onClick={() => openDemo(0)}
                className="group inline-flex items-center gap-1.5 text-[15px] text-ink-soft transition-colors hover:text-ink-primary"
              >
                See the product
                <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
              </button>
            </div>

            <Sparkle tone="violet" size={28} className="absolute -left-6 top-32 hidden md:block" />
            <Sparkle tone="violet-soft" size={20} className="absolute -right-6 top-2 hidden md:block" />
          </div>

          <div className="relative flex items-center justify-center">
            <Sparkle size={32} className="absolute -left-2 top-6 z-10" />
            <Sparkle tone="violet" size={20} className="absolute right-2 top-32 z-10" />
            <Sparkle tone="violet-soft" size={26} className="absolute bottom-10 -left-2 z-10" />
            <PhoneMockup ariaLabel="StarryTrader Watchlist AI Summary card">
              <WatchlistScreen />
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

function TrustStrip() {
  return (
    <div className="mt-20 border-t border-white/[0.06] pt-8">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{hero.trustStrip.caption}</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
        {hero.trustStrip.logos.map((logo) => (
          <li
            key={logo.name}
            className={`text-[13px] font-medium transition-colors ${
              logo.real ? "text-ink-soft" : "text-ink-muted/60"
            }`}
            title={logo.real ? logo.name : `${logo.name} (target)`}
          >
            {logo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
