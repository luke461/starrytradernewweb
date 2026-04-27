"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { reviews, type Review } from "@/content/home";

const toneClasses: Record<Review["tone"], string> = {
  violet: "from-starry-violet/40 to-starry-violet/0",
  blue: "from-starry-blue-light/40 to-starry-blue-light/0",
  indigo: "from-starry-violet-soft/40 to-starry-violet-soft/0",
};

const ringClasses: Record<Review["tone"], string> = {
  violet: "from-starry-violet to-starry-violet-soft",
  blue: "from-starry-blue-light to-starry-violet-soft",
  indigo: "from-starry-violet to-starry-blue-light",
};

export function Reviews() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What users are saying"
            title="From the people we built it for."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name + r.location} delay={(i % 3) * 0.08}>
              <Card interactive className={`h-full bg-gradient-to-br ${toneClasses[r.tone]} bg-starry-mid`}>
                <div className="flex items-center gap-1 text-starry-blue-light" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2 14.9 8.6 22 9.3l-5.5 4.8 1.7 7L12 17.8 5.8 21l1.7-7L2 9.3l7.1-.7L12 2Z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-primary">“{r.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={r.name} tone={r.tone} />
                  <p className="text-[13px] text-ink-soft">
                    <span className="font-medium text-ink-primary">{r.name}</span>, {r.age}, {r.location}.
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ name, tone }: { name: string; tone: Review["tone"] }) {
  return (
    <div className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${ringClasses[tone]} text-[13px] font-semibold text-white`}>
      {name.charAt(0)}
    </div>
  );
}
