import { team } from "./home";

export type TeamBio = {
  slug: string;
  paragraphs: string[];
  responsibilities: string[];
  links?: { label: string; href: string }[];
  /** Header for the links sidebar card. Defaults to "Press and links".
   *  Override per-member when "Press" doesn't fit (e.g. "Research"). */
  linksLabel?: string;
};

const placeholder: TeamBio = {
  slug: "_placeholder",
  paragraphs: [
    "Bio coming soon. This team member is in the process of joining StarryTrader’s public roster.",
  ],
  responsibilities: [],
};

/**
 * Long-form bio data for the `/team/[slug]` profile pages. Use this when
 * a member needs richer treatment than the org-chart card supports —
 * multiple paragraphs, an explicit responsibilities list, or press links.
 *
 * Members not listed here fall back to the org-chart `summary` field
 * on their TeamMember entry (src/content/home.ts), so the team-page card
 * and the profile page stay in sync without duplicating copy.
 */
export const teamBios: Record<string, TeamBio> = {
  "andre-liu": {
    slug: "andre-liu",
    paragraphs: [
      "Andre Liu is the co-founder of StarryTrader, a financial platform with a growing user base that helps investors understand market news more efficiently. He focuses on product direction, user growth, and partnerships, working with financial firms to expand the platform’s reach. Alongside building StarryTrader, he studies Computer Science at the National University of Singapore.",
    ],
    responsibilities: [
      "Sets company vision, strategy, and the long-term roadmap for StarryTrader.",
      "Leads overall product direction and feature prioritisation across beginner, intermediate, and advanced user tiers.",
      "Drives investor relations, fundraising conversations, and high-level strategic partnerships.",
      "Maintains educational and non-advisory boundaries within the app (regulatory compliance).",
      "Leads hiring decisions and team structure as the company scales.",
      "Final decision-maker on company strategy and direction.",
    ],
    links: [
      { label: "NUS Computing News feature", href: "https://www.comp.nus.edu.sg/news/from-ns-bunk-to-nus-how-andre-liu-kept-building/" },
      { label: "The Daily Northwestern feature", href: "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/" },
    ],
  },
  // Lucas: paragraphs + responsibilities synthesised from home.ts (single
  // source of truth). This entry exists only to attach his research links.
  "lucas": {
    slug: "lucas",
    paragraphs: [],
    responsibilities: [],
    linksLabel: "Research",
    links: [
      { label: "Gen Z, Attention, and Financial App Engagement", href: "/research/gen-z-attention-engagement.pdf" },
      { label: "Investor Challenges Across All Stages", href: "/research/investor-challenges-brand-identity.pdf" },
    ],
  },
};

export function getTeamBio(slug: string): TeamBio {
  const explicit = teamBios[slug];
  const member = team.find((m) => m.slug === slug);

  // Synthesised fallbacks pulled from the home.ts TeamMember entry.
  const fallbackParagraphs =
    member?.summary && !member.summary.startsWith("TODO_BIO") ? [member.summary] : [];
  const fallbackResponsibilities = member?.responsibilities ?? [];

  // Merge: an explicit entry overrides what it declares, the rest falls
  // back to home.ts. This lets entries supply *just* links (Lucas) or
  // *just* a richer multi-paragraph treatment (Andre) without forcing
  // every entry to redeclare paragraphs and responsibilities.
  if (explicit) {
    return {
      slug: explicit.slug,
      paragraphs: explicit.paragraphs.length > 0 ? explicit.paragraphs : fallbackParagraphs,
      responsibilities:
        explicit.responsibilities.length > 0 ? explicit.responsibilities : fallbackResponsibilities,
      links: explicit.links,
      linksLabel: explicit.linksLabel,
    };
  }

  if (fallbackParagraphs.length > 0) {
    return {
      slug,
      paragraphs: fallbackParagraphs,
      responsibilities: fallbackResponsibilities,
    };
  }

  // Nothing usable — show the placeholder.
  return { ...placeholder, slug };
}
