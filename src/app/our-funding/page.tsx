import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";

export const metadata: Metadata = {
  title: "Our funding",
  description: "How StarryTrader is funded. Grants, university partnerships, and mission-aligned sponsorships.",
};

const sources = [
  {
    label: "Grants",
    body: "Foundation and institutional grants from organisations focused on financial literacy, education access, and youth wellbeing.",
  },
  {
    label: "University partnerships",
    body: "Working relationships with academic institutions whose research informs the platform and whose students benefit from it.",
  },
  {
    label: "Mission-aligned sponsorships",
    body: "Sponsoring organisations that share our mission and accept that StarryTrader does not promote financial products, sell user data, or take commissions.",
  },
];

const noFunding = [
  "Selling user data, ever.",
  "Commissions or revenue share from any brokerage, fund, or financial product.",
  "Paid placements, recommendations, or promotional financial content.",
  "Pay-to-play access to any part of the educational experience.",
];

export default function OurFundingPage() {
  return (
    <article className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Sparkle size={28} />
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Our funding</p>
            <h1 className="mt-3 text-hero text-balance text-ink-primary">How we are funded.</h1>
            <p className="mt-5 max-w-2xl text-body-lg text-ink-soft">
              This page summarises how StarryTrader is funded. Grants, university partnerships, and mission-aligned sponsorships sustain the platform without commercial pressure.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[24px] font-semibold text-ink-primary">Where the funding comes from</h2>
            <ul className="mt-6 space-y-5">
              {sources.map((s) => (
                <li key={s.label}>
                  <Card className="!p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{s.label}</p>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{s.body}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-[24px] font-semibold text-ink-primary">Where the funding never comes from</h2>
            <ul className="mt-6 space-y-3">
              {noFunding.map((line) => (
                <li key={line} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-starry-blue-light" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Card glow="violet" className="!p-7">
              <p className="text-body text-ink-soft">
                Detailed funding figures are published annually in our Impact Report. The first report publishes Q3 2026.{" "}
                <Link href="/about#impact" className="text-starry-blue-light underline-offset-4 hover:underline">
                  See the Impact section →
                </Link>
              </p>
            </Card>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
