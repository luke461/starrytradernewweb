import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { team, type TeamMember } from "@/content/home";

/**
 * Team page layout. Two tiers, photo-forward, no SVG connector lines.
 *
 * Tier 1 — Andre Liu (CEO), solo, centred.
 * Tier 2 — two labelled subgroups in one row:
 *   • Operations & Product: Lucas (head) + Luke + Ava
 *   • Engineering: Sinclair + Yuan Feng (with the "Reports directly to
 *     the CEO" caption)
 *
 * Hierarchy is communicated by Andre's solo placement plus the subgroup
 * labels — not by SVG paths between cards. Below md, the layout falls
 * through to MobileStack which renders cards with "Reports to: …"
 * captions.
 */
export function TeamOrgChart() {
  const bySlug = Object.fromEntries(team.map((m) => [m.slug, m] as const));
  const ceo = bySlug["andre-liu"];
  const ops = bySlug["lucas"];
  const luke = bySlug["luke"];
  const ava = bySlug["ava"];
  const zen = bySlug["zen"];
  const sinclair = bySlug["sinclair"];
  const yuanFeng = bySlug["yuan-feng"];
  if (!ceo || !ops || !luke || !ava || !zen || !sinclair || !yuanFeng) return null;

  return (
    <section className="relative py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <DesktopAndTablet ceo={ceo} ops={ops} luke={luke} ava={ava} zen={zen} sinclair={sinclair} yuanFeng={yuanFeng} />
        <MobileStack people={[ceo, ops, luke, ava, zen, sinclair, yuanFeng]} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop + tablet (md+) — banded sections per COO wireframe          */
/* ------------------------------------------------------------------ */

type ChartProps = {
  ceo: TeamMember;
  ops: TeamMember;
  luke: TeamMember;
  ava: TeamMember;
  zen: TeamMember;
  sinclair: TeamMember;
  yuanFeng: TeamMember;
};

function DesktopAndTablet({ ceo, ops, luke, ava, zen, sinclair, yuanFeng }: ChartProps) {
  return (
    <div className="hidden space-y-6 md:block">
      {/* Tier 1 — CEO solo (Emmanuel hidden) */}
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <OrgCard member={ceo} tier="ceo" layout="horizontal" />
        </Reveal>
      </div>

      {/* Operations & Product band — Lucas alone inside, framed by the band */}
      <SectionBand label="Operations & Product">
        <div className="mx-auto max-w-2xl">
          <Reveal delay={0.05}>
            <OrgCard member={ops} tier="head" layout="horizontal" />
          </Reveal>
        </div>
      </SectionBand>

      {/* Tier 3 — Luke + Ava + Zen as compact cards, side-by-side at lg+,
          stacked on tablet/mobile. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Reveal delay={0.08}>
          <OrgCard member={luke} tier="leaf" layout="compact" />
        </Reveal>
        <Reveal delay={0.11}>
          <OrgCard member={ava} tier="leaf" layout="compact" />
        </Reveal>
        <Reveal delay={0.14}>
          <OrgCard member={zen} tier="leaf" layout="compact" />
        </Reveal>
      </div>

      {/* Engineering band — explicitly separate; caption clarifies the reporting line */}
      <SectionBand label="Our Engineers" caption="Reports directly to the CEO.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <OrgCard member={sinclair} tier="leaf" layout="compact" />
          </Reveal>
          <Reveal delay={0.08}>
            <OrgCard member={yuanFeng} tier="leaf" layout="compact" />
          </Reveal>
        </div>
      </SectionBand>
    </div>
  );
}

function SectionBand({ label, caption, children }: { label: string; caption?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-starry-violet-soft/15 bg-starry-violet-soft/[0.04] px-6 py-7 md:px-10 md:py-9">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-starry-blue-light">{label}</p>
      {caption && (
        <p className="mt-2 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">{caption}</p>
      )}
      <div className="mt-7">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile (<md) — vertical list with "Reports to: …" captions          */
/* ------------------------------------------------------------------ */

function MobileStack({ people }: { people: TeamMember[] }) {
  const bySlug = Object.fromEntries(people.map((p) => [p.slug, p] as const));
  return (
    <div className="block space-y-6 md:hidden">
      {people.map((m) => {
        const reportsToName = m.reportsTo ? bySlug[m.reportsTo]?.name : null;
        return (
          <div key={m.slug}>
            <OrgCard member={m} tier="leaf" />
            {reportsToName && (
              <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                Reports to: {reportsToName}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Org card                                                            */
/* ------------------------------------------------------------------ */

function OrgCard({
  member,
  tier,
  layout = "vertical",
}: {
  member: TeamMember;
  tier: "ceo" | "head" | "leaf";
  /** "horizontal" — photo on the left, text on the right. Used for heads
   *  (Andre, Lucas) so their bios get full breathing room.
   *  "compact" — smaller photo + tighter typography so 3 cards fit in a
   *  row on desktop. Bio still shown.
   *  "vertical" — photo on top, text below. Used by the mobile fallback. */
  layout?: "vertical" | "horizontal" | "compact";
}) {
  // Hide the summary block while it's still a TODO_BIO placeholder; data
  // stays in home.ts so it's clear what needs filling in.
  const showSummary = member.summary && !member.summary.startsWith("TODO_BIO");

  if (layout === "compact") {
    return (
      <Card interactive className="h-full !p-5">
        <div className="flex h-full gap-4">
          <Portrait name={member.name} avatar={member.avatar} width={100} height={125} />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-display text-[16px] font-semibold leading-tight text-ink-primary">{member.name}</h3>
            <p className="mt-0.5 text-[12px] leading-snug text-ink-soft">{member.role}</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-blue-light" />
              {member.location}
            </p>

            {showSummary && (
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-soft">{member.summary}</p>
            )}

            {member.tags && member.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {member.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-3">
              <Link
                href={`/team/${member.slug}`}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
              >
                Read profile <span aria-hidden>→</span>
              </Link>
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-ink-soft ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-starry-blue-light hover:ring-starry-blue-light/40"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (layout === "horizontal") {
    const photoWidth = tier === "ceo" ? 160 : 140;
    const photoHeight = Math.round(photoWidth * 1.25); // 4:5 portrait crop — less aggressive than square for tall source photos
    return (
      <Card interactive className="h-full !p-6">
        <div className="flex h-full gap-5">
          <Portrait name={member.name} avatar={member.avatar} width={photoWidth} height={photoHeight} />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="font-display text-[20px] font-semibold leading-tight text-ink-primary">{member.name}</h3>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">{member.role}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-blue-light" />
              {member.location}
            </p>

            {showSummary && (
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{member.summary}</p>
            )}

            {member.tags && member.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {member.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-4">
              <Link
                href={`/team/${member.slug}`}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
              >
                Read profile <span aria-hidden>→</span>
              </Link>
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-ink-soft ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-starry-blue-light hover:ring-starry-blue-light/40"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Vertical layout (mobile)
  const photoSize = tier === "ceo" ? 240 : tier === "head" ? 220 : 200;
  return (
    <Card interactive className="!w-[300px] !p-6">
      <div className="flex flex-col items-center text-center">
        <Portrait name={member.name} avatar={member.avatar} width={photoSize} />
        <div className="mt-5 w-full">
          <h3 className="font-display text-[20px] font-semibold leading-tight text-ink-primary">{member.name}</h3>
          <p className="mt-1 text-[13px] leading-snug text-ink-soft">{member.role}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-blue-light" />
            {member.location}
          </p>
        </div>

        {showSummary && (
          <p className="mt-4 w-full text-left text-[13.5px] leading-relaxed text-ink-soft">{member.summary}</p>
        )}

        {member.tags && member.tags.length > 0 && (
          <div className="mt-4 flex w-full flex-wrap justify-start gap-1.5">
            {member.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex w-full items-center justify-between">
          <Link
            href={`/team/${member.slug}`}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
          >
            Read profile <span aria-hidden>→</span>
          </Link>
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-ink-soft ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-starry-blue-light hover:ring-starry-blue-light/40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function Portrait({
  name,
  avatar,
  width,
  height,
}: {
  name: string;
  avatar?: string;
  width: number;
  /** Defaults to width (square). Pass a larger value for a portrait crop
   *  that doesn't aggressively chop tall source photos. */
  height?: number;
}) {
  const cleanName = name.replace(/[\[\]]/g, "").trim();
  const h = height ?? width;
  const wrapperStyle = { width, height: h };

  if (avatar) {
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_18px_40px_-22px_rgba(11,16,36,0.7)]"
        style={wrapperStyle}
      >
        <Image src={avatar} alt={cleanName} width={width * 2} height={h * 2} className="h-full w-full object-cover" />
        <Sparkle size={16} className="absolute right-2 top-2" />
      </div>
    );
  }

  const initial = cleanName.charAt(0) || "★";
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light font-display font-semibold text-white shadow-[0_18px_40px_-22px_rgba(11,16,36,0.7)]"
      style={{ ...wrapperStyle, fontSize: width * 0.32 }}
    >
      <span>{initial}</span>
      <Sparkle size={16} className="absolute right-2 top-2" />
    </div>
  );
}
