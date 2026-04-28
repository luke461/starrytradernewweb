"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { team } from "@/content/home";

export function TeamGrid() {
  const founders = team.filter((m) => m.founder);
  const rest = team.filter((m) => !m.founder);

  return (
    <section id="team" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Meet the team"
            title="Built across two cities, by people who learned this the hard way."
            subtitle="StarryTrader operates between Singapore and Chicago. The 13-hour timezone gap means somebody on our team is always thinking about how to make this better. The company started in a National Service bunk. The product launched on the App Store before its founder had finished his first semester at university."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.08} className="h-full">
              <TeamCard slug={m.slug} name={m.name} role={m.role} location={m.location} thinking={m.thinking} avatar={m.avatar} linkedin={m.socials?.linkedin} large />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 4) * 0.06} className="h-full">
              <TeamCard slug={m.slug} name={m.name} role={m.role} location={m.location} thinking={m.thinking} avatar={m.avatar} linkedin={m.socials?.linkedin} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-white/[0.06] bg-section-fade px-7 py-6 sm:flex-row">
            <p className="text-body text-ink-primary">We’re hiring. Curious?</p>
            <Link href="/careers" className="inline-flex items-center gap-1.5 text-[14px] text-starry-blue-light hover:text-starry-blue-soft">
              See open roles <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({ slug, name, role, location, thinking, avatar, linkedin, large = false }: { slug: string; name: string; role: string; location: string; thinking: string; avatar?: string; linkedin?: string; large?: boolean }) {
  return (
    <div className="relative h-full">
      <Link href={`/team/${slug}`} className="group block h-full focus-visible:outline-none">
        <Card interactive className={`h-full ${large ? "!p-8" : "!p-6"}`}>
          <div className="flex items-start gap-4">
            <Portrait name={name} avatar={avatar} large={large} />
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
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-ink-soft ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-starry-blue-light hover:ring-starry-blue-light/40"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" />
          </svg>
        </a>
      )}
    </div>
  );
}

function Portrait({ name, avatar, large }: { name: string; avatar?: string; large?: boolean }) {
  const size = large ? "h-16 w-16" : "h-12 w-12";
  const textSize = large ? "text-[22px]" : "text-[16px]";
  const cleanName = name.replace(/[\[\]]/g, "").trim();
  const pixelSize = large ? 64 : 48;

  if (avatar) {
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 ${size}`}>
        <Image src={avatar} alt={cleanName} width={pixelSize} height={pixelSize} className="h-full w-full object-cover" />
        <Sparkle size={large ? 14 : 10} className="absolute right-0.5 top-0.5" />
      </div>
    );
  }

  const initial = cleanName.charAt(0) || "★";
  return (
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light font-display font-semibold text-white ${size} ${textSize}`}>
      <span>{initial}</span>
      <Sparkle size={large ? 14 : 10} className="absolute right-0.5 top-0.5" />
    </div>
  );
}
