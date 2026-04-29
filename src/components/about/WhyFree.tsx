"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { commitmentIcons, ArrowDownTrayIcon } from "./AboutIcons";
import { Reveal } from "@/components/decoration/Reveal";
import { aboutWhyFree } from "@/content/about";

/**
 * Section C. The trust-building centrepiece. Dark surface for contrast
 * with the light hero/story sections. Four commitment cards arranged 2x2
 * on desktop, stacked on mobile. Cards 1+2 enter from the left,
 * cards 3+4 from the right, with 120ms stagger.
 */
export function WhyFree() {
  return (
    <section className="relative bg-starry-deep py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
            {aboutWhyFree.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-primary">{aboutWhyFree.title}</h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-body-lg text-ink-soft">
          {aboutWhyFree.lead.map((p, i) => (
            <Reveal key={i} delay={0.05 + i * 0.04}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 font-mono text-[12px] uppercase tracking-[0.18em] text-starry-blue-light">
            {aboutWhyFree.commitmentsHeading}
          </p>
        </Reveal>

        <CommitmentGrid />

        <Reveal delay={0.4}>
          <Link
            href={aboutWhyFree.reportCallout.href}
            className="mt-14 flex items-start gap-4 rounded-[16px] border-l-4 bg-white/[0.03] py-5 pl-6 pr-7 transition-colors hover:bg-white/[0.06]"
            style={{ borderColor: "var(--starry-blue-light)" }}
          >
            <ArrowDownTrayIcon size={22} className="mt-0.5 shrink-0 text-starry-blue-light" />
            <span className="flex-1 text-body text-ink-primary">{aboutWhyFree.reportCallout.label}</span>
            <span aria-hidden className="text-starry-blue-light">→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.45}>
          <Link
            href="/funding"
            className="group/sec mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
          >
            Read about how we plan to be funded
            <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CommitmentGrid() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {aboutWhyFree.commitments.map((c, i) => {
        const Icon = commitmentIcons[c.icon];
        const fromLeft = i < 2; // cards 1+2 enter from left, 3+4 from right
        const initialX = reduceMotion ? 0 : fromLeft ? -24 : 24;
        const visible = shown || reduceMotion;
        return (
          <div
            key={c.title}
            className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-starry-mid/60 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet-soft/40 hover:shadow-[0_24px_56px_-26px_rgba(155,143,255,0.35)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translate(0, 0)" : `translate(${initialX}px, 0)`,
              transition: reduceMotion
                ? "none"
                : `opacity 420ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms, transform 520ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms, border-color 300ms, box-shadow 300ms`,
            }}
          >
            <Icon size={26} className="text-starry-blue-light" />
            <h3 className="mt-5 font-display text-[20px] font-semibold leading-snug text-ink-primary">
              {c.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        );
      })}
    </div>
  );
}
