"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { PlaneArc } from "@/components/decoration/PlaneArc";
import { team, type TeamMember } from "@/content/home";

/**
 * Home page "Meet the team" teaser. Renders every member flagged
 * `founder: true` in src/content/home.ts as a card, with a
 * "see the full team" link beneath. Each card links to that founder's
 * bio page. Layout adapts to one or two founders.
 */
export function TeamTeaser() {
  const founders = team.filter((m) => m.founder);
  if (founders.length === 0) return null;
  const isPair = founders.length >= 2;

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Meet the team"
            title="Built across two cities, by people who learned this the hard way."
            subtitle="StarryTrader operates between Singapore and Chicago. The 13-hour timezone gap means somebody on our team is always thinking about how to make this better."
          />
        </Reveal>

        <div className="my-14 sm:my-20 md:my-24">
          <PlaneArc variant="home" />
        </div>

        <div
          className={
            isPair
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
              : "mx-auto grid max-w-xl grid-cols-1 gap-6"
          }
        >
          {founders.map((member, i) => (
            <Reveal key={member.slug} delay={0.08 + i * 0.06}>
              <Link
                href={`/team/${member.slug}`}
                className="group block h-full focus-visible:outline-none"
              >
                <Card interactive glow="violet" className="h-full !p-8 md:!p-9">
                  <div className="flex items-start gap-6">
                    <Portrait member={member} />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
                        Co-founder
                      </p>
                      <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-ink-primary md:text-[26px]">
                        {member.name}
                      </h3>
                      <p className="mt-1.5 inline-flex items-center gap-2 text-[14px] text-ink-soft">
                        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-starry-blue-light" />
                        {member.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-[16px] italic leading-relaxed text-ink-soft">
                    “{member.thinking}”
                  </p>
                  <p className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-blue-light transition-transform duration-200 group-hover:translate-x-1">
                    Read {member.name.split(" ")[0]}&rsquo;s story <span aria-hidden>→</span>
                  </p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10">
            <Link
              href="/team"
              className="group/all inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
            >
              See the full team
              <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/all:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Circular portrait. Uses the avatar webp when available; falls back
 *  to the gradient-initial mark elsewhere on the site. */
function Portrait({ member }: { member: TeamMember }) {
  const initial = member.name.replace(/[\[\]]/g, "").trim().charAt(0) || "★";
  const fallback = (
    <span className="relative inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light text-[36px] font-display font-semibold text-white shadow-[0_18px_44px_-18px_rgba(107,91,255,0.6)]">
      <span>{initial}</span>
      <Sparkle size={18} className="absolute right-2 top-2" />
    </span>
  );

  if (!member.avatar) return fallback;

  return (
    <span className="relative inline-block h-24 w-24 shrink-0">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 scale-[1.4] rounded-full opacity-60 blur-xl"
        style={{ background: "rgba(107,91,255,0.35)" }}
      />
      <GracefulImage
        src={member.avatar}
        alt={member.name}
        width={192}
        height={192}
        className="h-24 w-24 rounded-full object-cover ring-1 ring-white/15 shadow-[0_18px_44px_-18px_rgba(11,16,36,0.7)]"
        fallback={fallback}
      />
      <Sparkle size={16} className="absolute -right-1 -top-1" />
    </span>
  );
}
