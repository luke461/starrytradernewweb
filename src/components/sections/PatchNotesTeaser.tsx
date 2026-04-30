"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { patchNotes } from "@/content/patchNotes";

/**
 * /product teaser for the build log. Editorial layout: latest patch is
 * the hero (with screenshot), the previous two patches are compact
 * text-only entries on the right. A constellation dot strip at the foot
 * previews the full 18-patch timeline that lives at /patch-notes.
 */
export function PatchNotesTeaser() {
  const all = patchNotes;
  const latest = all[all.length - 1];
  const previous = all.slice(-3, -1).reverse();

  return (
    <section className="relative overflow-hidden bg-starry-deep py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 80% 15%, rgba(107,91,255,0.16), transparent 65%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(127,200,255,0.10), transparent 60%)",
        }}
      />

      <Sparkle tone="violet-soft" size={22} className="pointer-events-none absolute right-[6%] top-20 hidden md:block" />
      <Sparkle size={18} className="pointer-events-none absolute left-[8%] top-1/2 hidden lg:block" />
      <Sparkle tone="violet" size={20} className="pointer-events-none absolute right-[14%] bottom-20 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-2xl">
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
                The build log
              </p>
              <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-balance text-ink-primary md:text-[48px]">
                Eighteen patches in.
                <br />
                Still shipping.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-soft md:text-right">
              Every release that built StarryTrader, in order. The three most recent are below.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.05} className="lg:col-span-7">
            <Link
              href="/patch-notes"
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.06] bg-starry-mid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/15 hover:shadow-[0_30px_60px_-30px_rgba(11,16,36,0.9)] sm:flex-row"
            >
              <div className="relative shrink-0 self-stretch sm:w-[180px] md:w-[200px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(107,91,255,0.22), transparent 70%)",
                  }}
                />
                <div className="relative mx-auto h-full max-h-[300px] w-[150px] py-7 sm:max-h-none sm:w-full sm:px-5 sm:py-7 md:px-6 md:py-8">
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[18px] border-[3px] border-black bg-black shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]">
                    <GracefulImage
                      src={latest.image}
                      alt={latest.alt}
                      fill
                      sizes="(max-width: 640px) 150px, 200px"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      wrapperClassName="absolute inset-0"
                    />
                    <span aria-hidden className="absolute left-1/2 top-1 h-2 w-10 -translate-x-1/2 rounded-full bg-black/95" />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center p-6 sm:p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <StarMark />
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
                    Patch {latest.number} · Latest release
                  </p>
                </div>
                <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug text-ink-primary md:text-[26px]">
                  {latest.title}
                </h3>
                {latest.description && (
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {latest.description}
                  </p>
                )}
                <p className="mt-5 font-mono text-caption text-ink-muted">{latest.era}</p>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-5">
            <ul className="flex h-full flex-col gap-5">
              {previous.map((p, i) => (
                <li key={p.number}>
                  <Reveal delay={0.12 + i * 0.08}>
                    <Link
                      href="/patch-notes"
                      className="group relative flex gap-5 rounded-[18px] border border-white/[0.05] bg-starry-mid/60 p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/15 hover:bg-starry-mid"
                    >
                      <div className="relative shrink-0 self-start pt-0.5">
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-10 scale-[1.8] rounded-full opacity-70 blur-xl"
                          style={{ background: "rgba(107,91,255,0.20)" }}
                        />
                        <StarMark />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-starry-blue-light">
                            Patch {p.number}
                          </p>
                          <p className="font-mono text-caption text-ink-muted">{p.era}</p>
                        </div>
                        <h3 className="mt-2 font-display text-[17px] font-semibold leading-snug text-ink-primary">
                          {p.title}
                        </h3>
                        {p.description && (
                          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                            {p.description}
                          </p>
                        )}
                      </div>
                      <span
                        aria-hidden
                        className="self-center text-starry-blue-light/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-starry-blue-light"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <ConstellationStrip total={all.length} highlightedFromEnd={3} />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                3 of {all.length} patches shown
              </p>
            </div>
            <Link
              href="/patch-notes"
              className="group inline-flex items-center gap-2 rounded-full border border-starry-blue-light/30 bg-starry-blue-light/5 px-5 py-2.5 text-[14px] font-medium text-starry-blue-light transition-all duration-200 hover:border-starry-blue-light/60 hover:bg-starry-blue-light/10"
            >
              See the full build log
              <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A small four-pointed star sitting inside a soft radial halo. Mirrors
 *  the star node motif used by PatchTimeline and the cosmic decorations
 *  elsewhere on the site. */
function StarMark() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-7 w-7 items-center justify-center rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(127,200,255,0.35), rgba(127,200,255,0) 70%)",
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <path
          d="M12 2c.4 4.5 1.6 7 4.5 8.2-2.9 1.3-4 3.8-4.5 8.3-.4-4.5-1.6-7-4.5-8.3C10.4 9 11.6 6.5 12 2Z"
          fill="#7FC8FF"
        />
      </svg>
    </span>
  );
}

/** Horizontal dot strip showing the entire patch history. The last N
 *  dots are highlighted so the visitor sees how many patches have
 *  shipped in total versus how many are previewed above. */
function ConstellationStrip({
  total,
  highlightedFromEnd,
}: {
  total: number;
  highlightedFromEnd: number;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => {
        const highlighted = i >= total - highlightedFromEnd;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: highlighted ? 1 : 0.3, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.32,
              delay: i * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`h-1.5 w-1.5 rounded-full ${
              highlighted ? "bg-starry-blue-light" : "bg-white/15"
            }`}
            style={
              highlighted
                ? { boxShadow: "0 0 8px rgba(127,200,255,0.6)" }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
