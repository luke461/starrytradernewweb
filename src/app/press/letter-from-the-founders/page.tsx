import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "A letter from the founders",
  description:
    "We started StarryTrader as a side project. We're now committing it to the public good. Here's why.",
};

export default function LetterFromFoundersPage() {
  return (
    <article className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Link href="/press" className="inline-flex items-center gap-1.5 text-caption text-ink-soft hover:text-ink-primary">
              <span aria-hidden>←</span> Back to the press
            </Link>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">
              Editorial · From the founders
            </p>
            <h1 className="mt-3 text-hero text-balance text-ink-primary">
              A letter from the founders.
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-soft italic">
              “We started StarryTrader as a side project. We&rsquo;re now committing it to the public good. Here&rsquo;s why.”
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Card glow="violet" className="!p-10 text-center">
              <Sparkle tone="violet" size={32} className="mx-auto" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">
                Coming soon
              </p>
              <h2 className="mt-3 text-sub text-ink-primary">
                The full letter is being written.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body text-ink-soft">
                Andre is putting words to the decision: why StarryTrader made the pivot, what that changes, and what it doesn&rsquo;t. Follow the announcement on Instagram, or come back here in a few weeks.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" size="md" href={site.social.instagram} external>
                  Follow on Instagram
                </Button>
                <Link href="/about" className="text-[14px] text-ink-soft hover:text-ink-primary">
                  Read the About page →
                </Link>
              </div>
              <Constellation className="mx-auto mt-10 h-8 w-56 opacity-50" />
            </Card>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
