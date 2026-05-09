/**
 * Home page content. All copy lives here so editorial changes don't touch JSX.
 * Compliance reminders:
 *   - No em dashes anywhere on the site (brief Section 11, rule 1).
 *   - No language resembling investment advice (rule 2).
 *   - Stats cited inline with source and year (rule 4).
 *   - Awards must be real before they appear on the live site (rule 5).
 */

export type Stat = { value: string; headline: string; source: string };
export type Capability = { name: string; description: string };
export type Pillar = {
  id: string;
  index: string;
  title: string;
  insight: { quote: string; source: string };
  headline: string;
  capabilities: Capability[];
  visualLabel: string;
  // One-line clarifier rendered next to the pillar title on the Product page.
  // Used to bridge the in-app feature name (e.g. "Compete") with the
  // educational philosophy on the About page (e.g. "Practice").
  clarifier?: string;
};
export type Review = {
  /** Optional headline (e.g., App Store review title). */
  title?: string;
  /** The review body / pull quote. */
  quote: string;
  /** Person or username being attributed. */
  attribution: string;
  /** Role / affiliation / date — shown as small text after the name. */
  attributionDetail?: string;
  /** Where the review came from: "App Store", publication name, etc. */
  source: string;
  /** Optional link to the original source (article URL, store listing). */
  sourceHref?: string;
  /** Star rating, 1–5. Omit for press quotes that don't have a rating. */
  rating?: number;
  tone: "violet" | "blue" | "indigo";
};
export type Partner = { name: string; category: "academic" | "ai" | "industry" | "media"; status: "real" | "target" };
export type Award = { name: string; body: string; date: string; featured?: boolean; subline?: string; logo?: string };
export type PressItem = {
  publication: string;
  date: string;
  headline: string;
  quote: string;
  href: string;
  locationTag: string;
  /** Article hero image used on /press cards. */
  image?: string;
  /** Optional publication logo (SVG preferred) shown in the home-hero
   *  trust strip's white logo card. Drop a file into
   *  `public/images/press-logos/` and point at it here, e.g.
   *  `/images/press-logos/nus-comp.svg`. When undefined the card
   *  falls back to the publication name as a text wordmark. */
  logoPath?: string;
  /** Optional logo intrinsic size in px so next/image preserves the
   *  aspect ratio without squashing. Required when logoPath is set. */
  logoWidth?: number;
  logoHeight?: number;
};
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  city: "Singapore" | "Chicago" | "Evanston" | "Other";
  /** Optional one-line quote shown beneath the name. Founders use this
   *  on the home/team cards; other members keep it omitted. */
  thinking?: string;
  socials?: { linkedin?: string; x?: string; email?: string };
  founder?: boolean;
  // Drop a square image into /public/team/ and set this to the path,
  // e.g. "/team/andre-liu.jpg". Leave undefined to use the initial-letter portrait.
  avatar?: string;
  /** Short 2-3 sentence bio for the org chart card. TODO_BIO placeholder
   *  is fine; do not fabricate. */
  summary?: string;
  /** Optional skill / affiliation chips. Only populate from data that
   *  actually exists in source material (don't guess). */
  tags?: string[];
  /** Slug of the person this member reports to. Drives the mobile
   *  "Reports to: …" caption. CEO has no value. */
  reportsTo?: string;
};

export const hero = {
  trustStrip: {
    caption: "Featured in",
    logos: [
      { name: "The Daily Northwestern", real: true },
      { name: "NUS School of Computing", real: true },
    ],
  },
};

export const problemStats: Stat[] = [
  { value: "62%", headline: "of Gen Z feel financially stressed three or more days a week.", source: "Motley Fool, 2024" },
  { value: "43%", headline: "lost money in their first year of investing.", source: "FINRA Foundation, 2022" },
  { value: "48%", headline: "basic financial literacy among U.S. adults, stagnant since 2017.", source: "TIAA Institute, 2024" },
];

