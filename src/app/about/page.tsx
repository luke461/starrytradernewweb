import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { WhyFree } from "@/components/about/WhyFree";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { AboutImpact } from "@/components/about/AboutImpact";
import { Personas } from "@/components/about/Personas";
// Temporarily hidden — uncomment to restore the about page partners section.
// import { AboutPartners } from "@/components/about/AboutPartners";
import { JoinMission } from "@/components/about/JoinMission";
import { AboutContactSection } from "@/components/about/AboutContactSection";
import { ClosingTagline } from "@/components/about/ClosingTagline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Free financial education for the next generation of investors. No fees. No upsells. No commissions. Just understanding. StarryTrader is a non-profit educational platform.",
};

export default function AboutPage() {
  return (
    <article className="relative">
      <AboutHero />
      <AboutStory />
      <WhyFree />
      <WhatWeDo />
      <AboutImpact />
      <Personas />
      {/* Temporarily hidden — uncomment <AboutPartners /> below (and the import) to restore. */}
      {/* <AboutPartners /> */}
      <JoinMission />
      <AboutContactSection />
      <ClosingTagline />
    </article>
  );
}
