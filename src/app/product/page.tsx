import type { Metadata } from "next";
import Image from "next/image";
import { PillarsPinned } from "@/components/sections/PillarsPinned";
import { Reviews } from "@/components/sections/Reviews";
import { PatchNotesTeaser } from "@/components/sections/PatchNotesTeaser";
import { StatsBand } from "@/components/sections/StatsBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { ScrollToTopOnLoad } from "@/components/decoration/ScrollToTopOnLoad";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "What we’re building",
  description: "Three pillars. One path to financial literacy. Learn, Research, Compete. Built around the way Gen Z actually learns.",
};

export default function ProductPage() {
  return (
    <div className="relative">
      <ScrollToTopOnLoad />

      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />

        {/* Watermark logo anchored off the right edge with a left-fade mask
            so it dissolves before reaching the centred title. Decorative. */}
        <Image
          src="/brand/starrytrader-logo-light.png"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-auto w-[36vw] max-w-[420px] -translate-y-1/2 select-none opacity-[0.16] md:block lg:right-[-6%]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, #000 45%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 45%)",
          }}
        />

        {/* Decorative sparkles around the hero title */}
        <Sparkle tone="violet" size={28} className="pointer-events-none absolute left-[18%] top-20 hidden md:block" />
        <Sparkle size={22} className="pointer-events-none absolute right-[20%] top-28 hidden md:block" />
        <Sparkle tone="violet-soft" size={18} className="pointer-events-none absolute left-[32%] bottom-10 hidden md:block" />
        <Sparkle tone="violet" size={20} className="pointer-events-none absolute right-[15%] bottom-16 hidden lg:block" />

        <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="The product"
              title="Three pillars. One path to financial literacy."
              subtitle="Most fintech tools force learners into a single mode. StarryTrader builds three connected experiences that match how Gen Z actually learns: foundational knowledge, real-time context, and competitive practice."
            />
          </Reveal>
        </div>
      </section>

      <PillarsPinned />

      <RoadmapAndCompliance />

      <StatsBand />
      <Reviews />
      <PatchNotesTeaser />
      <FinalCta />
    </div>
  );
}

function RoadmapAndCompliance() {
  return (
    <section className="relative py-20">
      <Sparkle tone="violet-soft" size={20} className="pointer-events-none absolute left-[8%] top-12 hidden lg:block" />
      <Sparkle size={24} className="pointer-events-none absolute right-[10%] top-24 hidden md:block" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-gradient-to-br from-starry-mid to-starry-soft p-10">
            <Sparkle tone="violet" size={18} className="absolute right-8 top-8 opacity-80" />

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Roadmap</p>
            <p className="mt-2 text-sub text-ink-primary">What’s next.</p>
            <p className="mt-3 max-w-3xl text-body text-ink-soft">
              Future capabilities under research and development include the <span className="text-ink-primary">Bias Detector Feed</span>, the <span className="text-ink-primary">Diversification Visualiser</span>, and <span className="text-ink-primary">Strategy Squads</span> for advanced learners. Each is grounded in the same peer-reviewed research that shaped the current product.
            </p>
          </div>
        </Reveal>
        <p className="mt-10 text-center text-caption text-ink-muted">
          StarryTrader is an education platform. We do not provide investment advice, recommend trades, or manage money on behalf of users.
        </p>
      </div>
    </section>
  );
}
