"use client";

import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { appPartners } from "@/content/home";

/**
 * Home page "In partnership with" block. Sits between PressTeaser and
 * TeamTeaser on a light surface. Two logos at 60px tall in native colors,
 * centered with generous spacing. Logos fall back to the partner name in
 * brand-violet text if the asset file isn't present yet.
 */
export function HomePartners() {
  return (
    <section className="relative pb-12 pt-4 md:pb-16 md:pt-6">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="text-center font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            In partnership with
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 sm:gap-x-24">
            {appPartners.map((p) => (
              <li key={p.name} className="flex items-center">
                <PartnerLogo partner={p} />
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 text-center">
            <Link
              href="/partners"
              className="group/sec inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-violet-deep transition-colors hover:text-starry-violet"
            >
              See how we work with partners
              <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">→</span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Renders a partner logo inside a small white card so dark-on-dark
 *  wordmarks stay legible. Sizing uses max-h + max-w + object-contain so
 *  next/image's default max-width:100% can't fight a forced height and
 *  squash the aspect ratio. Both trimmed source logos have similar
 *  aspect ratios (~5.2:1) so a single shared sizing works. */
export function PartnerLogo({ partner }: { partner: { name: string; logo: string; href?: string; logoWidth: number; logoHeight: number } }) {
  const inner = (
    <GracefulImage
      src={partner.logo}
      alt={partner.name}
      width={partner.logoWidth}
      height={partner.logoHeight}
      className="h-auto w-auto max-h-[40px] max-w-[180px] object-contain"
      fallback={
        <span className="font-display text-[20px] font-semibold tracking-tight text-starry-violet-deep">
          {partner.name}
        </span>
      }
    />
  );
  const card = (
    <div className="flex h-[120px] w-[220px] items-center justify-center rounded-2xl bg-white px-4 ring-1 ring-starry-violet-soft/25 shadow-[0_10px_28px_-14px_rgba(31,39,71,0.18)] transition-shadow duration-200 hover:shadow-[0_14px_32px_-14px_rgba(31,39,71,0.28)]">
      {inner}
    </div>
  );
  if (partner.href) {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name} className="inline-flex">
        {card}
      </a>
    );
  }
  return card;
}
