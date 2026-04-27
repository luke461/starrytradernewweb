"use client";

import { Button } from "@/components/ui/Button";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { useUi } from "@/components/providers/UiProvider";
import { site } from "@/lib/site";

export function FinalCta() {
  const { openContact, openDemo } = useUi();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Sparkle size={28} className="mx-auto mb-6" />
        <Reveal>
          <h2 className="text-hero text-ink-primary">Want to talk?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-soft">
            If you’re an investor, a partner, a journalist, or someone who wants to help, we’d love to hear from you.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" onClick={openContact} withArrow>
              Get in touch
            </Button>
            <Button variant="ghost" size="lg" href={site.research.pdfPath} withArrow>
              Read the research
            </Button>
            <button
              onClick={() => openDemo(0)}
              className="group inline-flex items-center gap-1.5 px-2 text-[15px] text-ink-soft transition-colors hover:text-ink-primary"
            >
              See the product
              <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
            </button>
          </div>
        </Reveal>
        <Constellation className="mx-auto mt-14 h-10 w-64 opacity-50" />
        <p className="mt-8 text-caption text-ink-muted">
          Looking for the consumer app?{" "}
          <a href={site.appLinks.appStore} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink-primary">App Store</a>
          {" · "}
          <a href={site.appLinks.googlePlay} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink-primary">Google Play</a>.
        </p>
      </div>
    </section>
  );
}
