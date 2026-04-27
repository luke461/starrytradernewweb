import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Careers",
  description: "Help us build the calmest place on the internet to learn about money.",
};

const interests = [
  "Engineering (mobile, web, ML)",
  "Design (product, illustration, motion)",
  "Education and curriculum",
  "Content and editorial",
  "Community",
  "Partnerships and growth",
];

export default function CareersPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Sparkle size={28} className="mx-auto mb-6" />
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Careers</p>
          <h1 className="mt-3 text-hero text-ink-primary">We&rsquo;re hiring.</h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-soft">
            We are a small team between Singapore and Chicago, building the financial education platform we wish we had at 19. If that sounds like a problem worth your time, we want to hear from you.
          </p>
          <Constellation className="mx-auto mt-10 h-8 w-56 opacity-50" />
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Card className="!p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Open roles</p>
            <h2 className="mt-2 text-sub text-ink-primary">No formal listings yet.</h2>
            <p className="mt-4 text-body text-ink-soft">
              Specific roles open as the company grows. In the meantime, if any of the following describe you, send us a note. We&rsquo;ll respond within 48 hours.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {interests.map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-starry-deep/40 px-4 py-3 text-[14px] text-ink-soft">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-starry-blue-light" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md" href="mailto:team@starrytrader.com?subject=Joining%20StarryTrader">
                Email the team
              </Button>
              <Link href="/" className="text-[14px] text-ink-soft hover:text-ink-primary">
                ← Back to home
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
