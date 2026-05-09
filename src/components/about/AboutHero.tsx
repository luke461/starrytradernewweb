"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/decoration/Reveal";
import { FreeConstellation } from "./FreeConstellation";
import { aboutHero } from "@/content/about";
import { site } from "@/lib/site";

/**
 * About page hero. Light surface with a soft violet gradient in the
 * upper-right corner. The word "free" in the headline is haloed by a
 * six-dot constellation that animates in on first scroll into view.
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 90% 0%, rgba(155, 143, 255, 0.22), transparent 65%), radial-gradient(ellipse 45% 40% at 10% 80%, rgba(127, 200, 255, 0.16), transparent 65%), var(--starry-surface-pale)",
        }}
      />

      {/* Brand watermark. Anchored off the right edge, low opacity, mask-faded
          on the left so it dissolves before reaching the headline column.
          Hidden under md so mobile headlines aren't crowded. Decorative; the
          wordmark already exists in the nav so this is aria-hidden. */}
      <Image
        src="/brand/starrytrader-logo-light.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        priority
        className="pointer-events-none absolute right-[-10%] top-1/2 hidden h-[60vh] max-h-[640px] w-auto -translate-y-1/2 select-none opacity-[0.55] md:block lg:right-[-6%]"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
          filter: "saturate(1.25) contrast(1.08)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-24 md:px-8 md:pb-28 md:pt-32 lg:pt-40">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            {aboutHero.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 text-hero text-balance text-ink-on-light">
            {/* Wrap the word "free" in a relatively-positioned span so the
                constellation can float above it. */}
            <span className="block">Free <span className="relative inline-block">
              <FreeConstellation className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[58%] h-7 w-[180px] md:h-9 md:w-[220px]" />
              financial
            </span> education for the next generation of investors.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-on-light-soft">
            {aboutHero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" surface="light" href={site.appLinks.appStore} external withArrow magnetic>
              {aboutHero.primaryCta.label}
            </Button>
            <a
              href={aboutHero.secondaryCta.href}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-violet-deep transition-colors hover:text-starry-violet"
            >
              {aboutHero.secondaryCta.label} <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
