"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { blogPosts, type BlogCategory } from "@/content/blog-posts";

const categories = ["All", "Beginner", "Bias", "Market Cycles", "Community", "Behind StarryTrader"] as const;
type Filter = typeof categories[number];

const coverGradients: Record<string, string> = {
  violet: "from-starry-violet via-starry-violet-soft to-starry-blue-light",
  blue: "from-starry-blue-light via-starry-violet-soft to-starry-violet",
  indigo: "from-starry-violet-deep via-starry-violet to-starry-blue-soft",
};

export default function BlogIndexPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const sorted = useMemo(() => [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const filtered = useMemo(
    () => (filter === "All" ? sorted : sorted.filter((p) => p.category === (filter as BlogCategory))),
    [sorted, filter],
  );

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
          <FilterBar value={filter} onChange={setFilter} />

          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.32, delay: (i % 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="mx-auto mt-16 max-w-md text-center text-body text-ink-soft">
              No posts in this category yet. Check back soon, or browse another tag.
            </p>
          )}
        </div>
      </section>

      <FinalCta />
    </div>
  );
}

function FilterBar({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector<HTMLElement>(`[data-active="true"]`);
    if (!active) return;
    const r = active.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    setIndicator({ left: r.left - cr.left, width: r.width });
  }, [value]);

  return (
    <div ref={containerRef} className="relative mb-10 flex flex-wrap gap-2 overflow-x-auto pb-2">
      <motion.span
        aria-hidden
        className="absolute bottom-0 h-[2px] rounded-full bg-starry-blue-light"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />
      {categories.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            type="button"
            data-active={active}
            onClick={() => onChange(c)}
            className={`relative rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
              active ? "border-starry-blue-light bg-starry-blue-light/10 text-starry-blue-light" : "border-white/10 text-ink-soft hover:border-white/30 hover:text-ink-primary"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
