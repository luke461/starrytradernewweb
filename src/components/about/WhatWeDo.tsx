import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { aboutWhatWeDo } from "@/content/about";

const indices = ["01", "02", "03"];

/**
 * Section D. Three pillar cards. Light surface. Uses "Practice" not
 * "Compete" per the source brief. The Product page keeps "Compete" as
 * the in-app feature name; the bridge is on the Product page itself.
 */
export function WhatWeDo() {
  return (
    <section className="relative bg-light-pale py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            {aboutWhatWeDo.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-on-light">{aboutWhatWeDo.title}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-body-lg text-ink-on-light-soft">{aboutWhatWeDo.lead}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {aboutWhatWeDo.pillars.map((p, i) => (
            <Reveal key={p.name} delay={0.1 + i * 0.06}>
              <div className="group h-full rounded-[20px] border border-starry-violet-soft/20 bg-white p-7 shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_28px_56px_-26px_rgba(76,63,224,0.25)]">
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-starry-violet-deep">
                  Pillar {indices[i]}
                </p>
                <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight text-ink-on-light">
                  {p.name}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-on-light-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-body">
            <Link href="/product" className="inline-flex items-center gap-1.5 font-medium text-starry-violet-deep hover:text-starry-violet">
              See the full product <span aria-hidden>→</span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
