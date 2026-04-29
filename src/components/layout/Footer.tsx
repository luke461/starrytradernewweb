import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const cols = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Impact Report", href: "/about#impact" },
      { label: "Team", href: "/team" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/about#join" },
    ],
  },
  {
    heading: "The product",
    links: [
      { label: "What we’re building", href: "/product" },
      { label: "Research", href: site.research.pdfPath },
      { label: "App Store", href: site.appLinks.appStore, external: true },
      { label: "Google Play", href: site.appLinks.googlePlay, external: true },
      { label: "Patch notes", href: "/patch-notes" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get in touch", href: `mailto:${site.contact.general}` },
      { label: "Press inquiries", href: `mailto:${site.contact.press}` },
      { label: "Partnership inquiries", href: `mailto:${site.contact.partnerships}` },
      { label: "Sponsorship inquiries", href: `mailto:${site.contact.sponsorship}` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Funding", href: "/funding" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" },
  { label: "LinkedIn", href: site.social.linkedin, d: "M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.06] bg-starry-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:px-8 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo size={48} withWordmark={false} />
          <p className="mt-5 font-display text-[20px] font-semibold tracking-tight text-ink-primary">StarryTrader</p>
          <p className="mt-1 text-caption text-ink-soft">
            {site.taglineShort} <span className="text-starry-blue-light">{site.taglineAccent}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-soft transition-colors hover:border-starry-blue-light hover:text-starry-blue-light"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.appLinks.appStore} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 px-3 py-2 text-caption text-ink-soft transition-colors hover:border-white/30 hover:text-ink-primary">
              App Store
            </a>
            <a href={site.appLinks.googlePlay} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 px-3 py-2 text-caption text-ink-soft transition-colors hover:border-white/30 hover:text-ink-primary">
              Google Play
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.heading}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">{col.heading}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => {
                const external = "external" in l && l.external;
                return (
                  <li key={l.label}>
                    {external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-ink-soft transition-colors hover:text-ink-primary">
                        {l.label}
                      </a>
                    ) : l.href.startsWith("mailto") || l.href.startsWith("/") ? (
                      l.href.startsWith("mailto") ? (
                        <a href={l.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink-primary">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink-primary">
                          {l.label}
                        </Link>
                      )
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-caption text-ink-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} StarryTrader.</span>
            <span aria-hidden>·</span>
            <span>Built across Singapore and Chicago.</span>
            <span aria-hidden>·</span>
            <Link href="/patch-notes" className="transition-colors hover:text-starry-blue-light hover:underline underline-offset-4">
              Patch notes
            </Link>
          </p>
          <p className="md:max-w-md md:text-right">
            StarryTrader is not a registered investment advisor. Nothing on this site is investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