export const pillars: Pillar[] = [
  {
    id: "learn",
    index: "01",
    title: "Learn. Build the foundation, one term at a time.",
    insight: {
      quote: "65% of low-to-moderate-income students cite fear of loss as their primary investing barrier.",
      source: "Commonwealth, 2024",
    },
    headline: "A re-entry point that doesn’t make you feel stupid.",
    capabilities: [
      { name: "Step-by-Step Learning Path", description: "A beginner-friendly roadmap that normalises volatility and explains why prices move in cycles." },
      { name: "Daily Jargon Streaks", description: "Master one financial term a day. Build a habit loop. Beat the boredom of traditional finance content." },
      { name: "Finance Definitions on Demand", description: "AI explains key terms instantly, in plain English, wherever they appear in the app." },
      { name: "Topical Challenges", description: "Hands-on scenarios for value investing, momentum trading, and key indicators." },
    ],
    visualLabel: "Learning Path",
  },
  {
    id: "research",
    index: "02",
    title: "Research. Stay informed without feeling overwhelmed.",
    insight: {
      quote: "79% of Gen Z and Millennials turn to social media for financial advice. 50% began investing due to FOMO.",
      source: "CFA Institute, 2023; PYMNTS, 2024",
    },
    headline: "Real-time context, without the hype cycle.",
    capabilities: [
      { name: "Watchlist-Based AI Summaries", description: "Real-time news summaries tailored to a user’s interests, in plain English, with jargon decoded inline." },
      { name: "Stock Stories", description: "Swipe through market news the way Gen Z already swipes through Instagram. Built for the muscle memory they have, not the muscle memory finance assumes." },
      { name: "AI Sentiment Analysis", description: "See the percentage split of positive, negative, and neutral coverage on any stock. Understand the narrative, not just the headline." },
      { name: "Market Cycle Visuals", description: "Identify accumulation zones and historical patterns so you stop chasing the top." },
      { name: "Senator Insider Trading Tracker", description: "Surface the latest stock trades made by U.S. senators. Transparency, by default." },
      { name: "7,000 articles processed every day", description: "The data infrastructure behind every summary, sentiment score, and stock story." },
    ],
    visualLabel: "Stock Stories",
  },
  {
    id: "compete",
    index: "03",
    title: "Compete. Practice with no money on the line.",
    insight: {
      quote: "Cognitive biases do not diminish with experience. Advanced investors develop sophisticated rationalisations for irrational decisions.",
      source: "Thaler and Sunstein, 2008",
    },
    headline: "Skill-building that feels like a game and teaches like a coach.",
    capabilities: [
      { name: "LeetTrade", description: "16 curated real-world trading scenarios. Level up. Compete on the global leaderboard." },
      { name: "Paper Trading Leaderboard", description: "Risk-free competition with friends and the global community." },
      { name: "Interactive Polls and Trivia", description: "Test strategy and knowledge against the community in short, daily formats." },
    ],
    visualLabel: "LeetTrade",
    clarifier: "Practice through competition. Risk-free.",
  },
];

export const stats = [
  { value: "7,000", caption: "articles processed every day" },
  { value: "16", caption: "LeetTrade challenges live in the app" },
  { value: "30+", caption: "financial keywords in Daily Jargon" },
  { value: "2,000+", caption: "pages of curated financial content" },
];

export const reviews: Review[] = [
  {
    title: "Great place to compile news all in one place",
    quote:
      "It’s great for short term traders, information gets compiled and distributed within the app. Within 1 hour of the press release information shows up from major news sources.",
    attribution: "chu23cgu",
    attributionDetail: "22 Aug",
    source: "App Store review",
    rating: 5,
    tone: "violet",
  },
  {
    quote:
      "I didn’t have a clue what I was doing. I was just going based on my own sentiment, so I wasn’t looking at financial statements or anything like that. My dad just gave me a small account and said, ‘Good luck.’ If I’d had something like that, I probably wouldn’t have made as many stupid decisions.",
    attribution: "Matthew Knigin",
    attributionDetail: "McCormick first-year, Northwestern",
    source: "The Daily Northwestern",
    sourceHref:
      "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/",
    tone: "blue",
  },
  {
    quote:
      "The app does a really good job pulling all the latest and most relevant news articles and sort of laying it all out in front of you.",
    attribution: "Alex DaCorte",
    attributionDetail: "Weinberg first-year, Northwestern",
    source: "The Daily Northwestern",
    sourceHref:
      "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/",
    tone: "indigo",
  },
];

