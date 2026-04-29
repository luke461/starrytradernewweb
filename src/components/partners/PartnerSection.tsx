"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { Partner } from "@/content/partners";
import { partnerAnchorId } from "@/content/partners";

type Props = {
  partner: Partner;
  index: number;
  surface: "dark" | "light";
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.08 },
  }),
};

const headings = ["WHO THEY ARE", "WHAT THEY DO", "WHY WE PARTNER", "WHAT LEARNERS GET"] as const;

export function PartnerSection({ partner, index, surface }: Props) {
  const onLight = surface === "light";
  const eyebrowColor = onLight ? "text-starry-violet-deep" : "text-starry-blue-light";
  const titleColor = onLight ? "text-ink-on-light" : "text-ink-primary";
  const bodyColor = onLight ? "text-ink-on-light-soft" : "text-ink-soft";
  const cardBg = onLight ? "bg-white" : "bg-starry-mid";
  const cardBorder = onLight ? "border-starry-violet-soft/20" : "border-white/[0.08]";
  const captionColor = onLight ? "text-starry-violet-deep" : "text-starry-blue-light";
  const ctaColor = onLight ? "text-starry-violet-deep hover:text-starry-violet" : "text-starry-blue-light hover:text-starry-blue-soft";
  const chipBg = onLight ? "bg-starry-violet-soft/15 text-ink-on-light-soft" : "bg-starry-violet-soft/20 text-ink-soft";
  const answers = [partner.whoTheyAre, partner.whatTheyDo, partner.whyWePartner, partner.whatLearnersGet];

  return (
    <section
      id={partnerAnchorId(partner.name)}
      className={`relative scroll-mt-24 ${onLight ? "bg-light-pale" : "bg-starry-deep"} py-14 md:py-20`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionReveal}
        >
          <div className="flex flex-col items-start gap-6">
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 scale-[1.6] rounded-full opacity-50 blur-[80px]"
                style={{ background: "radial-gradient(circle, rgba(107,91,255,0.16), transparent 60%)" }}
              />
              <div className={`flex h-[88px] w-[260px] items-center justify-center rounded-xl px-5 md:h-[104px] md:w-[300px] md:px-6 ${onLight ? "bg-white ring-1 ring-starry-violet-soft/25 shadow-[0_12px_28px_-16px_rgba(31,39,71,0.22)]" : "bg-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)]"}`}>
                <Image
                  src={partner.logoPath}
                  alt={partner.name}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  priority={index === 0}
                  sizes="(max-width: 768px) 240px, 280px"
                  className="h-auto w-auto max-h-[44px] max-w-[220px] object-contain md:max-h-[56px] md:max-w-[260px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${chipBg}`}>
                {partner.region}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${chipBg}`}>
                {partner.type} partner
              </span>
            </div>

            <div>
              <p className={`font-mono text-[13px] uppercase tracking-[0.22em] ${eyebrowColor}`}>
                Partner {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className={`mt-3 font-display text-[40px] font-semibold leading-tight tracking-tight md:text-[48px] ${titleColor}`}>
                {partner.name}
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {answers.map((answer, i) => (
              <motion.div
                key={headings[i]}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardReveal}
                className={`group relative overflow-hidden rounded-[20px] border ${cardBorder} ${cardBg} p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${onLight ? "hover:border-starry-violet/40 hover:shadow-[0_24px_48px_-24px_rgba(76,63,224,0.25)]" : "hover:border-white/20 hover:shadow-[0_24px_40px_-24px_rgba(11,16,36,0.9)]"}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at top, rgba(107,91,255,0.12), transparent 60%)" }}
                />
                <p className={`font-mono text-[12px] uppercase tracking-[0.22em] ${captionColor}`}>
                  {headings[i]}
                </p>
                <p className={`mt-4 text-[16px] leading-relaxed ${bodyColor}`}>
                  {answer}
                </p>
              </motion.div>
            ))}
          </div>

          {partner.url && (
            <div className="mt-10">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/cta inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors ${ctaColor}`}
              >
                Learn more about {partner.name}
                <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1">→</span>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
