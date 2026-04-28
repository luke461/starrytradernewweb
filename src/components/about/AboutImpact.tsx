"use client";

import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { CountUp } from "@/components/decoration/CountUp";
import { impactIcons, ArrowDownTrayIcon } from "./AboutIcons";
import { aboutImpact } from "@/content/about";

/**
 * Section E. Light-surface table of four impact dimensions. Numeric
 * values count up via CountUp when scrolled into view. When values are
 * empty (the launch state), render dash placeholders and the Q3 2026
 * message below.
 */
export function AboutImpact() {
  const hasNumbers = aboutImpact.rows.some((r) => r.value);

  return (
    <section id="impact" className="relative bg-light-pale py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            {aboutImpact.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-on-light">{aboutImpact.title}</h2>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-on-light-soft">{aboutImpact.lead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[20px] border border-starry-violet-soft/20 bg-white shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18)]">
            <table className="w-full text-left">
              <thead className="bg-starry-violet-soft/10">
                <tr>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep md:w-[28%]">What we measure</th>
                  <th className="hidden px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep md:table-cell">Why it matters</th>
                  <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep md:w-[18%]">Latest</th>
                  <th className="hidden px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep md:table-cell md:w-[14%]">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-starry-violet-soft/15">
                {aboutImpact.rows.map((row) => {
                  const Icon = impactIcons[row.icon];
                  return (
                    <tr key={row.metric} className="align-top">
                      <td className="px-6 py-5">
                        <span className="inline-flex items-start gap-3">
                          <Icon size={20} className="mt-0.5 shrink-0 text-starry-blue-light" />
                          <span>
                            <span className="block font-display text-[16px] font-semibold text-ink-on-light">{row.metric}</span>
                            <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-on-light-soft md:hidden">{row.why}</span>
                          </span>
                        </span>
                      </td>
                      <td className="hidden px-6 py-5 text-[14.5px] leading-relaxed text-ink-on-light-soft md:table-cell">{row.why}</td>
                      <td className="px-6 py-5">
                        {row.value ? (
                          <CountUp value={row.value} surface="light" className="text-[22px]" duration={1400} />
                        ) : (
                          <span className="font-display text-[20px] font-semibold text-ink-on-light-soft">—</span>
                        )}
                      </td>
                      <td className="hidden px-6 py-5 text-[13px] text-starry-violet-deep md:table-cell">
                        {row.delta ?? <span className="text-ink-on-light-soft">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {!hasNumbers && (
          <Reveal delay={0.2}>
            <p className="mt-6 text-center text-caption text-ink-on-light-soft">
              {aboutImpact.emptyMessage}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.25}>
          <div className="mt-10 flex justify-center">
            {aboutImpact.pdfPath ? (
              <a
                href={aboutImpact.pdfPath}
                className="inline-flex items-center gap-2 rounded-full border border-starry-violet/30 bg-white px-6 py-3 text-[15px] font-medium text-starry-violet-deep transition-colors hover:border-starry-violet hover:bg-starry-violet-soft/10"
              >
                <ArrowDownTrayIcon size={18} />
                Read the full Impact Report <span aria-hidden>→</span>
              </a>
            ) : (
              <Link
                href="/about#impact"
                className="inline-flex items-center gap-2 rounded-full border border-starry-violet/30 bg-white px-6 py-3 text-[15px] font-medium text-starry-violet-deep opacity-70 transition-opacity hover:opacity-100"
                aria-disabled
              >
                Impact Report — Q3 2026
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
