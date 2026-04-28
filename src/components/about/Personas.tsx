import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { aboutPersonas } from "@/content/about";

const sparkleTones = ["blue", "violet", "violet-soft"] as const;

/**
 * Section F. Three persona cards in a horizontal row on desktop, stacked
 * on mobile. Subtle light surface cards with thin violet borders. No
 * CTAs — descriptive only.
 */
export function Personas() {
  return (
    <section className="relative bg-light-mist py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            {aboutPersonas.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-section text-balance text-ink-on-light">{aboutPersonas.title}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-body-lg text-ink-on-light-soft">{aboutPersonas.lead}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {aboutPersonas.cards.map((card, i) => (
            <Reveal key={card.title} delay={0.1 + i * 0.06}>
              <article
                className="h-full rounded-[20px] bg-white/90 p-7 backdrop-blur-sm"
                style={{ border: "1px solid rgba(155, 143, 255, 0.20)" }}
              >
                <Sparkle tone={sparkleTones[i % sparkleTones.length]} size={28} />
                <h3 className="mt-5 font-display text-[20px] font-semibold leading-snug text-ink-on-light">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-on-light-soft">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 max-w-3xl text-body-lg text-ink-on-light-soft">{aboutPersonas.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
