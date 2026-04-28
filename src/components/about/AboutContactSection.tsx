import { Reveal } from "@/components/decoration/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { aboutContact } from "@/content/about";

/**
 * Section I. About-page contact section. Reuses the shared ContactForm
 * which already supports all five inquiry types from the brief
 * (general, partnership, sponsorship, press, careers).
 */
export function AboutContactSection() {
  return (
    <section id="contact" className="relative bg-starry-deep py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
            {aboutContact.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-primary">{aboutContact.title}</h2>
          <p className="mt-6 text-body-lg text-ink-soft">{aboutContact.lead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-[24px] border border-white/[0.08] bg-starry-mid/60 p-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-caption text-ink-muted">
            {aboutContact.closingNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
