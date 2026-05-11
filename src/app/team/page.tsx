import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { PlaneArc } from "@/components/decoration/PlaneArc";
// Temporarily hidden — uncomment to restore the brokerage partners section below.
// import { PartnerLogo } from "@/components/sections/HomePartners";
import { TeamOrgChart } from "@/components/sections/TeamOrgChart";
import { FinalCta } from "@/components/sections/FinalCta";
// Temporarily hidden — uncomment to restore the brokerage partners section below.
// import { appPartners } from "@/content/home";

export const metadata: Metadata = {
  title: "The team",
  description: "Built by people who learned this the hard way. The StarryTrader team and how we organise ourselves.",
};

export default function TeamPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-12">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="Built by people who learned this the hard way."
              subtitle="StarryTrader operates across continents and timezones. Whichever clock you check, someone on our team is thinking about the product. A non-profit, built independently and open to partners who share the mission."
            />
          </Reveal>
        </div>

        <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:mt-16 md:mt-20 md:px-8">
          <PlaneArc variant="team" />
        </div>
      </section>

      <TeamOrgChart />

      {/* Temporarily hidden — uncomment the brokerage partners section below
          (and the PartnerLogo + appPartners imports up top) to restore.
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="The people we work with"
              title="Brokerage partners."
              subtitle="StarryTrader teaches investors how markets work. Our brokerage partners give them somewhere to take that knowledge once they're ready."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 sm:gap-x-24">
              {appPartners.map((p) => (
                <li key={p.name} className="flex items-center">
                  <PartnerLogo partner={p} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      */}

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <Card glow="violet" className="!p-12">
              <div className="flex items-start gap-4">
                <Sparkle size={28} />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">How we work</p>
                  <h2 className="mt-3 text-sub text-ink-primary">Singapore and Chicago. Thirteen hours apart. Always working.</h2>
                  <p className="mt-5 text-body text-ink-soft">
                    The company started in a National Service bunk. The product launched on the App Store before its founder had finished his first semester at university. Today we operate as one team across two timezones, which means somebody is always thinking about the product. The work never stops feeling like the early days.
                  </p>
                  <p className="mt-3 text-body text-ink-soft">
                    The dual-city setup is not a logistics quirk. It is a feature. We get the design rigor and academic depth of two great research universities (NUS School of Computing and Northwestern). We get the cultural breadth of two of the most ambitious cities in the world. We get the practical advantage of a continuous build cycle.
                  </p>
                </div>
              </div>
              <Constellation className="mx-auto mt-10 h-10 w-72 opacity-60" />
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-[20px] border border-white/[0.06] bg-section-fade px-7 py-6 sm:flex-row">
              <p className="text-body text-ink-primary">Want to join the mission?</p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1.5 text-[14px] text-starry-blue-light transition-colors hover:text-starry-blue-soft focus-visible:outline-2 focus-visible:outline-starry-blue-light focus-visible:outline-offset-2"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
