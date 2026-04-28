import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkle, Constellation } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { aboutMission } from "@/content/about";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return aboutMission.roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const role = aboutMission.roles.find((r) => r.slug === slug);
  if (!role) return { title: "Role not found" };
  return { title: `${role.title} — Careers`, description: role.body };
}

export default async function CareerRolePage({ params }: { params: Params }) {
  const { slug } = await params;
  const role = aboutMission.roles.find((r) => r.slug === slug);
  if (!role) notFound();

  const subject = encodeURIComponent(`Application: ${role.title}`);
  const mailto = `mailto:${site.contact.general}?subject=${subject}`;

  return (
    <article className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-hero-cosmic opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Link href="/about#join" className="inline-flex items-center gap-1.5 text-caption text-ink-soft hover:text-ink-primary">
              <span aria-hidden>←</span> Back to open roles
            </Link>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Open role</p>
            <h1 className="mt-3 text-hero text-balance text-ink-primary">{role.title}</h1>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-starry-blue-light">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-blue-light" />
              {role.location}
            </p>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-soft">{role.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Card glow="violet" className="!p-10">
              <Sparkle size={26} />
              <h2 className="mt-5 text-sub text-ink-primary">A full job description is on the way.</h2>
              <p className="mt-4 text-body text-ink-soft">
                We&rsquo;re finalising the responsibilities, scope, and compensation details for this role. In the meantime, the best way to get a head start is to send us a note about why this work matters to you. Mission-aligned, direct, and brief beats polished cover letter every time.
              </p>
              <p className="mt-4 text-body text-ink-soft">
                We&rsquo;ll come back with the full description and next steps within 48 hours.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button variant="primary" size="md" href={mailto}>
                  Express interest
                </Button>
                <Link href="/about#join" className="text-[14px] text-ink-soft hover:text-ink-primary">
                  ← See all roles
                </Link>
              </div>
              <Constellation className="mx-auto mt-10 h-8 w-56 opacity-60" />
            </Card>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
