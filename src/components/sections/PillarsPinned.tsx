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
      const root = containerRef.current;
      const texts = gsap.utils.toArray<HTMLElement>("[data-pillar-text]", root);
      const phones = gsap.utils.toArray<HTMLElement>("[data-pillar-phone]", root);

      // Pillar 1 starts visible; pillars 2+3 enter from 24px below.
      // force3D + willChange lift transforms to the GPU so the scrubbed
      // timeline doesn't fall off the compositor under fast scroll.
      gsap.set([texts[0], phones[0]], { force3D: true, willChange: "opacity, transform" });
      gsap.set(texts.slice(1), { opacity: 0, y: 24, force3D: true, willChange: "opacity, transform" });
      gsap.set(phones.slice(1), { opacity: 0, scale: 0.96, force3D: true, willChange: "opacity, transform" });

      const tl = gsap.timeline({
        // ease: "none" because the scroll position itself is the easing
        // curve. A non-linear ease on a scrubbed tween re-maps scroll to
        // timeline progress and feels like the page is fighting you.
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          // 0.6 keeps the cinematic weight of 0.8 but reduces lag during
          // fast scroll so the timeline doesn't blur past pillars.
          scrub: 0.6,
          invalidateOnRefresh: true,
          // Snap so fast-scroll always lands on a pillar instead of
          // halfway between two. snapTo points are the mid-points of
          // each pillar's dwell window. delay slightly > scrub gives the
          // catchup tween time to settle before snap fires.
          snap: {
            snapTo: [0.13, 0.45, 0.83],
            duration: { min: 0.25, max: 0.6 },
            delay: 0.18,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            // +0.02 nudge so the active dot doesn't flicker exactly at
            // the 1/3 / 2/3 boundary while scrubbing across it.
            const idx = Math.min(2, Math.floor(self.progress * 3 + 0.02));
            setActive(idx);
          },
        },
      });

      // Timeline normalised to 1.0. Pillar 3 now has the LONGEST dwell
      // (0.35 of timeline → ~154vh of scroll) because users fast-scroll
      // most aggressively as they approach the end of the section, and
      // the previous 0.28 dwell let pillar 3 flash past unseen.
      //   Pillar 1 dwell:    0.00 → 0.25
      //   Transition 1 → 2:  0.25 → 0.35
      //   Pillar 2 dwell:    0.35 → 0.55
      //   Transition 2 → 3:  0.55 → 0.65
      //   Pillar 3 dwell:    0.65 → 1.00  ← longest, catches fast scroll
      const FADE = 0.10;

      tl.to(texts[0],  { opacity: 0, y: -20, duration: FADE }, 0.25)
        .to(phones[0], { opacity: 0, scale: 0.96, duration: FADE }, 0.25)
        .to(texts[1],  { opacity: 1, y: 0, duration: FADE }, 0.29)
        .to(phones[1], { opacity: 1, scale: 1, duration: FADE }, 0.29)
        .to(texts[1],  { opacity: 0, y: -20, duration: FADE }, 0.55)
        .to(phones[1], { opacity: 0, scale: 0.96, duration: FADE }, 0.55)
        .to(texts[2],  { opacity: 1, y: 0, duration: FADE }, 0.59)
        .to(phones[2], { opacity: 1, scale: 1, duration: FADE }, 0.59);

      // Layout above us (hero) hydrates after we mount; recompute pin math.
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { dependencies: [enabled], scope: containerRef },
  );

  if (!enabled) {
    // Mobile / reduced-motion fallback: use the existing stacked Pillars.
    return <FallbackPillars />;
  }

  // Architecture: explicit 320vh section creates real document space for the
  // pin window. The inner div uses CSS `position: sticky` so the browser
  // handles the pinning visually. ScrollTrigger only scrubs the timeline
  // progress; it never touches positioning. This sidesteps GSAP's
  // pin-spacer behavior, which can race with hydration when the component
  // swaps from FallbackPillars to the pinned layout on enable.
  return (
    <section ref={containerRef} className="relative" style={{ height: "540vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8">
          <div className="relative min-h-[74vh]">
            <ProgressDots count={3} active={active} />
            {pillars.map((p, i) => (
              <div
                key={p.id}
                data-pillar-text
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity, transform" }}
              >
                <PillarText pillar={p} compact />
              </div>
            ))}
          </div>

          <div className="relative flex min-h-[74vh] items-center justify-center">
            {pillars.map((p, i) => (
              <div
                key={p.id}
                data-pillar-phone
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity, transform" }}
              >
                <PhoneMockup
                  ariaLabel={`${p.visualLabel} screen`}
                  tilt={false}
                  className="!w-[clamp(200px,28vh,300px)]"
                >
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

function PillarText({ pillar, compact = false }: { pillar: Pillar; compact?: boolean }) {
  // `compact` is used inside the pinned viewport. Every dimension is
  // tightened so even the tallest pillar (research, with the longest
  // title + a multi-line insight + 3 capabilities) fits within the pin
  // window without the eyebrow being clipped at the top on standard
  // 1080p / 1440p laptop viewports.
  const titleClass = compact
    ? "mt-2 font-display text-[20px] md:text-[22px] font-semibold leading-[1.15] tracking-tight text-balance text-ink-primary"
    : "mt-3 text-sub text-balance text-ink-primary";
  const cardMt = compact ? "mt-3" : "mt-5";
  const cardPad = compact ? "!p-3" : "!p-4";
  const insightQuote = compact ? "text-[13px]" : "text-[14px]";
  const headlineMt = compact ? "mt-3" : "mt-5";
  const headlineSize = compact ? "text-[15px]" : "text-[20px]";
  const listMt = compact ? "mt-2.5" : "mt-4";
  const listSpacing = compact ? "space-y-1.5" : "space-y-2.5";
  const capName = compact ? "text-[13px]" : "text-[14px]";
  const capDesc = compact ? "text-[12px]" : "text-[13px]";
  // Pillars with 5+ capabilities (research has 6) trim to 2 in compact
  // mode so the column fits; the deep dive lives on /product anyway.
  const capCount = compact && pillar.capabilities.length >= 5 ? 2 : 3;

  return (
    <div className="max-w-xl">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Pillar {pillar.index}</p>
      <h3 className={titleClass}>{pillar.title}</h3>
      {pillar.clarifier && (
        <p className={`mt-2 ${compact ? "text-[13px]" : "text-[14px]"} italic text-starry-blue-light`}>{pillar.clarifier}</p>
      )}

      <Card className={`${cardMt} ${cardPad} !bg-starry-deep/60`} glow="violet">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Research insight</p>
        <p className={`mt-2 ${insightQuote} italic leading-snug text-ink-soft`}>“{pillar.insight.quote}”</p>
        <p className="mt-2 font-mono text-caption text-ink-muted">{pillar.insight.source}</p>
      </Card>

      <p className={`${headlineMt} font-display ${headlineSize} font-semibold leading-snug text-ink-primary`}>{pillar.headline}</p>

      <ul className={`${listMt} ${listSpacing}`}>
        {pillar.capabilities.slice(0, capCount).map((c) => (
          <li key={c.name} className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-starry-blue-light" />
            <div>
              <p className={`${capName} font-semibold text-ink-primary`}>{c.name}</p>
              <p className={`mt-0.5 ${capDesc} leading-snug text-ink-soft`}>{c.description}</p>
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
