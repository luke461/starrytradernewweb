"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { blogPreviews } from "@/content/home";

const coverGradients = [
  "from-starry-violet via-starry-violet-soft to-starry-blue-light",
  "from-starry-blue-light via-starry-violet-soft to-starry-violet",
  "from-starry-violet-deep via-starry-violet to-starry-blue-soft",
];

export function BlogPreview() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The blog"
            title="No hot takes. Just the real stuff."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPreviews.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none">
                <Card interactive className="h-full !p-0 overflow-hidden">
                  <div className={`aspect-[16/10] w-full bg-gradient-to-br ${coverGradients[i % coverGradients.length]}`} />
                  <div className="p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{post.category}</p>
                    <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-ink-primary">
                      {post.title}
                    </h3>
                    <p className="mt-5 text-caption text-ink-muted">{post.readMin} min read</p>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-[15px] text-starry-blue-light hover:text-starry-blue-soft">
            Read the blog <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
