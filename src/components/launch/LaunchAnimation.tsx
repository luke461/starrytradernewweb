"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useFirstVisit } from "@/lib/useFirstVisit";

const LAUNCH_COMPLETE_EVENT = "starry:launch-complete";

/**
 * One-shot launch animation per the v4.2 brief (refined).
 * - Mounts only on the first session visit to `/`.
 * - Skipped entirely under prefers-reduced-motion.
 * - Sets `document.body.dataset.launchPending = "1"` on mount so other
 *   components (like the global StarField) can defer themselves until the
 *   `starry:launch-complete` event fires.
 */
export function LaunchAnimation() {
  const isFirst = useFirstVisit();
  if (!isFirst) return null;
  return <LaunchAnimationInner />;
}

function LaunchAnimationInner() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shootingStarRef = useRef<HTMLDivElement | null>(null);
  const logoStarRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLSpanElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const phoneScreenRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Tell other components a launch is in flight so they can defer themselves
    // (StarField uses this to render at opacity 0 until the complete event).
    document.body.dataset.launchPending = "1";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      delete document.body.dataset.launchPending;
      window.dispatchEvent(new CustomEvent(LAUNCH_COMPLETE_EVENT));
      setDone(true);
      return;
    }
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const stopStars = setupStarfield(canvasRef.current, isMobile);

    // Initial states
    gsap.set(logoStarRef.current, { opacity: 0, scale: 0.5, transformOrigin: "center" });
    gsap.set(wordmarkRef.current, { opacity: 0, x: -10 });
    gsap.set(phoneRef.current, { opacity: 0, scale: 0.85, transformOrigin: "center" });
    gsap.set(beamRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(shootingStarRef.current, { opacity: 0 });
    gsap.set([headlineRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 20 });
    if (phoneScreenRef.current) {
      gsap.set(phoneScreenRef.current.querySelectorAll("[data-launch-card]"), { opacity: 0, y: 6 });
    }

    function positionBeam() {
      if (!logoStarRef.current || !phoneRef.current || !beamRef.current) return;
      const logo = logoStarRef.current.getBoundingClientRect();
      const phone = phoneRef.current.getBoundingClientRect();
      const sx = logo.left + logo.width / 2;
      const sy = logo.top + logo.height / 2;
      const ex = isMobile ? sx : phone.left + phone.width / 2;
      const ey = isMobile ? phone.top + 40 : phone.top + 60;
      const dx = ex - sx;
      const dy = ey - sy;
      const len = Math.hypot(dx, dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const el = beamRef.current;
      el.style.left = `${sx}px`;
      el.style.top = `${sy}px`;
      el.style.width = `${len}px`;
      el.style.transform = `rotate(${angle}deg) scaleX(0)`;
    }
    positionBeam();
    window.addEventListener("resize", positionBeam, { passive: true });

    const shootingStarTarget = () => {
      if (!logoStarRef.current) return { x: 0, y: 0 };
      const r = logoStarRef.current.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const tl = gsap.timeline({ onComplete: finish });
    if (isMobile) tl.timeScale(1.15);
    tlRef.current = tl;

    tl
      .set(shootingStarRef.current, { x: -100, y: 80, opacity: 1, scale: 1 }, 0.6)
      .to(
        shootingStarRef.current,
        {
          x: () => shootingStarTarget().x,
          y: () => shootingStarTarget().y,
          duration: 0.7,
          ease: "power2.in",
        },
        0.6,
      )
      .to(shootingStarRef.current, { scale: 4, opacity: 0, duration: 0.2, ease: "power2.out" }, 1.3)
      .to(logoStarRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 1.3)
      .to(wordmarkRef.current, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 1.6)
      .to(beamRef.current, { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" }, 1.9)
      .to(phoneRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }, 2.2)
      .to(beamRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 2.4)
      .to(
        phoneScreenRef.current?.querySelectorAll("[data-launch-card]") ?? [],
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.08 },
        2.7,
      )
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.6)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.85)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 3.05);

    function finish() {
      window.removeEventListener("resize", positionBeam);
      // Coordinated 800ms exit:
      //   - Launch canvas stars dissolve over 600ms starting immediately
      //   - Overlay bg fades over 500ms starting at +300ms
      //   - The real StarField (listening for `starry:launch-complete`) starts
      //     fading in 800ms after the event, which roughly mirrors the bg fade.
      const exitTl = gsap.timeline({
        onComplete: () => {
          stopStars();
          delete document.body.dataset.launchPending;
          window.dispatchEvent(new CustomEvent(LAUNCH_COMPLETE_EVENT));
          setDone(true);
        },
      });
      exitTl
        .to(canvasRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0)
        .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0.3);
    }

    return () => {
      tl.kill();
      window.removeEventListener("resize", positionBeam);
      stopStars();
      delete document.body.dataset.launchPending;
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} aria-hidden className="fixed inset-0 z-50 overflow-hidden bg-starry-deep">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Logo — real image, mirrors Nav.Logo position. */}
      <div className="pointer-events-none absolute left-5 top-[18px] flex items-center gap-3 md:left-8">
        <div ref={logoStarRef} className="h-7 w-7">
          <Image
            src="/brand/starrytrader-logo-light.png"
            alt=""
            width={28}
            height={28}
            priority
            className="h-full w-full object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(127, 200, 255, 0.6))" }}
          />
        </div>
        <span
          ref={wordmarkRef}
          className="font-display text-[18px] font-semibold tracking-tight text-ink-primary"
        >
          StarryTrader
        </span>
      </div>

      <div
        ref={shootingStarRef}
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: 6, height: 6 }}
      >
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{
            width: 100,
            height: 2,
            background: "linear-gradient(to left, #7FC8FF, transparent)",
            filter: "blur(0.5px)",
          }}
        />
        <div
          className="absolute h-full w-full rounded-full"
          style={{
            background: "#7FC8FF",
            boxShadow: "0 0 12px 2px rgba(127, 200, 255, 0.9)",
          }}
        />
      </div>

      <div
        ref={beamRef}
        className="pointer-events-none absolute"
        style={{
          height: 1,
          background: "linear-gradient(to right, rgba(127,200,255,0.9), rgba(127,200,255,0))",
          filter: "blur(0.5px)",
        }}
      />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 pt-20 md:px-8 md:pt-28 lg:pt-36">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col">
            <h1 ref={headlineRef} className="text-hero text-balance text-ink-primary">
              Investing, explained.
            </h1>
            <p ref={subRef} className="mt-7 max-w-xl text-body-lg text-ink-soft">
              StarryTrader teaches Gen Z how markets actually work. Without the shame, without the hype.
            </p>
            <div ref={ctaRef} className="mt-9">
              <span className="inline-flex h-12 items-center rounded-full bg-starry-violet-deep px-6 text-[16px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)]">
                Get in touch
              </span>
            </div>
          </div>

          <div ref={phoneRef} className="relative mx-auto">
            <PhoneStandIn ref={phoneScreenRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

const PhoneStandIn = ({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) => (
  <div
    className="relative w-[260px] sm:w-[280px]"
    style={{ filter: "drop-shadow(0 40px 80px rgba(76, 63, 224, 0.25))" }}
  >
    <div className="relative aspect-[9/19.5] rounded-[42px] border border-white/15 bg-gradient-to-b from-starry-soft to-starry-deep p-2.5">
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
      <div
        ref={ref}
        className="relative flex h-full flex-col gap-2 overflow-hidden rounded-[34px] bg-starry-deep p-4 pt-12"
      >
        <div data-launch-card className="surface-card !rounded-2xl !p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-starry-blue-light">
            Why it moved today
          </p>
          <p className="mt-2 font-display text-[14px] font-semibold leading-snug text-ink-primary">
            NVDA traded sideways as investors waited for the Fed minutes.
          </p>
        </div>
        <div data-launch-card className="surface-card !rounded-xl !p-3">
          <p className="font-display text-[12px] font-semibold text-ink-primary">AAPL</p>
          <p className="font-mono text-[11px] text-starry-blue-light">+0.4%</p>
        </div>
        <div data-launch-card className="surface-card !rounded-xl !p-3">
          <p className="font-display text-[12px] font-semibold text-ink-primary">TSLA</p>
          <p className="font-mono text-[11px] text-starry-blue-light">−1.1%</p>
        </div>
        <div data-launch-card className="surface-card !rounded-xl !p-3">
          <p className="font-display text-[12px] font-semibold text-ink-primary">MSFT</p>
          <p className="font-mono text-[11px] text-starry-blue-light">+0.9%</p>
        </div>
      </div>
    </div>
  </div>
);

function setupStarfield(canvas: HTMLCanvasElement | null, isMobile: boolean): () => void {
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    if (!canvas) return;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }
  size();

  const targetCount = isMobile
    ? Math.min(250, Math.floor((window.innerWidth * window.innerHeight) / 6000))
    : Math.floor((window.innerWidth * window.innerHeight) / 6000);

  const stars = Array.from({ length: targetCount }, () => {
    const r = Math.random() * 1.2 + 0.4;
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r,
      twinkleSpeed: Math.random() * 0.0015 + 0.0005,
      twinklePhase: Math.random() * Math.PI * 2,
      tone: Math.random() < 0.7 ? "155, 143, 255" : "127, 200, 255",
      fadeStart: Math.random() * 0.5,
      glow: r > 1.2,
    };
  });

  const startTime = performance.now();
  let raf = 0;
  function tick() {
    if (!ctx || !canvas) return;
    const now = performance.now();
    const elapsed = (now - startTime) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const s of stars) {
      const fade = Math.min(1, Math.max(0, (elapsed - s.fadeStart) / 0.4));
      const tw = 0.7 + 0.3 * Math.sin(now * s.twinkleSpeed + s.twinklePhase);
      const alpha = fade * tw * 0.85;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.tone}, ${alpha.toFixed(3)})`;
      if (s.glow) {
        ctx.shadowColor = `rgba(${s.tone}, ${(alpha * 0.6).toFixed(3)})`;
        ctx.shadowBlur = 4;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  function onResize() {
    size();
  }
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
  };
}
