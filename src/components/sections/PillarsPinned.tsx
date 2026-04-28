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
          // Higher scrub = weighted, cinematic feel. 0.3 felt jittery
          // on fast scroll; 0.8 is the cinematic-but-still-responsive
          // sweet spot for three-card pinned narratives.
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // +0.02 nudge so the active dot doesn't flicker exactly at
            // the 1/3 / 2/3 boundary while scrubbing across it.
            const idx = Math.min(2, Math.floor(self.progress * 3 + 0.02));
            setActive(idx);
          },
        },
      });

      // Timeline duration is normalised to 1.0 so positions read as
      // fractions of the pinned scroll range. Each pillar gets a real
      // dwell window — the old timing left pillar 3 fully visible only
      // at the very last frame.
      //   Pillar 1 dwell:    0.00 → 0.33
      //   Transition 1 → 2:  0.33 → 0.48 (3% overlap)
      //   Pillar 2 dwell:    0.48 → 0.66
      //   Transition 2 → 3:  0.66 → 0.81 (3% overlap)
      //   Pillar 3 dwell:    0.81 → 1.00
      const FADE = 0.12;

      tl.to(texts[0],  { opacity: 0, y: -20, duration: FADE }, 0.33)
        .to(phones[0], { opacity: 0, scale: 0.96, duration: FADE }, 0.33)
        .to(texts[1],  { opacity: 1, y: 0, duration: FADE }, 0.36)
        .to(phones[1], { opacity: 1, scale: 1, duration: FADE }, 0.36)
        .to(texts[1],  { opacity: 0, y: -20, duration: FADE }, 0.66)
        .to(phones[1], { opacity: 0, scale: 0.96, duration: FADE }, 0.66)
        .to(texts[2],  { opacity: 1, y: 0, duration: FADE }, 0.69)
        .to(phones[2], { opacity: 1, scale: 1, duration: FADE }, 0.69);

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
    <section ref={containerRef} className="relative" style={{ height: "340vh" }}>
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
  // `compact` reduces vertical space so the full pillar block fits inside
  // the pinned viewport without pushing the eyebrow off-screen on shorter
  // laptops. The fallback stacked layout passes compact=false.
  const titleClass = compact
    ? "mt-3 font-display text-[24px] md:text-[26px] font-semibold leading-tight tracking-tight text-balance text-ink-primary"
    : "mt-3 text-sub text-balance text-ink-primary";
  const cardMt = compact ? "mt-4" : "mt-5";
  const headlineMt = compact ? "mt-4" : "mt-5";
  const headlineSize = compact ? "text-[17px]" : "text-[20px]";
  const listMt = compact ? "mt-3" : "mt-4";
  const listSpacing = compact ? "space-y-2" : "space-y-2.5";

  return (
    <div className="max-w-xl">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Pillar {pillar.index}</p>
      <h3 className={titleClass}>{pillar.title}</h3>
      {pillar.clarifier && (
        <p className="mt-2 text-[14px] italic text-starry-blue-light">{pillar.clarifier}</p>
      )}

      <Card className={`${cardMt} !p-4 !bg-starry-deep/60`} glow="violet">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Research insight</p>
        <p className="mt-2 text-[14px] italic leading-snug text-ink-soft">“{pillar.insight.quote}”</p>
        <p className="mt-2 font-mono text-caption text-ink-muted">{pillar.insight.source}</p>
      </Card>

      <p className={`${headlineMt} font-display ${headlineSize} font-semibold leading-snug text-ink-primary`}>{pillar.headline}</p>

      <ul className={`${listMt} ${listSpacing}`}>
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