export const partners: Partner[] = [
  { name: "NUS School of Computing", category: "academic", status: "real" },
  { name: "Northwestern University", category: "academic", status: "real" },
  { name: "Google Gemini", category: "ai", status: "real" },
];

/**
 * App / brokerage partners shown in the home and team partner blocks.
 * Source of truth lives in `@/content/partners` (extended schema for the
 * /partners page). This re-export adapts the schema to the legacy shape
 * used by HomePartners.tsx and team/page.tsx.
 */
import { partners as brokeragePartners } from "@/content/partners";
export type AppPartner = { name: string; logo: string; href?: string; logoWidth: number; logoHeight: number };
export const appPartners: AppPartner[] = brokeragePartners.map((p) => ({
  name: p.name,
  logo: p.logoPath,
  href: p.url,
  logoWidth: p.logoWidth,
  logoHeight: p.logoHeight,
}));

export const awards: Award[] = [
  {
    name: "Build with Gemini, Honourable Mention",
    body: "Google AI Showcase, 2025",
    date: "2025",
    featured: true,
    subline: "1 of 21 mentions, out of 3,100 submissions (0.67%).",
    logo: "/images/awards/gemini.webp",
  },
];

export const press: PressItem[] = [
  {
    publication: "NUS Computing News",
    date: "27 March 2026",
    headline: "From NS Bunk to NUS: How Andre Liu Kept Building.",
    quote: "His friends were dabbling in stock trading and losing money. When he asked about their strategies, the answers were vague. He asked why they never read the news or reports. The answer was honest: ‘Too many words.’",
    href: "https://www.comp.nus.edu.sg/news/from-ns-bunk-to-nus-how-andre-liu-kept-building/",
    locationTag: "Singapore",
    image: "/images/press/nus-comp.webp",
    logoPath: "/images/press-logos/nus-comp.png",
    logoWidth: 621,
    logoHeight: 122,
  },
  {
    publication: "The Daily Northwestern",
    date: "24 April 2026",
    headline: "Northwestern first-year creates educational investing app while completing national service in Singapore.",
    quote: "A first-year built across two cities and one timezone gap that never sleeps.",
    href: "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/",
    locationTag: "Chicago",
    image: "/images/press/daily-northwestern.webp",
    logoPath: "/images/press-logos/daily-northwestern.svg",
    logoWidth: 525,
    logoHeight: 61,
  },
];

