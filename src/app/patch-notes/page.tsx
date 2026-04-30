import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/decoration/Reveal";
import { PatchTimeline } from "@/components/patch-notes/PatchTimeline";

export const metadata: Metadata = {
  title: "Patch Notes",
  description:
    "The chronological build log of StarryTrader, from March 2024 to today. Eighteen patches and counting.",
};

export default function PatchNotesPage() {
  return (
    <article className="relative bg-starry-deep">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />

        <Image
          src="/brand/starrytrader-logo-light.png"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-auto w-[32vw] max-w-[420px] -translate-y-1/2 select-none opacity-[0.14] md:block lg:right-[-6%]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, #000 45%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 45%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-starry-blue-light">
              The build log
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-hero text-balance text-ink-primary">
              Eighteen patches. One star at a time.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-soft">
              We&rsquo;ve been building StarryTrader in public since March 2024. Here&rsquo;s every step that got us to today, in the order it happened.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ScrollPrompt />
          </Reveal>
        </div>
      </section>

      <PatchTimeline />
    </article>
  );
}

function ScrollPrompt() {
  return (
    <div className="mt-14 flex justify-center">
      <span
        aria-hidden
        className="inline-flex animate-[patchnotes-bob_1.5s_ease-in-out_infinite] flex-col items-center text-starry-blue-light motion-reduce:animate-none"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
      <style>{`
        @keyframes patchnotes-bob {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
