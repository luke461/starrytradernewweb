"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { reviews, type Review } from "@/content/home";

const toneClasses: Record<Review["tone"], string> = {
  violet: "from-starry-violet/40 to-starry-violet/0",
  blue: "from-starry-blue-light/40 to-starry-blue-light/0",
  indigo: "from-starry-violet-soft/40 to-starry-violet-soft/0",
};

const ringClasses: Record<Review["tone"], string> = {
  violet: "from-starry-violet to-starry-violet-soft",
  blue: "from-starry-blue-light to-starry-violet-soft",
  indigo: "from-starry-violet to-starry-blue-light",
};

export function Reviews() {
  return (
    <section className="relative py-28 md:py-36">
      <Sparkle tone="violet" size={26} className="pointer-events-none absolute left-[7%] top-24 hidden md:block" />
      <Sparkle size={20} className="pointer-events-none absolute right-[12%] top-32 hidden md:block" />
      <Sparkle tone="violet-soft" size={22} className="pointer-events-none absolute left-[18%] bottom-32 hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What users are saying"
            title="From the people we built it for."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.attribution} delay={(i % 3) * 0.08}>
              <Card interactive className={`h-full bg-gradient-to-br ${toneClasses[r.tone]} bg-starry-mid`}>
                <div className="flex items-center justify-between gap-3">
                  <SourceLabel source={r.source} href={r.sourceHref} />
                  {r.rating && <Stars rating={r.rating} />}
                </div>

                {r.title && (
                  <h3 className="mt-5 font-display text-[20px] font-semibold leading-snug text-ink-primary">
                    {r.title}
                  </h3>
                )}

                <p className={`${r.title ? "mt-3" : "mt-5"} text-[16px] leading-relaxed text-ink-soft`}>
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={r.attribution} tone={r.tone} />
                  <p className="text-[13px] leading-tight text-ink-soft">
                    <span className="font-medium text-ink-primary">{r.attribution}</span>
                    {r.attributionDetail && (
                      <>
                        <br />
                        <span className="text-ink-muted">{r.attributionDetail}</span>
                      </>
                    )}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5 text-starry-blue-light" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, j) => (
        <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={j < filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 2 14.9 8.6 22 9.3l-5.5 4.8 1.7 7L12 17.8 5.8 21l1.7-7L2 9.3l7.1-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function SourceLabel({ source, href }: { source: string; href?: string }) {
  const label = (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">
      {source}
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 transition-opacity duration-200 hover:opacity-80"
      >
        {label}
        <span aria-hidden className="text-[11px] text-starry-blue-light">↗</span>
      </a>
    );
  }
  return label;
}

function Avatar({ name, tone }: { name: string; tone: Review["tone"] }) {
  return (
    <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${ringClasses[tone]} text-[13px] font-semibold text-white`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
