"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { patchNotes, patchNotesCloser, type PatchEntry } from "@/content/patchNotes";
import { JumpToLatest } from "@/components/patch-notes/JumpToLatest";

/**
 * The build-log timeline. Eighteen patches arranged as a vertical
 * constellation. Desktop alternates phone-left / phone-right. Mobile
 * stacks with the constellation line on the left edge.
 *
 * Interactions:
 *  - Line draws as you scroll (height tied to scrollYProgress)
 *  - The card crossing viewport center is "active" — its star node grows
 *  - Phone hovers scale up; clicking opens a lightbox at the source res
 *  - Up/Down arrows step between patches; Home/End jump to ends
 *  - prefers-reduced-motion: skips line draw + tilt + active-grow
 */
export function PatchTimeline() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const closerRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hitIdx, setHitIdx] = useState(-1);
  const starYRef = useRef<number[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Line draws as the timeline track scrolls past viewport center.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end end"],
  });
  // Spring-smooth the scroll driver so the line eases toward its target
  // instead of snapping. Reads as the line "catching up" to scroll and
  // briefly settling on each star — softer, more weighted motion.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 1,
  });
  // Hit detection should fire when the *visible* line tip reaches a star,
  // so subscribe to whichever progress drives the line. Under reduced
  // motion, bypass the spring entirely.
  const drivenProgress = reduceMotion ? scrollYProgress : smoothProgress;
  const lineHeight = useTransform(drivenProgress, [0, 1], ["0%", "100%"]);

  // Cache each star's Y offset within the section so we can detect when
  // the drawn line passes it. Recompute on resize and after a short delay
  // so images / fonts have a chance to settle the layout.
  useEffect(() => {
    function recompute() {
      const ys: number[] = [];
      cardRefs.current.forEach((el) => {
        if (!el) return;
        // StarNode is at top:50% of the card.
        ys.push(el.offsetTop + el.offsetHeight / 2);
      });
      if (closerRef.current) {
        ys.push(closerRef.current.offsetTop + closerRef.current.offsetHeight / 2);
      }
      starYRef.current = ys;
    }
    recompute();
    const timers = [setTimeout(recompute, 200), setTimeout(recompute, 800)];
    window.addEventListener("resize", recompute);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  // Drive `hitIdx` from the drawn line's actual bottom Y. Each star
  // pulses when the line crosses it. The cutoff is clamped to the mask
  // boundary (section height minus 30rem) so stars below the visible
  // line tail never get falsely "hit" at high scroll progress.
  // Subscribe to `drivenProgress` (the spring-smoothed value) so the
  // pulse fires exactly when the visible line tip reaches the star.
  useEffect(() => {
    const unsub = drivenProgress.on("change", (progress) => {
      if (!trackRef.current) return;
      const sectionH = trackRef.current.scrollHeight;
      const maxVisualY = sectionH - 30 * 16; // 30rem in px, matches mask transparent point
      const lineBottom = Math.min(progress * sectionH, maxVisualY);
      let highest = -1;
      starYRef.current.forEach((y, i) => {
        if (y <= lineBottom) highest = i;
      });
      setHitIdx((prev) => (prev !== highest ? highest : prev));
    });
    return unsub;
  }, [drivenProgress]);

  // Active node = the card whose vertical center is closest to the
  // viewport center. We poll on scroll instead of using IntersectionObserver
  // here because we need a single winner, not multiple intersecting cards.
  useEffect(() => {
    let raf = 0;
    function tick() {
      const vh = window.innerHeight;
      const vc = vh / 2;
      let bestIdx = activeIndex;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - vc);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      if (closerRef.current) {
        const r = closerRef.current.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - vc);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = patchNotes.length; // closer is "index" patchNotes.length
        }
      }
      if (bestIdx !== activeIndex) setActiveIndex(bestIdx);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeIndex]);

  // Keyboard nav: up / down step, Home / End jump.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox) return; // lightbox handles its own escape elsewhere
      const max = patchNotes.length; // closer = max index
      let next: number | null = null;
      if (e.key === "ArrowDown") next = Math.min(max, activeIndex + 1);
      else if (e.key === "ArrowUp") next = Math.max(0, activeIndex - 1);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = max;
      if (next === null) return;
      e.preventDefault();
      const target = next === max ? closerRef.current : cardRefs.current[next];
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, lightbox]);

  const openLightbox = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section ref={trackRef} className="relative bg-starry-deep pb-32 pt-12 md:pt-20">
      {/* Line region: both lines live inside a single mask wrapper so they
          fade out cleanly above the closer card instead of running through
          the closer text. The mask is in the wrapper's coordinate space
          (= section height) so it works regardless of the drawn line's
          current height. Tuned to terminate ~32rem above the section
          bottom which sits above the closer content on standard laptop
          viewports (where the closer is roughly 24-30rem tall). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 calc(100% - 34rem), transparent calc(100% - 30rem))",
          maskImage:
            "linear-gradient(to bottom, #000 calc(100% - 34rem), transparent calc(100% - 30rem))",
        }}
      >
        {/* Base line (dim, full-height) */}
        <div className="absolute bottom-0 top-0 w-px bg-starry-violet-soft/15 left-4 lg:left-1/2 lg:-translate-x-1/2" />
        {/* Drawn line (bright, scroll-driven) */}
        <motion.div
          style={{ height: reduceMotion ? "100%" : lineHeight }}
          className="absolute top-0 w-px bg-starry-violet-soft/60 left-4 lg:left-1/2 lg:-translate-x-1/2"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {patchNotes.map((p, i) => (
          <PatchCard
            key={p.number}
            patch={p}
            index={i}
            active={activeIndex === i}
            hit={hitIdx >= i}
            reduceMotion={reduceMotion}
            onClickPhone={() => openLightbox(p.image, p.alt)}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}

        <CloserCard
          closerRef={(el) => {
            closerRef.current = el;
          }}
        />
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
        )}
      </AnimatePresence>

      <JumpToLatest />
    </section>
  );
}

