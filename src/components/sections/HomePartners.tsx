"use client";

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
      </div>
    </section>
  );
}

/** Renders a partner logo inside a small white card so dark-on-dark
 *  wordmarks stay legible. Card height is fixed so MooMoo and uSMART
 *  cards sit on the same baseline; per-partner logoHeightClass tunes
 *  the wordmark visual size independent of source PNG padding. */
export function PartnerLogo({ partner }: { partner: { name: string; logo: string; href?: string; logoHeightClass?: string } }) {
  const inner = (
    <GracefulImage
      src={partner.logo}
      alt={partner.name}
      width={200}
      height={80}
      className={`${partner.logoHeightClass ?? "h-[44px]"} w-auto`}
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
