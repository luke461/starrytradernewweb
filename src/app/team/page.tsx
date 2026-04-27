import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { Partners } from "@/components/sections/Partners";
import { team } from "@/content/home";

export const metadata: Metadata = {
  title: "The team",
  description: "Built across two cities, by people who learned this the hard way. Singapore and Chicago.",
};

export default function TeamPage() {
  const founders = team.filter((m) => m.founder);
  const rest = team.filter((m) => !m.founder);

  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="Built across two cities, by people who learned this the hard way."
              subtitle="StarryTrader operates between Singapore and Chicago. The 13-hour timezone gap means somebody on our team is always thinking about how to make this better."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {founders.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.08}>
                <TeamCard slug={m.slug} name={m.name} role={m.role} location={m.location} thinking={m.thinking} large />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 4) * 0.06}>
                <TeamCard slug={m.slug} name={m.name} role={m.role} location={m.location} thinking={m.thinking} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Partners />

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
              <p className="text-body text-ink-primary">We’re hiring. Curious?</p>
              <Link href="/careers" className="inline-flex items-center gap-1.5 text-[14px] text-starry-blue-light hover:text-starry-blue-soft">
                See open roles <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function TeamCard({ slug, name, role, location, thinking, large = false }: { slug: string; name: string; role: string; location: string; thinking: string; large?: boolean }) {
  return (
    <Link href={`/team/${slug}`} className="group block focus-visible:outline-none">
      <Card interactive className={`h-full ${large ? "!p-8" : "!p-6"}`}>
        <div className="flex items-start gap-4">
          <Portrait name={name} large={large} />
          <div className="flex-1">
            <p className={large ? "font-display text-[22px] font-semibold text-ink-primary" : "font-display text-[17px] font-semibold text-ink-primary"}>{name}</p>
            <p className="mt-0.5 text-[13px] text-ink-soft">{role}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-blue-light" /> {location}
            </p>
          </div>
        </div>
        <p className={`mt-5 italic ${large ? "text-[16px]" : "text-[14px]"} leading-relaxed text-ink-soft`}>“{thinking}”</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-starry-blue-light opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Read profile <span aria-hidden>→</span>
        </p>
      </Card>
    </Link>
  );
}

function Portrait({ name, large }: { name: string; large?: boolean }) {
  const initial = name.replace(/[\[\]]/g, "").trim().charAt(0) || "★";
  const size = large ? "h-16 w-16 text-[22px]" : "h-12 w-12 text-[16px]";
  return (
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light font-display font-semibold text-white ${size}`}>
      <span>{initial}</span>
      <Sparkle size={large ? 14 : 10} className="absolute right-0.5 top-0.5" />
    </div>
  );
}
