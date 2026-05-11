import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Sparkle } from "@/components/decoration/Sparkle";
import { TooManyWords, NsBunkToNus } from "@/components/sections/TooManyWords";
import { team } from "@/content/home";
import { getTeamBio } from "@/content/team-bios";
import { blogPosts } from "@/content/blog-posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return { title: "Team member not found" };
  return { title: `${member.name}, ${member.role}`, description: member.thinking ?? `${member.name}, ${member.role} at StarryTrader.` };
}

export default async function TeamMemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  const bio = getTeamBio(slug);
  const authoredPosts = blogPosts.filter((p) => p.authorSlug === slug);

  return (
    <article className="relative">
      <header className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Link href="/team" className="inline-flex items-center gap-1.5 text-caption text-ink-soft hover:text-ink-primary">
            <span aria-hidden>←</span> Back to the team
          </Link>

          <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Portrait name={member.name} avatar={member.avatar} />
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">{member.role}</p>
              <h1 className="mt-3 text-section text-ink-primary">{member.name}</h1>
              <p className="mt-3 inline-flex items-center gap-2 text-body text-ink-soft">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-starry-blue-light" />
                {member.location}
              </p>
              {member.thinking && (
                <p className="mt-5 max-w-xl italic text-body-lg text-ink-soft">“{member.thinking}”</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {slug === "andre-liu" && (
        <section className="relative pb-12">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <TooManyWords />
          </div>
        </section>
      )}

      <section className="relative pb-24">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 px-5 md:grid-cols-[1.4fr_1fr] md:px-8">
          <div>
            <h2 className="mb-5 font-display text-[24px] font-semibold text-ink-primary">Background</h2>
            <div className="prose">
              {bio.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {slug === "andre-liu" && <NsBunkToNus />}
          </div>

          <aside className="space-y-6">
            {bio.responsibilities.length > 0 && (
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Responsibilities</p>
                <ul className="mt-4 space-y-3">
                  {bio.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-[15px] text-ink-soft">
                      <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-starry-blue-light" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <Card>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">Contact</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {member.socials?.email && (
                  <li><a href={`mailto:${member.socials.email}`} className="text-ink-soft hover:text-ink-primary">{member.socials.email}</a></li>
                )}
                {member.socials?.linkedin && (
                  <li><a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink-primary">LinkedIn ↗</a></li>
                )}
                {member.socials?.x && (
                  <li><a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink-primary">X (Twitter) ↗</a></li>
                )}
                {!member.socials && <li className="text-ink-muted">Contact via team@starrytrader.com</li>}
              </ul>
            </Card>

            {bio.links && bio.links.length > 0 && (
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{bio.linksLabel ?? "Press and links"}</p>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {bio.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink-primary">
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>
        </div>

        {authoredPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl px-5 md:px-8">
            <h2 className="mb-6 font-display text-[24px] font-semibold text-ink-primary">Recent posts</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {authoredPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <Card interactive className="h-full">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{p.category}</p>
                    <h3 className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink-primary">{p.title}</h3>
                    <p className="mt-3 text-[14px] text-ink-soft">{p.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}

function Portrait({ name, avatar }: { name: string; avatar?: string }) {
  const cleanName = name.replace(/[\[\]]/g, "").trim();

  if (avatar) {
    return (
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_20px_60px_-20px_rgba(107,91,255,0.6)]">
        <Image src={avatar} alt={cleanName} width={128} height={128} className="h-full w-full object-cover" />
        <Sparkle size={20} className="absolute right-2 top-2" />
      </div>
    );
  }

  const initial = cleanName.charAt(0) || "★";
  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-starry-violet via-starry-violet-soft to-starry-blue-light text-[42px] font-display font-semibold text-white shadow-[0_20px_60px_-20px_rgba(107,91,255,0.6)]">
      <span>{initial}</span>
      <Sparkle size={20} className="absolute right-2 top-2" />
    </div>
  );
}
