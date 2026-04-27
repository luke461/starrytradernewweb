import { Hero } from "@/components/sections/Hero";
import { PillarsTeaser } from "@/components/sections/PillarsTeaser";
import { ResearchTeaser } from "@/components/sections/ResearchTeaser";
import { PressTeaser } from "@/components/sections/PressTeaser";
import { TeamTeaser } from "@/components/sections/TeamTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { WaveDivider } from "@/components/decoration/WaveDivider";
import { LaunchAnimation } from "@/components/launch/LaunchAnimation";

/**
 * v4.1 home page. Curated overview that teases each deep-dive route.
 * Section pattern (brief Section 1):
 *   Hero (dark) → Pillars teaser (light) → Stats (dark) →
 *   Press teaser (light) → Team teaser (dark) → Final CTA (light)
 */
export default function Home() {
  return (
    <>
      <LaunchAnimation />
      <Hero />

      <WaveDivider to="pale" />
      <div className="bg-light-pale">
        <PillarsTeaser />
      </div>
      <WaveDivider to="deep" direction="up" />

      <ResearchTeaser />

      <WaveDivider to="mist" />
      <div className="bg-light-mist">
        <PressTeaser />
      </div>
      <WaveDivider to="deep" direction="up" />

      <TeamTeaser />

      <FinalCta />
    </>
  );
}
