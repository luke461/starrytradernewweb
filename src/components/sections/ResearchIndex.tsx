import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/decoration/Reveal";
import { Sparkle } from "@/components/decoration/Sparkle";
import { research, formatPublished, type ResearchPiece } from "@/content/research";
import { site } from "@/lib/site";

/**
 * Index of research pieces. Featured card on top, grid below. Authorship
 * is intentionally omitted — pieces publish under the StarryTrader brand
 * for now (see content/research.ts). When the research array is empty,
 * renders a "coming soon" empty state with a CTA back to the app.
 */
export function ResearchIndex() {
  if (research.length === 0) return <EmptyState />;

  const featured = research.find((r) => r.featured);
  const rest = research.filter((r) => !r.featured);

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Published research"
            title="The work behind the platform."
            subtitle="Original research and field notes on how Gen Z learns about money, why most financial education fails, and what actually moves the needle. Published under the StarryTrader brand."
          />
        </Reveal>

        {featured && (
          <Reveal delay={0.05}>
            <div className="mt-12">
              <ResearchCard piece={featured} variant="featured" />
            </div>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((piece, i) => (
              <Reveal key={piece.slug} delay={0.06 + i * 0.04}>
                <ResearchCard piece={piece} variant="grid" />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-white/[0.06] bg-section-fade px-7 py-6 sm:flex-row">
            <p className="text-body text-ink-primary">Have research to share or want to collaborate?</p>
            <a
              href="mailto:team@starrytrader.com"
              className="inline-flex items-center gap-1.5 text-[14px] text-starry-blue-light transition-colors hover:text-starry-blue-soft"
            >
              team@starrytrader.com <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <Card glow="violet" className="!p-10 text-center md:!p-12">
            <Sparkle tone="violet" size={32} className="mx-auto" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-starry-blue-light">
              Published research
            </p>
            <h2 className="mt-3 text-sub text-ink-primary">Coming soon.</h2>
            <p className="mx-auto mt-5 max-w-xl text-body text-ink-soft">
              We&rsquo;re putting together the first pieces. Check back soon. In the meantime, the app is where the work lives.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="md" href={site.appLinks.appStore} external withArrow>
                Get the app
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function ResearchCard({ piece, variant }: { piece: ResearchPiece; variant: "featured" | "grid" }) {
  const meta = (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
      <span className="rounded-full border border-starry-violet-soft/30 bg-starry-violet-soft/[0.08] px-2.5 py-1 text-starry-blue-light">
        {piece.category}
      </span>
      <span>By StarryTrader</span>
      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-ink-muted" />
      <span>Published {formatPublished(piece.publishedAt)}</span>
      {piece.readMin && (
        <>
          <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-ink-muted" />
          <span>{piece.readMin} min read</span>
        </>
      )}
    </div>
  );

  const placeholderTag = piece.isPlaceholder && (
    <p className="mt-4 inline-block rounded-md border border-dashed border-starry-violet-soft/40 bg-starry-violet-soft/[0.06] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
      TODO_RESEARCH_CONTENT — fill in before launch
    </p>
  );

  if (variant === "featured") {
    return (
      <Card glow="violet" interactive className="!p-10 md:!p-12">
        <div className="flex items-start gap-4">
          <Sparkle tone="violet" size={28} className="shrink-0" />
          <div className="min-w-0 flex-1">
            {meta}
            <h3 className="mt-5 font-display text-[28px] font-semibold leading-tight text-ink-primary md:text-[32px]">
              {piece.title}
            </h3>
            <p className="mt-4 max-w-2xl text-body text-ink-soft">{piece.description}</p>
            {placeholderTag}
            {piece.href && (
              <a
                href={piece.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
              >
                Read the piece <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card interactive className="h-full !p-7">
      <div className="flex h-full flex-col">
        {meta}
        <h3 className="mt-4 font-display text-[18px] font-semibold leading-tight text-ink-primary">
          {piece.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{piece.description}</p>
        {placeholderTag}
        <div className="mt-auto pt-5">
          {piece.href ? (
            <a
              href={piece.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-starry-blue-light transition-colors hover:text-starry-blue-soft"
            >
              Read the piece <span aria-hidden>→</span>
            </a>
          ) : (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">Coming soon</p>
          )}
        </div>
      </div>
    </Card>
  );
}
