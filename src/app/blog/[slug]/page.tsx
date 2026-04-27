import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/blog-posts";

const coverGradients: Record<string, string> = {
  violet: "from-starry-violet via-starry-violet-soft to-starry-blue-light",
  blue: "from-starry-blue-light via-starry-violet-soft to-starry-violet",
  indigo: "from-starry-violet-deep via-starry-violet to-starry-blue-soft",
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", authors: [post.author] },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  return (
    <article className="relative">
      <header className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-hero-cosmic opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-caption text-ink-soft hover:text-ink-primary">
            <span aria-hidden>←</span> Back to the blog
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-starry-blue-light">{post.category}</p>
          <h1 className="mt-4 text-section text-balance text-ink-primary">{post.title}</h1>
          <p className="mt-5 text-body-lg text-ink-soft">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 text-caption text-ink-muted">
            <Link href={`/team/${post.authorSlug}`} className="text-ink-soft hover:text-ink-primary">{post.author}</Link>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readMin} min read</span>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className={`mb-12 aspect-[16/8] w-full overflow-hidden rounded-[20px] bg-gradient-to-br ${coverGradients[post.cover]} flex items-end p-6`}>
            <Sparkle size={28} />
          </div>
          <div className="prose">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="relative mt-24 pb-32">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <p className="mb-8 font-mono text-[12px] uppercase tracking-[0.2em] text-starry-blue-light">Keep reading</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="group block">
                    <Card interactive className="h-full">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-starry-blue-light">{r.category}</p>
                      <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-ink-primary">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-[14px] text-ink-soft">{r.excerpt}</p>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
