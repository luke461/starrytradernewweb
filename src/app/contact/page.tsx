import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Partner, journalist, learner, or just curious. Reach the StarryTrader team.",
};

const channels = [
  { label: "General", email: site.contact.general, who: "Anyone with a question that doesn’t fit below." },
  { label: "Partnerships", email: site.contact.partnerships, who: "Universities, foundations, fintechs, AI providers, distribution channels." },
  { label: "Sponsorship", email: site.contact.sponsorship, who: "Mission-aligned organisations supporting our educational mission." },
  { label: "Press", email: site.contact.press, who: "Journalists, newsletter editors, podcast producers." },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Sparkle size={28} className="mx-auto mb-6" />
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Get in touch</p>
            <h1 className="mt-3 text-hero text-ink-primary">Let’s talk.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-soft">
              Tell us a bit about why you’re reaching out. We respond within 48 hours.
            </p>
            <Constellation className="mx-auto mt-10 h-8 w-56 opacity-60" />
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 md:grid-cols-[1.3fr_1fr] md:px-8">
          <Reveal>
            <Card className="!p-10">
              <ContactForm />
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {channels.map((c) => (
                <Card key={c.label} interactive>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{c.label}</p>
                  <p className="mt-2 text-[15px] text-ink-soft">{c.who}</p>
                  <a href={`mailto:${c.email}`} className="mt-3 inline-block text-[15px] font-medium text-ink-primary hover:text-starry-blue-light">
                    {c.email}
                  </a>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
