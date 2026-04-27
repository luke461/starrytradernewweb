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
};
export type Review = { quote: string; name: string; age: number; location: string; tone: "violet" | "blue" | "indigo" };
export type Partner = { name: string; category: "academic" | "ai" | "industry" | "media"; status: "real" | "target" };
export type Award = { name: string; body: string; date: string; featured?: boolean; subline?: string };
export type PressItem = { publication: string; date: string; headline: string; quote: string; href: string; locationTag: string };
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  city: "Singapore" | "Chicago" | "Evanston" | "Other";
  thinking: string;
  socials?: { linkedin?: string; x?: string; email?: string };
  founder?: boolean;
};

export const hero = {
  trustStrip: {
    caption: "Featured in",
    logos: [
      { name: "Google AI Showcase", real: true },
      { name: "The Daily Northwestern", real: true },
      { name: "NUS School of Computing", real: true },
      { name: "Morning Brew", real: false },
      { name: "Tech in Asia", real: false },
      { name: "Built In Chicago", real: false },
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
  },
];

export const stats = [
  { value: "7,000", caption: "articles processed every day" },
  { value: "16", caption: "LeetTrade challenges live in the app" },
  { value: "30+", caption: "financial keywords in Daily Jargon" },
  { value: "2,000+", caption: "pages of curated financial content" },
];

export const reviews: Review[] = [
  { quote: "I lost $400 on a meme stock in 2021 and stopped checking my brokerage for two years. StarryTrader is the first thing that didn’t make me feel stupid for trying again.", name: "Maya", age: 22, location: "Singapore", tone: "violet" },
  { quote: "Daily Jargon got me. I learned more in three weeks of one-term-a-day than in a year of doom-scrolling Twitter finance.", name: "Devin", age: 25, location: "Chicago", tone: "blue" },
  { quote: "I always thought ‘diversification’ was a word my dad used. Now I actually know what it means.", name: "Priya", age: 19, location: "London", tone: "indigo" },
  { quote: "My friends won’t shut up about crypto. StarryTrader is the only place I can ask what ‘volatility’ actually means without getting roasted.", name: "Jordan", age: 18, location: "Austin", tone: "violet" },
  { quote: "LeetTrade is the most honest finance product I’ve used. It tells me when I got it wrong and shows me why.", name: "Wei", age: 26, location: "Hong Kong", tone: "blue" },
  { quote: "Stock Stories are dangerous. I went from never reading market news to swiping through 30 a day.", name: "Sofia", age: 24, location: "Madrid", tone: "indigo" },
];

export const partners: Partner[] = [
  { name: "NUS School of Computing", category: "academic", status: "real" },
  { name: "Northwestern University", category: "academic", status: "real" },
  { name: "Google Gemini", category: "ai", status: "real" },
];

export const awards: Award[] = [
  {
    name: "Build with Gemini, Honourable Mention",
    body: "Google AI Showcase, 2026",
    date: "2026",
    featured: true,
    subline: "1 of 21 mentions, out of 3,100 submissions (0.67%).",
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
  },
  {
    publication: "The Daily Northwestern",
    date: "24 April 2026",
    headline: "Northwestern first-year creates educational investing app while completing national service in Singapore.",
    quote: "A first-year built across two cities and one timezone gap that never sleeps.",
    href: "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/",
    locationTag: "Chicago",
  },
];

export const team: TeamMember[] = [
  {
    slug: "andre-liu",
    name: "Andre Liu",
    role: "Co-founder",
    location: "Singapore",
    city: "Singapore",
    thinking: "My friends said the news had too many words. So I built something with fewer.",
    socials: { linkedin: "https://www.linkedin.com/in/andreliu", email: "andre@starrytrader.com" },
    founder: true,
  },
  {
    slug: "co-founder",
    name: "[Co-founder Name]",
    role: "Co-founder",
    location: "Evanston, USA",
    city: "Evanston",
    thinking: "Building the app I wish existed when I lost my first $500.",
    founder: true,
  },
  { slug: "head-of-content", name: "[Head of Content]", role: "Head of Content", location: "Singapore", city: "Singapore", thinking: "Translating finance into language Gen Z actually uses." },
  { slug: "lead-designer", name: "[Lead Designer]", role: "Lead Designer", location: "Chicago", city: "Chicago", thinking: "Designing the calmest place on the internet to learn about money." },
  { slug: "head-of-community", name: "[Head of Community]", role: "Head of Community", location: "Singapore", city: "Singapore", thinking: "Communities don’t scale by accident." },
  { slug: "ml-engineer", name: "[ML and AI Engineer]", role: "ML and AI Engineer", location: "Chicago", city: "Chicago", thinking: "7,000 articles a day, summarised so a 19-year-old will actually read them." },
  { slug: "head-of-partnerships", name: "[Head of Partnerships]", role: "Head of Partnerships", location: "Singapore", city: "Singapore", thinking: "The best educators in finance are the ones not currently selling anything." },
  { slug: "education-lead", name: "[Education Lead]", role: "Education Lead", location: "Chicago", city: "Chicago", thinking: "Curriculum that respects the learner’s starting point." },
];

export const blogPreviews = [
  { slug: "why-you-bought-at-the-top", category: "Bias", title: "Why you bought at the top, and what your brain was actually doing.", readMin: 6 },
  { slug: "i-lost-400-on-gamestop", category: "Beginner", title: "I lost $400 on GameStop in 2021. Here’s what I’d do differently.", readMin: 4 },
  { slug: "the-2022-selloff-explained", category: "Market Cycles", title: "The 2022 selloff, explained without using the word ‘macro’.", readMin: 8 },
];
