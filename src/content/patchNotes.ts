/**
 * Chronological build log of StarryTrader. Each patch is rendered as a
 * star on the constellation timeline at /patch-notes.
 *
 * Title + description are surfaced from the founders' source doc verbatim
 * per the v4.4 brief — do not paraphrase here.
 *
 * Era labels are soft chronological estimates. Refine when the founders
 * have exact dates.
 */

export type PatchEntry = {
  /** Display number (matches index + 1 padded to 3 digits, used as "PATCH 001"). */
  number: string;
  /** Soft chronological label: "March 2024", "Q3 2024", etc. */
  era: string;
  /** Short, declarative — usually ends with a period. */
  title: string;
  /** One or two plain-English sentences. Leave empty if the source doc has no separate description. */
  description?: string;
  /** Path under /public to the patch screenshot (webp). */
  image: string;
  /** Alt text for accessibility. */
  alt: string;
};

export const patchNotes: PatchEntry[] = [
  {
    number: "001",
    era: "March 2024",
    title: "First version of the Home Page.",
    description: "Only news article summaries available, and hourly updates.",
    image: "/images/patch-notes/patch-01-home-page-v1.webp",
    alt: "Screenshot of the first home page, with news article summaries.",
  },
  {
    number: "002",
    era: "April 2024",
    title: "First version of the Saved feature added.",
    description: "Not even any real data, only placeholder data added.",
    image: "/images/patch-notes/patch-02-saved-feature.webp",
    alt: "Screenshot of the first Saved feature with placeholder content.",
  },
  {
    number: "003",
    era: "May 2024",
    title: "Second version of home page and briefly added crypto news.",
    image: "/images/patch-notes/patch-03-home-v2-crypto.webp",
    alt: "Screenshot of home page v2 with crypto news.",
  },
  {
    number: "004",
    era: "June 2024",
    title: "One of the first versions of the news article screen.",
    image: "/images/patch-notes/patch-04-news-article-v1.webp",
    alt: "Screenshot of an early news article screen.",
  },
  {
    number: "005",
    era: "July 2024",
    title: "Expanded watchlist to save interested stocks and news topics.",
    image: "/images/patch-notes/patch-05-expanded-watchlist.webp",
    alt: "Screenshot of the expanded watchlist with stocks and news topics.",
  },
  {
    number: "006",
    era: "August 2024",
    title: "First version of the stock dashboard.",
    image: "/images/patch-notes/patch-06-stock-dashboard.webp",
    alt: "Screenshot of the first stock dashboard.",
  },
  {
    number: "007",
    era: "September 2024",
    title: "Added community polls and financial data.",
    image: "/images/patch-notes/patch-07-community-polls.webp",
    alt: "Screenshot of community polls with financial data.",
  },
  {
    number: "008",
    era: "October 2024",
    title: "Added X-ray feature to news article screen.",
    image: "/images/patch-notes/patch-08-xray-feature.webp",
    alt: "Screenshot of the X-ray feature on a news article.",
  },
  {
    number: "009",
    era: "November 2024",
    title: "First investment guides and educational resources added.",
    image: "/images/patch-notes/patch-09-investment-guides.webp",
    alt: "Screenshot of the first investment guides.",
  },
  {
    number: "010",
    era: "January 2025",
    title: "First gamification features and onboarding steps added.",
    image: "/images/patch-notes/patch-10-gamification.webp",
    alt: "Screenshot of gamified onboarding steps.",
  },
  {
    number: "011",
    era: "March 2025",
    title: "Goals Today streaks added.",
    image: "/images/patch-notes/patch-11-goals-today-streaks.webp",
    alt: "Screenshot of the Goals Today streaks feature.",
  },
  {
    number: "012",
    era: "May 2025",
    title: "Revamped news article scrolling.",
    image: "/images/patch-notes/patch-12-news-scrolling-revamp.webp",
    alt: "Screenshot of the revamped news scrolling.",
  },
  {
    number: "013",
    era: "July 2025",
    title: "Instagram story feature.",
    image: "/images/patch-notes/patch-13-instagram-story.webp",
    alt: "Screenshot of the Instagram-style stories feature.",
  },
  {
    number: "014",
    era: "September 2025",
    title: "Paper trading added.",
    image: "/images/patch-notes/patch-14-paper-trading.webp",
    alt: "Screenshot of paper trading.",
  },
  {
    number: "015",
    era: "November 2025",
    title: "Daily Jargon and daily quizzes added.",
    image: "/images/patch-notes/patch-15-daily-jargon.webp",
    alt: "Screenshot of Daily Jargon and quizzes.",
  },
  {
    number: "016",
    era: "January 2026",
    title: "Learning resources expanded into a curriculum.",
    image: "/images/patch-notes/patch-16-learning-curriculum.webp",
    alt: "Screenshot of the learning curriculum.",
  },
  {
    number: "017",
    era: "March 2026",
    title: "Added first LeetTrade questions.",
    image: "/images/patch-notes/patch-17-leettrade-first.webp",
    alt: "Screenshot of the first LeetTrade questions.",
  },
  {
    number: "018",
    era: "April 2026",
    title: "Expansion of LeetTrade.",
    image: "/images/patch-notes/patch-18-leettrade-expansion.webp",
    alt: "Screenshot of the expanded LeetTrade.",
  },
];

export const patchNotesCloser = {
  era: "STARDATE NOW",
  title: "Still building.",
  description:
    "Every patch above started as a sketch in a notebook. The next one will too. If you've got an idea worth shipping, write to the team.",
  ctaLabel: "Send us a build idea",
  ctaMailto: "mailto:team@starrytrader.com?subject=Build idea",
};
