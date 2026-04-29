/**
 * /about page content. Source-of-truth copy from the v4.3 brief
 * (starrytrader-about-page.md). All text on the About page reads from here.
 */

export type Commitment = {
  title: string;
  body: string;
  icon: "infinity" | "shieldOff" | "lock" | "fileText";
};

export type Pillar = {
  name: "Learn" | "Research" | "Practice";
  body: string;
};

export type ImpactRow = {
  metric: string;
  why: string;
  value?: string;
  delta?: string;
  icon: "globe" | "graduationCap" | "trendingUp" | "shieldCheck";
};

export type Persona = {
  title: string;
  body: string;
};

export type AboutPartner = {
  name: string;
  category: "Academic" | "AI and infrastructure" | "Industry" | "Distribution and media";
  status: "real" | "in-conversation";
};

export type OpenRole = {
  slug: string;
  title: string;
  body: string;
  location: string;
};

export const aboutHero = {
  eyebrow: "About StarryTrader",
  headline: "Free financial education for the next generation of investors.",
  subheadline: "No fees. No upsells. No commissions. Just understanding.",
  primaryCta: { label: "Try the app for free", href: "/#download" },
  secondaryCta: { label: "Partner with us", href: "#partners" },
};

export const aboutStory = {
  eyebrow: "Our Story",
  title: "Two friends. One frustration. A mission that changed everything.",
  paragraphs: [
    "StarryTrader started in 2023 when two friends noticed something broken: the gap between wanting to invest and knowing how to invest was filled with noise, not education. Jargon-heavy platforms. Hype-driven content. Apps designed to get you trading before you understood what you were doing.",
    "We built StarryTrader to close that gap.",
    "What began as a passion project between two people who loved programming and investing has grown into a team of seven, an app on iOS and Android, and a community of learners across the globe. Along the way, we earned an Honourable Mention from Google out of 3,100 submissions, which told us the idea was resonating.",
  ],
  bridge: "Free education was never a pivot. It was the point.",
  timeline: [
    { year: "2023", note: "Two friends. Two cities. One frustration." },
    { year: "2025", note: "Google Honourable Mention. 1 of 21, from 3,100 submissions." },
    { year: "2026", note: "Team of seven. Built independently. Always free." },
  ],
};

export const aboutWhyFree = {
  eyebrow: "Why we are free",
  title: "We believe financial literacy is a right, not a product.",
  lead: [
    "Early on, we asked ourselves a question: if our goal is to make investing education accessible to every young adult who needs it, should there be a price tag on that?",
    "The answer was clear.",
    "StarryTrader is a non-profit educational platform. Every learning path, every research tool, every paper trading challenge is free and will stay free. We fund our work through grants, university partnerships, and sponsorships from organisations that share our mission, never through selling your data, promoting financial products, or taking commissions.",
  ],
  commitmentsHeading: "Our commitments to you",
  commitments: [
    {
      title: "Permanently free access.",
      body: "The core educational experience will never sit behind a paywall.",
      icon: "infinity",
    },
    {
      title: "No paid placements.",
      body: "We will never accept payment to recommend a brokerage, fund, or financial product.",
      icon: "shieldOff",
    },
    {
      title: "No data sales.",
      body: "Your learning data belongs to you. We use it to improve your experience, not to sell to third parties.",
      icon: "lock",
    },
    {
      title: "Full transparency.",
      body: "We publish an annual Impact Report so you can see exactly how we are funded and what difference we are making.",
      icon: "fileText",
    },
  ] as Commitment[],
  reportCallout: {
    label: "Read our latest Impact Report",
    href: "#impact",
  },
};

export const aboutWhatWeDo = {
  eyebrow: "What we do",
  title: "Learn. Understand. Decide with confidence.",
  lead: "StarryTrader is designed for people who are just starting out: graduating from high school, entering university, or stepping into their first job and realising they need to understand money. We built three pillars into the platform:",
  pillars: [
    {
      name: "Learn",
      body: "Guided learning paths that teach you how experienced investors think, not just what to buy. Master 30+ core financial concepts through bite-sized explanations, real-world scenarios, and skill challenges that test your understanding as you go.",
    },
    {
      name: "Research",
      body: "A clean, organised space to follow companies and markets without drowning in data. AI-powered insights surface what matters and why, so you build the habit of informed decision-making from day one.",
    },
    {
      name: "Practice",
      body: "Paper trading and investing challenges where you apply what you have learned with zero real-money risk. Compete with friends, track your progress, and build confidence before you ever open a real brokerage account.",
    },
  ] as Pillar[],
};

