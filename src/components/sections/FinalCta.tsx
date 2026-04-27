"use client";

import { Button } from "@/components/ui/Button";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { useUi } from "@/components/providers/UiProvider";
import { site } from "@/lib/site";

export function FinalCta() {
  const { openContact } = useUi();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 25% 20%, rgba(107, 91, 255, 0.20), transparent 65%), radial-gradient(ellipse 50% 45% at 80% 80%, rgba(127, 200, 255, 0.18), transparent 65%), #F4F6FF",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Sparkle tone="violet" size={28} className="mx-auto mb-6" />
        <Reveal>
          <h2 className="text-hero text-ink-on-light">Want to talk?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-on-light-soft">
            If you’re an investor, a partner, a journalist, or someone who wants to help, we’d love to hear from you.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" surface="light" onClick={openContact} withArrow magnetic>
              Get in touch
            </Button>
            <Button variant="outline" size="lg" surface="light" href={site.research.pdfPath} withArrow>
              Read the research
            </Button>
          </div>
        </Reveal>
        <Constellation tone="violet" className="mx-auto mt-14 h-10 w-64 opacity-60" />
        <p className="mt-8 text-caption text-ink-on-light-soft">
          Looking for the consumer app?{" "}
          <a href={site.appLinks.appStore} target="_blank" rel="noopener noreferrer" className="font-medium text-starry-violet-deep hover:text-starry-violet">App Store</a>
          {" · "}
          <a href={site.appLinks.googlePlay} target="_blank" rel="noopener noreferrer" className="font-medium text-starry-violet-deep hover:text-starry-violet">Google Play</a>.
        </p>
      </div>
    </section>
  );
}
