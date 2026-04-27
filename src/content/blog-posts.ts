export type BlogCategory = "Beginner" | "Bias" | "Market Cycles" | "Community" | "Behind StarryTrader";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  author: string;
  authorSlug: string;
  date: string; // ISO
  readMin: number;
  excerpt: string;
  cover: "violet" | "blue" | "indigo";
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-you-bought-at-the-top",
    title: "Why you bought at the top, and what your brain was actually doing.",
    category: "Bias",
    author: "Andre Liu",
    authorSlug: "andre-liu",
    date: "2026-04-12",
    readMin: 6,
    excerpt: "The scariest thing about chasing a stock isn’t the loss. It’s how reasonable it felt at the time.",
    cover: "violet",
    body: [
      "Almost every first-year investor has a version of this story. A stock keeps climbing for weeks. Friends mention it. Group chats reference it. Twitter, TikTok, Reddit are all loud about it. Eventually, it feels like the only people not in the trade are the ones who don’t get it.",
      "So you buy. Often near the top. Then it falls. And the part that hurts most is not the dollar amount. It is the realisation that, at the moment of the decision, the action felt completely rational.",
      "The behavioural finance literature has a name for what happened. Several names, in fact. Recency bias makes the recent past feel like the future. Herding makes consensus feel like signal. FOMO makes inaction feel like loss. None of these are character flaws. They are baseline features of how human attention works under uncertainty.",
      "Knowing this does not make you immune. It makes you slightly slower. And slightly slower is most of what good investing actually is.",
      "At StarryTrader, every Stock Story includes a sentiment summary, a price-cycle context, and a plain-language explanation of what changed. The point is not to tell you what to do. The point is to make the conditions under which you make the decision a little less hostile to your own judgement.",
      "Next time the group chat is loud, try this. Do not act on the first impulse. Read the cycle visual. Ask whether the news is actually new, or whether the price moved first and the explanation arrived later. Most of the time, the explanation arrived later.",
    ],
  },
  {
    slug: "i-lost-400-on-gamestop",
    title: "I lost $400 on GameStop in 2021. Here’s what I’d do differently.",
    category: "Beginner",
    author: "Andre Liu",
    authorSlug: "andre-liu",
    date: "2026-03-22",
    readMin: 4,
    excerpt: "The trade was wrong. The lesson was right. Five years on, here is what the experience taught me.",
    cover: "indigo",
    body: [
      "In January 2021, I put $400 into GameStop. I had been reading r/wallstreetbets for a week. The story was loud, the screenshots were vivid, and the gains looked easy. I bought near the top, watched it fall, watched it rally, watched it fall again, and eventually sold for a loss I felt for months.",
      "The trade was wrong. The lesson was right. Three things stayed with me.",
      "First, I had no thesis. I had a vibe. The difference between a thesis and a vibe is whether you can write down what would have to be true for the trade to work, and what would have to be true for it to fail. I could write neither.",
      "Second, I confused volume with signal. Loudness is not information. The fact that everyone was talking about something told me nothing about the underlying business or the price I was paying for it. By the time something is everywhere, the easy part of the move is already over.",
      "Third, I treated a single trade as a verdict on me as a person. That is a young-investor problem and an emotional problem more than a market problem. The losses are easier to absorb when the next trade is informed by the last one rather than by the desire to recover from it.",
      "If I were starting again, I would do exactly what StarryTrader’s LeetTrade scenarios make you do. Write down the thesis. Pick the action. Read the explanation. Repeat. The point is not to be right. The point is to build a feedback loop.",
    ],
  },
  {
    slug: "the-2022-selloff-explained",
    title: "The 2022 selloff, explained without using the word ‘macro’.",
    category: "Market Cycles",
    author: "Andre Liu",
    authorSlug: "andre-liu",
    date: "2026-02-14",
    readMin: 8,
    excerpt: "Everything that happened to your portfolio in 2022, in plain language. Without a single Bloomberg screenshot.",
    cover: "indigo",
    body: [
      "In 2022, almost every asset class fell at the same time. Stocks fell. Bonds fell. Crypto fell. Tech, the asset class many young investors had concentrated portfolios in, fell hardest. If you were 22 and had only invested through the post-2020 boom, this was the first time the market behaved like the textbooks said it could.",
      "The clearest way to understand what happened is to follow the cost of money. From 2020 to early 2022, money was historically cheap. Central banks held interest rates near zero to support economies during the pandemic. Cheap money made it rational for investors to pay high prices for any company that promised growth in the future, because a future dollar was almost as valuable as a present one.",
      "Then inflation arrived. To slow it down, central banks raised the cost of money quickly and steadily. Suddenly a future dollar was meaningfully less valuable than a present one. The companies whose entire valuation rested on profits years away got re-priced first and hardest. That is why high-growth tech fell more than steady, profitable consumer companies.",
      "Bonds fell for a related reason. When new bonds pay higher interest, older bonds with lower interest become less attractive, so their prices drop. This is mechanical. It is not opinion.",
      "Crypto fell because crypto in 2021 had behaved like an extreme version of the same growth-stock dynamic. When the cost of money rose, the riskiest, longest-duration bets fell first.",
      "None of this is a story about anyone doing anything wrong. It is a story about how interest rates change what every other price means.",
      "If you were a young investor watching this happen, the most useful thing was not predicting it. It was understanding the system well enough to not panic-sell into the bottom. The best teaching tool we have for this is StarryTrader’s Market Cycle visual. It does not tell you where we are now. It shows you what cycles look like, so the next one feels less personal.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2) {
  const current = getBlogPost(slug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
