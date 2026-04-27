import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "No hot takes. Just the real stuff. Essays on bias, beginner mistakes, and the way markets actually move.",
};

const categories = ["All", "Beginner", "Bias", "Market Cycles", "Community", "Behind StarryTrader"] as const;

const coverGradients: Record<string, string> = {
  violet: "from-starry-violet via-starry-violet-soft to-starry-blue-light",
  blue: "from-starry-blue-light via-starry-violet-soft to-starry-violet",
  indigo: "from-starry-violet-deep via-starry-violet to-starry-blue-soft",
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The blog"
              title="No hot takes. Just the real stuff."
              subtitle="Essays on bias, beginner mistakes, market cycles, and what we are learning while building StarryTrader."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
                  c === "All"
                    ? "border-starry-blue-light bg-starry-blue-light/10 text-starry-blue-light"
                    : "border-white/10 text-ink-soft hover:border-white/30 hover:text-ink-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none">
                  <Card interactive className="h-full !p-0 overflow-hidden">
                    <div className={`aspect-[16/10] w-full bg-gradient-to-br ${coverGradients[post.cover]}`} />
                    <div className="p-7">
                      <div className="flex items-center gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{post.category}</p>
                        <span className="text-caption text-ink-muted">·</span>
                        <p className="text-caption text-ink-muted">{formatDate(post.date)}</p>
                      </div>
                      <h2 className="mt-3 font-display text-[20px] font-semibold leading-snug text-ink-primary">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[14px] text-ink-soft">{post.excerpt}</p>
                      <p className="mt-5 flex items-center justify-between text-caption text-ink-muted">
                        <span>{post.author}</span>
                        <span>{post.readMin} min read</span>
                      </p>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