export const team: TeamMember[] = [
  {
    slug: "andre-liu",
    name: "Andre Liu",
    role: "Co-Founder & CEO",
    location: "Singapore",
    city: "Singapore",
    thinking: "My friends said the news had too many words. So I built something with fewer.",
    socials: { linkedin: "https://www.linkedin.com/in/andre-liu-009733184", email: "andre@starrytrader.com" },
    founder: true,
    avatar: "/team/andre.webp",
    summary:
      "Andre Liu is the co-founder of StarryTrader, a financial platform with a growing user base that helps investors understand market news more efficiently. He focuses on product direction, user growth, and partnerships, working with financial firms to expand the platform's reach. Alongside building StarryTrader, he studies Computer Science at the National University of Singapore.",
    tags: ["Computer Science", "NUS", "Mathematics"],
  },
  // Temporarily hidden — uncomment this block to restore Emmanuel as co-founder.
  // {
  //   slug: "co-founder",
  //   name: "Emmanuel",
  //   role: "Co-Founder & CEO",
  //   location: "Chicago, USA",
  //   city: "Chicago",
  //   thinking: "Building the app I wish existed when I lost my first $500.",
  //   founder: true,
  //   avatar: "/team/emmanuel.webp",
  //   socials: { linkedin: "https://www.linkedin.com/in/emmanuel-q-carter" },
  // },
  {
    slug: "lucas",
    name: "Lucas Cheah",
    role: "Chief Operating Officer (COO) & Head of Product",
    location: "Australia",
    city: "Other",
    avatar: "/team/lucas.webp",
    socials: { linkedin: "https://www.linkedin.com/in/lucas-cheah-158a12358" },
    summary:
      "Lucas Cheah is the COO and Head of Product at StarryTrader, where he leads product strategy and operations. A finance and economics student, Lucas brings a rare combination of entrepreneurial drive and institutional credibility with experience spanning investment banking, venture capital, and YouTube partnerships. Outside of work, Lucas enjoys reading, playing basketball, video games, and spending time with his loved ones.",
    tags: ["Finance", "Investment Banking", "Venture Capital"],
    reportsTo: "andre-liu",
  },
  {
    slug: "luke",
    name: "Luke Carter",
    role: "Digital Marketing Manager",
    location: "Singapore",
    city: "Singapore",
    avatar: "/team/luke.webp",
    socials: { linkedin: "https://www.linkedin.com/in/luke-carter-931916267" },
    summary:
      "Luke Carter is the Digital Marketing Manager at StarryTrader, specializing in web design and online brand strategy. He focuses on creating compelling, user-friendly digital experiences that attract and retain investors. Alongside this role, he is matriculating into the National University of Singapore to study Business and majoring in Finance. Luke is an avid photographer and basketball player.",
    tags: ["NUS", "Business", "Finance"],
    reportsTo: "lucas",
  },
  {
    slug: "ava",
    name: "Ava Luo",
    role: "Head of Comms & Partnerships",
    location: "Chicago, USA",
    city: "Chicago",
    avatar: "/team/ava.webp",
    socials: { linkedin: "https://www.linkedin.com/in/ava-luo-757940243" },
    summary:
      "Ava Luo is the Head of Communications and Partnerships at StarryTrader. She is currently a student at Northwestern University studying journalism and economics with a minor in data science. Outside of school and StarryTrader, she enjoys smelling perfumes at department stores, baking her food cravings, and going on sidequests.",
    tags: ["Northwestern", "Journalism", "Economics"],
    reportsTo: "lucas",
  },
  {
    slug: "zen",
    name: "Zen Phang",
    role: "Strategy & Ops Associate",
    location: "Singapore",
    city: "Singapore",
    avatar: "/team/zen.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/zen-phang-212173326" },
    summary:
      "Zen Phang is a Strategy and Operations associate at StarryTrader, also managing the company Telegram and TikTok channels. He is a Business Analytics student at the National University of Singapore and NUS College, with a keen interest in high finance and a great appetite for learning. Zen enjoys running and road cycling, and is trying (not too successfully) to get into tennis.",
    tags: ["NUS", "NUS College", "Business Analytics"],
    reportsTo: "lucas",
  },
  {
    slug: "sinclair",
    name: "Sinclair Ng",
    role: "Software Engineer",
    location: "Singapore",
    city: "Singapore",
    avatar: "/team/sinclair.webp",
    socials: { linkedin: "https://www.linkedin.com/in/sinclair-ng-sn" },
    summary:
      "Sinclair Ng is a Software Engineer at StarryTrader, where he builds and maintains software products and works on backend infrastructure to keep things running smoothly behind the scenes. Currently studying Computer Science at the National University of Singapore, he brings both academic knowledge and hands-on experience to everything he works on. He enjoys tackling complex technical challenges and is passionate about writing clean, reliable code that makes a real difference. Outside of work and studies, you'll likely find him exploring a new destination or unwinding with a good show!",
    tags: ["NUS", "Computer Science", "Backend"],
    reportsTo: "andre-liu",
  },
  {
    slug: "yuan-feng",
    name: "Kew Yuan Feng",
    role: "Software Engineer",
    location: "Singapore",
    city: "Singapore",
    avatar: "/team/yuan-feng.webp",
    socials: { linkedin: "https://www.linkedin.com/in/kew-yuan-feng-0879aa226" },
    summary:
      "Kew Yuan Feng is part of the Software Development team at StarryTrader, where he contributes to building and improving the company's digital products and technical infrastructure. They focus on creating reliable, efficient, and user-friendly software solutions that support the platform's growth and overall user experience.",
    tags: ["Software Development", "Infrastructure", "User Experience"],
    reportsTo: "andre-liu",
  },
];

export const blogPreviews = [
  { slug: "why-you-bought-at-the-top", category: "Bias", title: "Why you bought at the top, and what your brain was actually doing.", readMin: 6 },
  { slug: "i-lost-400-on-gamestop", category: "Beginner", title: "I lost $400 on GameStop in 2021. Here’s what I’d do differently.", readMin: 4 },
  { slug: "the-2022-selloff-explained", category: "Market Cycles", title: "The 2022 selloff, explained without using the word ‘macro’.", readMin: 8 },
];
