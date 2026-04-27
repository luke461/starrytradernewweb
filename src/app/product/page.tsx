import type { Metadata } from "next";
import { Pillars } from "@/components/sections/Pillars";
import { Reviews } from "@/components/sections/Reviews";
import { StatsBand } from "@/components/sections/StatsBand";
import { Reveal } from "@/components/decoration/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "What we’re building",
  description: "Three pillars. One path to financial literacy. Learn, Research, Compete — built around the way Gen Z actually learns.",
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

      <Pillars />
      <StatsBand />
      <Reviews />
    </div>
  );
}
