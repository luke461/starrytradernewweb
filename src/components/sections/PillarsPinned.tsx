"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/Card";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { PillarScreen } from "@/components/decoration/PillarScreen";
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
    <section ref={containerRef} className="relative h-screen">
      <div className="relative h-full">
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
      <h3 className="mt-3 text-sub text-balance text-ink-primary">{pillar.title}</h3>

      <Card className="mt-5 !p-5 !bg-starry-deep/60" glow="violet">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Research insight</p>
        <p className="mt-2 text-[14.5px] italic leading-snug text-ink-soft">“{pillar.insight.quote}”</p>
        <p className="mt-2 font-mono text-caption text-ink-muted">{pillar.insight.source}</p>
      </Card>

      <p className="mt-5 font-display text-[20px] font-semibold leading-snug text-ink-primary">{pillar.headline}</p>

      <ul className="mt-4 space-y-2.5">
        {pillar.capabilities.slice(0, 3).map((c) => (
          <li key={c.name} className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-starry-blue-light" />
            <div>
              <p className="text-[14px] font-semibold text-ink-primary">{c.name}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
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