/* ---------------- Patch card ---------------- */

function PatchCard({
  patch,
  index,
  active,
  hit,
  reduceMotion,
  onClickPhone,
  cardRef,
}: {
  patch: PatchEntry;
  index: number;
  active: boolean;
  hit: boolean;
  reduceMotion: boolean;
  onClickPhone: () => void;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const phoneOnRight = index % 2 === 1; // patch 2, 4, 6 ...
  const localRef = useRef<HTMLElement | null>(null);

  // Phone tilt — map card scroll progress (0..1 across viewport) to a
  // small rotation. Phones lean toward the centre line of the page.
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 1], phoneOnRight ? [-2, 2] : [2, -2]);

  return (
    <article
      ref={(el) => {
        localRef.current = el;
        cardRef(el);
      }}
      id={index === 0 ? "patch-timeline-top" : undefined}
      data-index={index}
      className="relative pl-12 lg:pl-0 first:pt-4 [&:not(:first-child)]:pt-[20vh] scroll-mt-24"
    >
      {/* Star node on the line — desktop center, mobile left edge */}
      <StarNode active={active} hit={hit} reduceMotion={reduceMotion} />

      <div className={`grid grid-cols-1 items-center gap-8 lg:gap-16 lg:grid-cols-[1fr_1fr]`}>
        {/* Phone column */}
        <div
          className={`flex justify-center ${
            phoneOnRight ? "lg:order-2 lg:justify-start lg:pl-12" : "lg:order-1 lg:justify-end lg:pr-12"
          }`}
        >
          <PhoneFrame
            src={patch.image}
            alt={patch.alt}
            priority={index < 3}
            onClick={onClickPhone}
            rotateX={reduceMotion ? undefined : rotateX}
            rotateY={reduceMotion ? undefined : rotateY}
          />
        </div>

        {/* Text column */}
        <div
          className={`max-w-md ${
            phoneOnRight ? "lg:order-1 lg:justify-self-end lg:pr-12" : "lg:order-2 lg:pl-12"
          }`}
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.2em]">
            <span className="text-starry-blue-light">Patch {patch.number}</span>
            <span aria-hidden className="mx-2 text-ink-muted">·</span>
            <span className="text-ink-muted">{patch.era}</span>
          </p>
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight text-balance text-ink-primary">
            {patch.title}
          </h2>
          {patch.description && (
            <p
              className={`mt-3 max-w-[380px] text-[17px] leading-relaxed transition-opacity duration-300 ${
                active ? "text-ink-soft opacity-100" : "text-ink-soft opacity-80"
              }`}
            >
              {patch.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------- Star node ---------------- */

function StarNode({ active, hit, reduceMotion, large = false }: { active: boolean; hit: boolean; reduceMotion: boolean; large?: boolean }) {
  const baseSize = large ? 28 : 16;
  const activeSize = large ? 30 : 22;
  const size = reduceMotion ? baseSize : active ? activeSize : baseSize;

  // Fire a one-shot glow pulse the moment the drawn line's bottom edge
  // crosses this star's Y position. Driven by `hit` (computed in the
  // parent from scrollYProgress), not by `active` (which is viewport
  // centre based and therefore lagged a bit behind the line tip).
  const [pulses, setPulses] = useState<number[]>([]);
  const prevHit = useRef(hit);
  useEffect(() => {
    if (hit && !prevHit.current && !reduceMotion) {
      const id = Date.now() + Math.random();
      setPulses((p) => [...p, id]);
      const t = setTimeout(() => {
        setPulses((p) => p.filter((x) => x !== id));
      }, 800);
      prevHit.current = hit;
      return () => clearTimeout(t);
    }
    prevHit.current = hit;
  }, [hit, reduceMotion]);

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 left-4 lg:left-1/2"
      style={{
        width: size,
        height: size,
        transition: reduceMotion ? "none" : "width 320ms cubic-bezier(0.16, 1, 0.3, 1), height 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        filter: active ? "drop-shadow(0 0 12px rgba(127, 200, 255, 0.85))" : "drop-shadow(0 0 4px rgba(127, 200, 255, 0.45))",
      }}
    >
      {pulses.map((id) => (
        <motion.span
          key={id}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          initial={{ scale: 0.8, opacity: 0.9 }}
          animate={{ scale: 4.2, opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              "radial-gradient(circle, rgba(127,200,255,0.75), rgba(127,200,255,0) 65%)",
          }}
        />
      ))}

      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
        <path
          d="M12 2c.4 4.5 1.6 7 4.5 8.2-2.9 1.3-4 3.8-4.5 8.3-.4-4.5-1.6-7-4.5-8.3C10.4 9 11.6 6.5 12 2Z"
          fill="#7FC8FF"
          opacity={active ? 1 : 0.85}
        />
      </svg>
    </span>
  );
}

/* ---------------- Phone frame ---------------- */

function PhoneFrame({
  src,
  alt,
  priority,
  onClick,
  rotateX,
  rotateY,
}: {
  src: string;
  alt: string;
  priority: boolean;
  onClick: () => void;
  rotateX?: MotionValue<number>;
  rotateY?: MotionValue<number>;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] focus-visible:outline-none"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      aria-label={`Open larger view: ${alt}`}
    >
      {/* Cosmic glow behind the phone */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-12 rounded-full opacity-50 blur-[60px] transition-opacity duration-300 group-hover:opacity-80"
        style={{ background: "radial-gradient(circle, rgba(107,91,255,0.5), transparent 65%)" }}
      />
      {/* Device frame */}
      <span className="relative block w-[240px] sm:w-[260px] lg:w-[280px] rounded-[36px] border-[6px] border-black bg-black p-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        {/* Screen */}
        <span className="relative block aspect-[9/19.5] overflow-hidden rounded-[26px] bg-starry-deep">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 240px, 280px"
            className="object-cover"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
          {/* Notch */}
          <span aria-hidden className="absolute left-1/2 top-1.5 h-3 w-16 -translate-x-1/2 rounded-full bg-black/95" />
        </span>
      </span>
    </motion.button>
  );
}

/* ---------------- Closer card ---------------- */

function CloserCard({
  closerRef,
}: {
  closerRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={closerRef}
      id="patch-notes-closer"
      className="relative pt-[24vh] pl-12 text-left lg:pl-0 lg:text-center scroll-mt-24"
    >
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-starry-blue-light">
          {patchNotesCloser.era}
        </p>
        <h2 className="mt-4 font-display text-[36px] font-semibold leading-tight text-ink-primary">
          {patchNotesCloser.title}
        </h2>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
          {patchNotesCloser.description}
        </p>
        <a
          href={patchNotesCloser.ctaMailto}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-starry-violet-deep px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-starry-violet"
        >
          {patchNotesCloser.ctaLabel} <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

/* ---------------- Lightbox ---------------- */

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-starry-deep/92 backdrop-blur-md" />
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 z-10 rounded-full p-2 text-ink-soft transition-colors hover:bg-white/10 hover:text-ink-primary"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-h-[90vh] max-w-[min(540px,90vw)] items-center justify-center"
      >
        <div className="relative aspect-[9/19.5] h-[88vh] max-h-[88vh] overflow-hidden rounded-[36px] border-[6px] border-black bg-starry-deep shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
          <Image src={src} alt={alt} fill sizes="540px" className="object-cover" priority />
          <span aria-hidden className="absolute left-1/2 top-2 h-3.5 w-20 -translate-x-1/2 rounded-full bg-black/95" />
        </div>
      </motion.div>
    </motion.div>
  );
}
