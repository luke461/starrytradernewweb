"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { press } from "@/content/home";

export function Press() {
  return (
    <section id="press" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Press"
            title="In the press."
            subtitle="Two pieces, written by two campus newsrooms on two continents, about how a National Service bunk in Singapore became the unlikely starting point for an investing app used in fifteen countries."
          />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {press.map((p, i) => (
            <Reveal key={p.publication} delay={i * 0.1}>
              <Card interactive className="h-full">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{p.publication}</p>
                  <p className="font-mono text-caption text-ink-muted">{p.date}</p>
                </div>
                <h3 className="mt-4 text-sub text-ink-primary">{p.headline}</h3>
                <div className="mt-5 flex gap-3">
                  <Sparkle size={20} className="shrink-0" />
                  <p className="text-[16px] italic leading-relaxed text-ink-soft">“{p.quote}”</p>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-starry-blue-light transition-colors hover:text-starry-blue-soft"
                >
                  Read the full article
                  <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
                </a>
              </Card>
            </Reveal>
          ))}

          <div className="hidden lg:flex pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 items-center justify-center">
            <div className="flex w-1/2 items-center gap-3">
              <Constellation className="h-10 w-40 opacity-50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Singapore ↔ Chicago
              </span>
              <Constellation className="h-10 w-40 opacity-50" />
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-caption text-ink-muted">
          Press inquiries: <a href="mailto:press@starrytrader.com" className="text-ink-soft hover:text-ink-primary">press@starrytrader.com</a>. We respond within 48 hours.
        </p>
      </div>
    </section>
  );
}
