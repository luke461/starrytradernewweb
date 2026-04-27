"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/Card";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { pillars, type Pillar } from "@/content/home";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Pinned-scroll pillars treatment for /product (desktop only).
 * Phone mockup stays centered while text and screen content crossfade
 * across three viewport-height scroll segments.
 *
 * Falls back to a stacked layout under 1024px or with prefers-reduced-motion.
 */
export function PillarsPinned() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(wide && !reduce);
  }, []);

  useGSAP(
    () => {
      if (!enabled || !containerRef.current) return;
      const texts = gsap.utils.toArray<HTMLElement>("[data-pillar-text]");
      const phones = gsap.utils.toArray<HTMLElement>("[data-pillar-phone]");

      gsap.set(texts.slice(1), { opacity: 0, y: 24 });
      gsap.set(phones.slice(1), { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const idx = Math.min(2, Math.floor(self.progress * 3));
            setActive(idx);
          },
        },
      });

      tl.to(texts[0], { opacity: 0, y: -24, duration: 1 }, 1)
        .to(phones[0], { opacity: 0, scale: 0.96, duration: 1 }, 1)
        .to(texts[1], { opacity: 1, y: 0, duration: 1 }, 1.1)
        .to(phones[1], { opacity: 1, scale: 1, duration: 1 }, 1.1)
        .to(texts[1], { opacity: 0, y: -24, duration: 1 }, 2.5)
        .to(phones[1], { opacity: 0, scale: 0.96, duration: 1 }, 2.5)
        .to(texts[2], { opacity: 1, y: 0, duration: 1 }, 2.6)
        .to(phones[2], { opacity: 1, scale: 1, duration: 1 }, 2.6);

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { dependencies: [enabled], scope: containerRef },
  );

  if (!enabled) {
    // Mobile / reduced-motion fallback: use the existing stacked Pillars.
    // Imported lazily so we don't ship the GSAP timeline weight needlessly.
    return <FallbackPillars />;
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div ref={containerRef} className="relative h-screen">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8">
          <div className="relative">
            <ProgressDots count={3} active={active} />
            {pillars.map((p, i) => (
              <div
                key={p.id}
                data-pillar-text
                className={`absolute inset-y-0 left-0 right-0 flex flex-col justify-center ${i === 0 ? "" : ""}`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <PillarText pillar={p} />
              </div>
            ))}
          </div>

          <div className="relative flex h-full items-center justify-center">
            {pillars.map((p, i) => (
              <div
                key={p.id}
                data-pillar-phone
                className="absolute"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <PhoneMockup ariaLabel={`${p.visualLabel} screen`}>
                  <PillarScreen pillarId={p.id} />
                </PhoneMockup>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="absolute -top-12 left-0 flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i === active ? "w-10 bg-starry-blue-light" : "w-4 bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function PillarText({ pillar }: { pillar: Pillar }) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Pillar {pillar.index}</p>
      <h3 className="mt-3 text-section text-balance text-ink-primary">{pillar.title}</h3>

      <Card className="mt-7 !p-6 !bg-starry-deep/60" glow="violet">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Research insight</p>
        <p className="mt-2 text-body italic text-ink-soft">“{pillar.insight.quote}”</p>
        <p className="mt-2 font-mono text-caption text-ink-muted">{pillar.insight.source}</p>
      </Card>

      <p className="mt-7 text-sub text-ink-primary">{pillar.headline}</p>

      <ul className="mt-6 space-y-3">
        {pillar.capabilities.slice(0, 4).map((c) => (
          <li key={c.name} className="flex gap-4">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-starry-blue-light" />
            <div>
              <p className="text-[15px] font-semibold text-ink-primary">{c.name}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillarScreen({ pillarId }: { pillarId: string }) {
  if (pillarId === "learn") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Learning Path</p>
        <p className="mt-1 text-[11px] text-ink-soft">Foundations → Markets → Strategy</p>
        <div className="mt-3 space-y-2">
          {[
            { n: 1, t: "What a stock actually is", done: true },
            { n: 2, t: "Why prices move", done: true },
            { n: 3, t: "Volatility, demystified", done: false, current: true },
            { n: 4, t: "Reading a news headline", done: false },
            { n: 5, t: "Diversification basics", done: false },
          ].map((s) => (
            <div key={s.n} className={`surface-card !rounded-xl !p-3 flex items-center gap-3 ${s.current ? "!border-starry-blue-light/60" : ""}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${s.done ? "bg-success-soft/20 text-success-soft" : s.current ? "bg-starry-blue-light/20 text-starry-blue-light" : "bg-white/5 text-ink-muted"}`}>
                {s.done ? "✓" : s.n}
              </span>
              <p className="text-[12px] text-ink-primary">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto surface-card !rounded-xl !p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Daily Jargon · Day 12</p>
          <p className="mt-1 text-[12px] text-ink-primary">Beta</p>
          <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">A measure of how a stock moves relative to the market. Higher beta = more volatile.</p>
        </div>
      </div>
    );
  }
  if (pillarId === "research") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Stock Stories</p>
        <p className="mt-1 text-[11px] text-ink-soft">Swipe through the market</p>
        <div className="surface-card mt-3 !rounded-2xl !p-4 flex-1 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">NVDA · Today</p>
          <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-ink-primary">
            Why every chip stock is moving in lockstep right now.
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
            One macro story is driving sentiment across the entire sector. We unpack it in plain English.
          </p>
          <div className="mt-auto flex gap-2">
            <span className="rounded-full bg-success-soft/15 px-2 py-0.5 text-[10px] text-success-soft">Positive 61%</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-soft">Neutral 28%</span>
            <span className="rounded-full bg-starry-violet-soft/15 px-2 py-0.5 text-[10px] text-starry-violet-soft">Negative 11%</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
      <p className="font-display text-[14px] font-semibold text-ink-primary">LeetTrade</p>
      <p className="mt-1 text-[11px] text-ink-soft">Scenario 07 of 16</p>
      <div className="surface-card mt-3 !rounded-2xl !p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Scenario</p>
        <p className="mt-1 text-[12.5px] text-ink-primary leading-relaxed">
          A retailer beats earnings but lowers next-quarter guidance. Stock drops 12% pre-market. What do you do?
        </p>
        <div className="mt-3 space-y-2">
          {["Buy the dip", "Hold and re-evaluate at close", "Sell into weakness"].map((opt, i) => (
            <button key={opt} type="button" className={`w-full rounded-lg border px-3 py-2 text-left text-[11.5px] text-ink-soft ${i === 1 ? "border-starry-blue-light/60 text-starry-blue-light" : "border-white/10"}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 surface-card !rounded-xl !p-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Global leaderboard</p>
        <ol className="mt-2 space-y-1 text-[11px] text-ink-soft">
          <li className="flex justify-between"><span>1. wei.h</span><span className="font-mono text-starry-blue-light">98.2%</span></li>
          <li className="flex justify-between"><span>2. priya.k</span><span className="font-mono text-ink-soft">96.4%</span></li>
          <li className="flex justify-between"><span>3. you</span><span className="font-mono text-ink-soft">94.1%</span></li>
        </ol>
      </div>
    </div>
  );
}

function FallbackPillars() {
  // Lightweight stacked fallback that mirrors the pinned content.
  // (We avoid importing the full Pillars component to keep this file self-contained.)
  return (
    <div className="space-y-24 py-16">
      {pillars.map((p) => (
        <div key={p.id} className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <PillarText pillar={p} />
          <div className="flex justify-center">
            <PhoneMockup ariaLabel={`${p.visualLabel} screen`} tilt={false}>
              <PillarScreen pillarId={p.id} />
            </PhoneMockup>
          </div>
        </div>
      ))}
    </div>
  );
}
