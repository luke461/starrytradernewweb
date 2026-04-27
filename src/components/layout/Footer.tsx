import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const cols = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#capabilities" },
      { label: "Team", href: "/#team" },
      { label: "Press", href: "/#press" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "The product",
    links: [
      { label: "What we’re building", href: "/#capabilities" },
      { label: "See the demo", href: "/#demo" },
      { label: "Research", href: site.research.pdfPath },
      { label: "App Store", href: site.appLinks.appStore, external: true },
      { label: "Google Play", href: site.appLinks.googlePlay, external: true },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get in touch", href: `mailto:${site.contact.general}` },
      { label: "Press inquiries", href: `mailto:${site.contact.press}` },
      { label: "Partnership inquiries", href: `mailto:${site.contact.partnerships}` },
      { label: "Investor relations", href: `mailto:${site.contact.investors}` },
    ],
  },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" },
  { label: "Discord", href: site.social.discord, d: "M19.6 5.5A17 17 0 0 0 15.7 4l-.2.4a14 14 0 0 0-7.1 0L8.3 4a17 17 0 0 0-3.9 1.5C2.2 9 1.6 12.3 1.9 15.6a17 17 0 0 0 5.3 2.7l.4-.6a11 11 0 0 1-1.7-.8l.4-.3a12 12 0 0 0 11.4 0l.4.3a11 11 0 0 1-1.7.8l.4.6a17 17 0 0 0 5.3-2.7c.4-3.7-.4-7-3-10.1ZM9 14a1.6 1.6 0 0 1-1.6-1.6A1.6 1.6 0 0 1 9 10.8a1.6 1.6 0 0 1 1.6 1.6A1.6 1.6 0 0 1 9 14Zm6 0a1.6 1.6 0 0 1-1.6-1.6 1.6 1.6 0 0 1 3.2 0A1.6 1.6 0 0 1 15 14Z" },
  { label: "LinkedIn", href: site.social.linkedin, d: "M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" },
  { label: "X", href: site.social.x, d: "M3 3h4.5l4.4 6 5.1-6H21l-7 8.1L21.5 21H17l-4.7-6.4L6.7 21H3l7.5-8.7Z" },
  { label: "TikTok", href: site.social.tiktok, d: "M14 3h3a5 5 0 0 0 4 5v3a8 8 0 0 1-4-1.2V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3Z" },
  { label: "YouTube", href: site.social.youtube, d: "M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5 32 32 0 0 0 1.6 12 32 32 0 0 0 2 15.5a3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1A32 32 0 0 0 22.4 12 32 32 0 0 0 22 8.5ZM10 15V9l5 3-5 3Z" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.06] bg-starry-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:px-8 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo size={48} withWordmark={false} />
          <p className="mt-5 font-display text-[20px] font-semibold tracking-tight text-ink-primary">StarryTrader</p>
          <p className="mt-1 text-caption text-ink-soft">{site.tagline}</p>
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
          <p>© {new Date().getFullYear()} StarryTraders Inc. Built across Singapore and Chicago.</p>
          <p className="md:max-w-md md:text-right">
            StarryTrader is not a registered investment advisor. Nothing on this site is investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
