import { Hero } from "@/components/sections/Hero";
import { ProblemStats } from "@/components/sections/ProblemStats";
import { Pillars } from "@/components/sections/Pillars";
import { StatsBand } from "@/components/sections/StatsBand";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { Reviews } from "@/components/sections/Reviews";
import { Partners } from "@/components/sections/Partners";
import { Awards } from "@/components/sections/Awards";
import { Press } from "@/components/sections/Press";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStats />
      <Pillars />
      <StatsBand />
      <ProductDemo />
      <Reviews />
      <Partners />
      <Awards />
      <Press />
      <TeamGrid />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
