import Image from "next/image";
import Link from "next/link";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-24">
      <div className="absolute inset-0 bg-hero-cosmic" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <Image
        src="/brand/starrytrader-logo-light.png"
        alt=""
        aria-hidden
        width={700}
        height={700}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[80vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.10]"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <div className="relative mx-auto mb-10 inline-block">
          <Sparkle size={56} />
          <Sparkle tone="violet" size={20} className="absolute -top-2 -left-6" />
          <Sparkle tone="violet-soft" size={14} className="absolute -bottom-3 -right-5" />
        </div>
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">404</p>
        <h1 className="mt-3 text-hero text-ink-primary">Lost in space.</h1>
        <p className="mx-auto mt-5 max-w-md text-body-lg text-ink-soft">
          This page does not exist. Yet.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" href="/" magnetic withArrow>
            Take me home
          </Button>
          <Link href="/contact" className="inline-flex items-center gap-1.5 px-2 py-3 text-[15px] text-ink-soft hover:text-ink-primary">
            Or get in touch <span aria-hidden>→</span>
          </Link>
        </div>
        <Constellation className="mx-auto mt-14 h-10 w-64 opacity-50" />
      </div>
    </section>
  );
}
