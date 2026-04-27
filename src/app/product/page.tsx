import type { Metadata } from "next";
import { PillarsPinned } from "@/components/sections/PillarsPinned";
import { Reviews } from "@/components/sections/Reviews";
import { StatsBand } from "@/components/sections/StatsBand";
import { Reveal } from "@/components/decoration/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "What we’re building",
  description: "Three pillars. One path to financial literacy. Learn, Research, Compete. Built around the way Gen Z actually learns.",
};

export default function ProductPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
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
    </div>
  );
}

function RoadmapAndCompliance() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="rounded-[20px] border border-white/[0.06] bg-gradient-to-br from-starry-mid to-starry-soft p-10">
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
