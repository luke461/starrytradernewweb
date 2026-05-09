/**
 * Research index data.
 *
 * Add a new piece by appending an entry here — no code changes required.
 *
 * Authorship note: the public site does NOT currently render an individual
 * author byline. The `author` field is reserved for when we choose to
 * attribute. Until then, leave it undefined or set to "StarryTrader".
 */

export type ResearchPiece = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date (YYYY-MM-DD). Surfaced as "Published <month> <year>". */
  publishedAt: string;
  /** Estimated read time in minutes. Optional — omit for PDFs without a meaningful read time. */
  readMin?: number;
  /** PDF or article URL. Omit while the piece is still in draft. */
  href?: string;
  /** Renders as the larger hero card above the grid. Only one entry should be featured. */
  featured?: boolean;
  /** Marks an entry as TODO_RESEARCH_CONTENT — surfaced visually so it's
   *  obvious what still needs filling in. */
  isPlaceholder?: boolean;
  /** Reserved for future attribution. Not rendered on the public site. */
  author?: string;
};

export const research: ResearchPiece[] = [
  {
    slug: "gen-z-attention-engagement",
    title: "Gen Z, Attention, and Financial App Engagement",
    description:
      "Synthesises peer-reviewed research and industry data on Gen Z's attention patterns, digital engagement behaviours, and attitudes toward financial education. Findings are mapped directly to product decisions for StarryTrader.",
    category: "Gen Z & Engagement",
    publishedAt: "2026-04-01",
    readMin: 22,
    href: "/research/gen-z-attention-engagement.pdf",
    featured: true,
  },
  {
    slug: "investor-challenges-brand-identity",
    title: "Investor Challenges Across All Stages",
    description:
      "A research and brand strategy document on the challenges investors face at the beginner, intermediate, and advanced stages of their financial journey, and what those findings mean for StarryTrader's product and brand.",
    category: "Investor Research",
    publishedAt: "2026-04-01",
    readMin: 20,
    href: "/research/investor-challenges-brand-identity.pdf",
  },
];

export function formatPublished(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
