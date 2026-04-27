"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneMockup } from "@/components/decoration/PhoneMockup";
import { Reveal } from "@/components/decoration/Reveal";
import { pillars, type Pillar } from "@/content/home";

export function Pillars() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What we’re building"
            title="Three pillars. One path to financial literacy."
            subtitle="Most fintech tools force learners into a single mode. StarryTrader builds three connected experiences that match how Gen Z actually learns: foundational knowledge, real-time context, and competitive practice."
          />
        </Reveal>

        <div className="mt-20 space-y-28">
          {pillars.map((p, i) => (
            <PillarBlock key={p.id} pillar={p} reverse={i % 2 === 1} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <Card className="mt-24 !bg-gradient-to-br !from-starry-mid !to-starry-soft">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Roadmap</p>
            <p className="mt-2 text-sub text-ink-primary">What’s next.</p>
            <p className="mt-3 max-w-3xl text-body text-ink-soft">
              Future capabilities under research and development include the <em className="not-italic text-ink-primary">Bias Detector Feed</em>, the <em className="not-italic text-ink-primary">Diversification Visualiser</em>, and <em className="not-italic text-ink-primary">Strategy Squads</em> for advanced learners. Each is grounded in the same peer-reviewed research that shaped the current product.
            </p>
          </Card>
        </Reveal>

        <p className="mt-10 text-center text-caption text-ink-muted">
          StarryTrader is an education platform. We do not provide investment advice, recommend trades, or manage money on behalf of users.
        </p>
      </div>
    </section>
  );
}

function PillarBlock({ pillar, reverse }: { pillar: Pillar; reverse: boolean }) {
  return (
    <Reveal>
      <div className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.85fr] ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Pillar {pillar.index}</p>
          <h3 className="mt-3 text-section text-balance text-ink-primary">{pillar.title}</h3>

          <Card className="mt-7 !p-6 !bg-starry-deep/60" glow="violet">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Research insight</p>
            <p className="mt-2 text-body italic text-ink-soft">“{pillar.insight.quote}”</p>
            <p className="mt-2 font-mono text-caption text-ink-muted">{pillar.insight.source}</p>
          </Card>

          <p className="mt-7 text-sub text-ink-primary">{pillar.headline}</p>

          <ul className="mt-6 space-y-4">
            {pillar.capabilities.map((c) => (
              <li key={c.name} className="flex gap-4">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-starry-blue-light" />
                <div>
                  <p className="text-[16px] font-semibold text-ink-primary">{c.name}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center">
          <PhoneMockup ariaLabel={`${pillar.visualLabel} screen`}>
            <PillarScreen pillarId={pillar.id} />
          </PhoneMockup>
        </div>
      </div>
    </Reveal>
  );
}

function PillarScreen({ pillarId }: { pillarId: string }) {
  if (pillarId === "learn") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Learning Path</p>
        <p className="mt-1 text-[11px] text-ink-soft">Foundations → Markets → Strategy</p>
        <div className="mt-3 space-y-2">
          {[
            { n: 1, t: "What a stock actually is", done: true },
            { n: 2, t: "Why prices move", done: true },
            { n: 3, t: "Volatility, demystified", done: false, current: true },
            { n: 4, t: "Reading a news headline", done: false },
            { n: 5, t: "Diversification basics", done: false },
          ].map((s) => (
            <div key={s.n} className={`surface-card !rounded-xl !p-3 flex items-center gap-3 ${s.current ? "!border-starry-blue-light/60" : ""}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${s.done ? "bg-success-soft/20 text-success-soft" : s.current ? "bg-starry-blue-light/20 text-starry-blue-light" : "bg-white/5 text-ink-muted"}`}>
                {s.done ? "✓" : s.n}
              </span>
              <p className="text-[12px] text-ink-primary">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto surface-card !rounded-xl !p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Daily Jargon · Day 12</p>
          <p className="mt-1 text-[12px] text-ink-primary">Beta</p>
          <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">A measure of how a stock moves relative to the market. Higher beta = more volatile.</p>
        </div>
      </div>
    );
  }
  if (pillarId === "research") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Stock Stories</p>
        <p className="mt-1 text-[11px] text-ink-soft">Swipe through the market</p>
        <div className="surface-card mt-3 !rounded-2xl !p-4 flex-1 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">NVDA · Today</p>
          <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-ink-primary">
            Why every chip stock is moving in lockstep right now.
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
            One macro story is driving sentiment across the entire sector. We unpack it in plain English.
          </p>
          <div className="mt-auto flex gap-2">
            <span className="rounded-full bg-success-soft/15 px-2 py-0.5 text-[10px] text-success-soft">Positive 61%</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-soft">Neutral 28%</span>
            <span className="rounded-full bg-starry-violet-soft/15 px-2 py-0.5 text-[10px] text-starry-violet-soft">Negative 11%</span>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-[10px] text-ink-muted">
          <span>1 / 12</span>
          <div className="ml-auto flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={`h-0.5 w-3 rounded-full ${i === 0 ? "bg-starry-blue-light" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  // compete
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
      <p className="font-display text-[14px] font-semibold text-ink-primary">LeetTrade</p>
      <p className="mt-1 text-[11px] text-ink-soft">Scenario 07 of 16</p>
      <div className="surface-card mt-3 !rounded-2xl !p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Scenario</p>
        <p className="mt-1 text-[12.5px] text-ink-primary leading-relaxed">
          A retailer beats earnings but lowers next-quarter guidance. Stock drops 12% pre-market. What do you do?
        </p>
        <div className="mt-3 space-y-2">
          {["Buy the dip", "Hold and re-evaluate at close", "Sell into weakness"].map((opt, i) => (
            <button key={opt} type="button" className={`w-full rounded-lg border px-3 py-2 text-left text-[11.5px] text-ink-soft ${i === 1 ? "border-starry-blue-light/60 text-starry-blue-light" : "border-white/10"}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 surface-card !rounded-xl !p-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Global leaderboard</p>
        <ol className="mt-2 space-y-1 text-[11px] text-ink-soft">
          <li className="flex justify-between"><span>1. wei.h</span><span className="font-mono text-starry-blue-light">98.2%</span></li>
          <li className="flex justify-between"><span>2. priya.k</span><span className="font-mono text-ink-soft">96.4%</span></li>
          <li className="flex justify-between"><span>3. you</span><span className="font-mono text-ink-soft">94.1%</span></li>
        </ol>
      </div>
    </div>
  );
}
