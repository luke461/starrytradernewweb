"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/components/providers/UiProvider";

const links = [
  { href: "/#capabilities", label: "What we’re building" },
  { href: "/#research", label: "The research" },
  { href: "/#press", label: "Press" },
  { href: "/#team", label: "Team" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openContact, openDemo } = useUi();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "border-b border-white/[0.06] bg-starry-deep/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo size={28} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] text-ink-soft transition-colors duration-200 hover:text-ink-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => openDemo(0)}
            className="group/sec inline-flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors hover:text-ink-primary"
          >
            See the product
            <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1">→</span>
          </button>
          <Button variant="primary" size="md" onClick={openContact}>
            Get in touch
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden rounded-full p-2 text-ink-soft hover:bg-white/5 hover:text-ink-primary"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-starry-deep/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] text-ink-soft hover:bg-white/5 hover:text-ink-primary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-4">
              <button
                onClick={() => { setOpen(false); openDemo(0); }}
                className="rounded-lg px-3 py-3 text-left text-[15px] text-ink-soft hover:bg-white/5 hover:text-ink-primary"
              >
                See the product →
              </button>
              <Button variant="primary" size="md" onClick={() => { setOpen(false); openContact(); }} className="w-full">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