export const aboutImpact = {
  eyebrow: "Our impact",
  title: "We measure what matters.",
  lead: "We track our impact across four dimensions because we believe accountability is part of the mission.",
  // Empty values render the Q3 2026 placeholder per the brief.
  rows: [
    {
      metric: "Reach",
      why: "Users, countries, and communities served. Shows how far free education is spreading.",
      icon: "globe",
    },
    {
      metric: "Learning depth",
      why: "Paths completed, concepts mastered. Proves users are gaining real knowledge, not just downloading an app.",
      icon: "graduationCap",
    },
    {
      metric: "Confidence growth",
      why: "Self-reported confidence before and after. Captures the shift from 'I do not know where to start' to 'I can explain this'.",
      icon: "trendingUp",
    },
    {
      metric: "Investor safety",
      why: "Scam recognition and red-flag identification rates. Demonstrates we are protecting young investors, not just educating them.",
      icon: "shieldCheck",
    },
  ] as ImpactRow[],
  pdfPath: null as string | null,
  emptyMessage: "Our first Impact Report publishes Q3 2026.",
};

export const aboutPersonas = {
  eyebrow: "Who we serve",
  title: "Built for the curious. Designed for beginners.",
  lead: "StarryTrader is for anyone between 17 and 25 who wants to understand investing but doesn't want to gamble, get burned, or feel lost. You might be:",
  cards: [
    {
      title: "The first-time student",
      body: "A university student hearing about stocks for the first time.",
    },
    {
      title: "The first-paycheck graduate",
      body: "A recent graduate wondering what to do with your first paycheck.",
    },
    {
      title: "The starter who doesn't know where to start",
      body: "Someone who's been told to 'start investing early' but has no idea where to begin.",
    },
  ] as Persona[],
  closing: "If that sounds like you (or someone you know), you are exactly who we built this for.",
};

export const aboutPartners = {
  eyebrow: "Our partners and supporters",
  title: "StarryTrader is made possible by organisations that believe financial literacy changes lives.",
  lead: "Want to support the mission? Whether you are a university, a financial institution, or a foundation, we'd love to talk.",
  // Real partners only per v4.3 decision. Add `in-conversation` rows here when leads exist.
  partners: [
    { name: "NUS School of Computing", category: "Academic", status: "real" },
    { name: "Northwestern University", category: "Academic", status: "real" },
    { name: "Google Gemini", category: "AI and infrastructure", status: "real" },
  ] as AboutPartner[],
  ctas: [
    { label: "Partner with us", subject: "Partnership inquiry" },
    { label: "Support our mission", subject: "Sponsorship inquiry" },
  ],
};

export const aboutMission = {
  eyebrow: "Join the mission",
  title: "We're a small team doing big work. Come build with us.",
  lead: "StarryTrader runs on the energy of people who care about closing the financial literacy gap. We're looking for contributors who want to use their skills for something that matters.",
  roles: [
    {
      slug: "content-curriculum-designer",
      title: "Content & Curriculum Designer",
      body: "Design learning paths and educational content that make complex financial concepts click for beginners.",
      location: "Remote · Mission-driven role",
    },
    {
      slug: "community-builder",
      title: "Community Builder",
      body: "Grow and nurture our Discord community and university partnerships. Be the bridge between StarryTrader and the students who need it.",
      location: "Remote · Mission-driven role",
    },
    {
      slug: "full-stack-developer",
      title: "Full-Stack Developer",
      body: "Build and improve the platform that powers free financial education for thousands of young adults.",
      location: "Remote · Mission-driven role",
    },
    {
      slug: "visual-ux-designer",
      title: "Visual & UX Designer",
      body: "Shape the experience so that learning about investing feels clear, welcoming, and even enjoyable.",
      location: "Remote · Mission-driven role",
    },
  ] as OpenRole[],
};

export const aboutContact = {
  eyebrow: "Contact us",
  title: "Have a question, a partnership idea, or just want to say hello?",
  lead: "We read everything.",
  closingNote: "We read everything. We respond within 48 hours.",
  inquiryTypes: [
    { value: "general", label: "General" },
    { value: "partnership", label: "Partnership" },
    { value: "sponsorship", label: "Sponsorship" },
    { value: "press", label: "Press" },
    { value: "careers", label: "Careers" },
  ],
};

export const aboutClosingTagline = {
  base: "Investing, explained.",
  accent: "For everyone. For free.",
};
