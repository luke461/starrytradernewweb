/**
 * /privacy page content. Layered notice (UK ICO / IAPP standard):
 *   Layer 1: at-a-glance card grid.
 *   Layer 2: full notice, sections A through K.
 *   Layer 3: definitions and details, collapsed by default.
 *
 * isDraft controls the banner at the top of the page. Flip to false
 * after qualified counsel has reviewed the wording.
 */

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: { strong?: string; text: string }[] }
  | { type: "ol"; items: { strong?: string; text: string }[] }
  | { type: "callout"; text: string };

export type PrivacySection = {
  id: string;
  letter: string;
  title: string;
  blocks: PrivacyBlock[];
};

export type AtAGlanceIcon =
  | "Eye"
  | "Target"
  | "Ban"
  | "Share2"
  | "Clock"
  | "Globe"
  | "User"
  | "Mail";

export const privacyContent = {
  isDraft: true,
  lastUpdated: "2026-04-28",

  hero: {
    label: "PRIVACY NOTICE",
    headline: "Your data, in plain English.",
    sub: "We collect as little as we can, use it for the things you signed up for, and never sell it. This page explains what that actually means.",
  },

  draftBanner: {
    text: "This privacy notice is a working draft, pending review by qualified counsel. The substance below describes our intent and best current practice. Final wording will be confirmed before launch.",
  },

  atAGlance: {
    heading: "At a glance.",
    lead: "The short version, with links to the full text below.",
    cards: [
      { icon: "Eye" as AtAGlanceIcon, title: "What we collect", answer: "Your account info, what you do in the app, and basic device data.", anchor: "what-we-collect" },
      { icon: "Target" as AtAGlanceIcon, title: "Why we collect it", answer: "To run the platform, personalise learning, and improve the curriculum.", anchor: "why-we-use-it" },
      { icon: "Ban" as AtAGlanceIcon, title: "What we never do", answer: "Sell your data, target you with ads, or share with brokers without your consent.", anchor: "who-we-share-with" },
      { icon: "Share2" as AtAGlanceIcon, title: "Who we share with", answer: "Service providers we depend on, brokerage partners only when you connect, and authorities when legally required.", anchor: "who-we-share-with" },
      { icon: "Clock" as AtAGlanceIcon, title: "How long we keep it", answer: "As long as your account is active, plus a short period after for support and legal compliance.", anchor: "how-long-we-keep-it" },
      { icon: "Globe" as AtAGlanceIcon, title: "Where it lives", answer: "Singapore and the United States, with protections that travel with the data.", anchor: "international-transfers" },
      { icon: "User" as AtAGlanceIcon, title: "What you can do", answer: "Access, correct, delete, port, and withdraw consent. Email us anytime.", anchor: "your-rights" },
      { icon: "Mail" as AtAGlanceIcon, title: "How to reach us", answer: "team@starrytrader.com. We respond within 30 days.", anchor: "who-is-responsible" },
    ],
    fullNoticeCta: "Read the full notice below",
  },

  fullNotice: {
    heading: "The full notice.",
    sections: [
      {
        id: "what-this-notice-covers",
        letter: "A",
        title: "What this notice covers",
        blocks: [
          { type: "p", text: "This notice describes what data StarryTrader collects, how we use it, who we share it with, how long we keep it, and the rights you have over it. It applies to anyone using StarryTrader through our website, our apps, or by writing to our team. We follow Singapore's Personal Data Protection Act (PDPA) and apply its principles globally." },
        ],
      },
      {
        id: "who-is-responsible",
        letter: "B",
        title: "Who is responsible",
        blocks: [
          { type: "p", text: "StarryTrader is operated by the founding team, working between Singapore and Chicago. Our Data Protection Officer (DPO) is responsible for our compliance with PDPA. To reach the DPO, write to team@starrytrader.com with the subject line “DPO inquiry.”" },
        ],
      },
      {
        id: "what-we-collect",
        letter: "C",
        title: "What we collect",
        blocks: [
          { type: "h3", text: "Account data" },
          { type: "p", text: "Your name, email, age range, and any details you choose to add to your profile." },
          { type: "h3", text: "Learning activity" },
          { type: "p", text: "What you read, watch, complete, save, or quiz on inside the app. We use this to track your progress and improve the curriculum." },
          { type: "h3", text: "Device and technical data" },
          { type: "p", text: "Device type, operating system, app version, and approximate location at the city level. We collect this to keep the platform stable and debug issues." },
          { type: "h3", text: "Communications" },
          { type: "p", text: "When you write to us, we keep a copy of the message and our response so we can follow up." },
          { type: "h3", text: "Cookies and similar technologies" },
          { type: "p", text: "We use a small number of essential cookies for sign-in and basic analytics. We do not use third-party advertising cookies. See Section L for the full list." },
        ],
      },
      {
        id: "why-we-use-it",
        letter: "D",
        title: "Why we use it",
        blocks: [
          { type: "p", text: "We use the data we collect for four reasons:" },
          {
            type: "ol",
            items: [
              { strong: "To run the platform.", text: "Sign-in, account preferences, and basic functionality." },
              { strong: "To personalise the learning experience.", text: "Showing you what you have completed, what to try next, and how your streaks are doing." },
              { strong: "To improve the curriculum.", text: "Aggregated, de-identified usage patterns help us learn which lessons work and which need rewriting." },
              { strong: "To communicate with you.", text: "Replies to messages, important platform announcements, and occasional product updates if you have opted in." },
            ],
          },
          { type: "p", text: "We do not use your data to recommend financial products, sell advertising, or build profiles for third parties." },
        ],
      },
      {
        id: "who-we-share-with",
        letter: "E",
        title: "Who we share with",
        blocks: [
          { type: "p", text: "We share personal data only in the following situations:" },
          {
            type: "ul",
            items: [
              { strong: "With service providers", text: "who run infrastructure on our behalf (cloud hosting, email delivery, analytics). These providers are contractually required to protect the data." },
              { strong: "With brokerage partners,", text: "only with data you explicitly choose to share when you connect a paper-trading account or similar feature. We do not share data with brokerage partners automatically." },
              { strong: "When required by law", text: "in response to legitimate legal process from a competent authority." },
            ],
          },
          { type: "p", text: "We do not sell personal data. We do not share data for advertising or marketing purposes by third parties. The full list of categories of recipients is in Section L." },
        ],
      },
      {
        id: "how-long-we-keep-it",
        letter: "F",
        title: "How long we keep it",
        blocks: [
          { type: "p", text: "We retain personal data for as long as your account is active, plus a reasonable period after deactivation to handle support questions, comply with legal obligations, and protect our work. When data is no longer needed, we delete it or anonymise it." },
          { type: "p", text: "Specific retention periods for different data categories are listed in Section L." },
        ],
      },
      {
        id: "your-rights",
        letter: "G",
        title: "Your rights",
        blocks: [
          { type: "p", text: "You have the right to:" },
          {
            type: "ul",
            items: [
              { strong: "Access", text: "your data. Ask us what data we hold about you." },
              { strong: "Correct", text: "your data. Tell us if something is wrong, and we will fix it." },
              { strong: "Withdraw consent.", text: "Stop our continued use of your data for purposes that depend on consent. Some core platform functions cannot continue without basic data." },
              { strong: "Delete", text: "your data. Request that we delete the personal data we hold about you, subject to legal retention requirements." },
              { strong: "Port", text: "your data. Receive a copy of the data you have given us in a structured, commonly used format." },
              { strong: "Object", text: "to processing. Tell us if you object to specific uses of your data." },
              { strong: "Lodge a complaint.", text: "With us first, and with the relevant data protection authority if we cannot resolve it." },
            ],
          },
          { type: "p", text: "To exercise any of these rights, write to team@starrytrader.com. We respond within 30 days." },
        ],
      },
      {
        id: "how-we-protect-data",
        letter: "H",
        title: "How we protect data",
        blocks: [
          { type: "p", text: "We apply standard industry safeguards: encryption in transit and at rest, access controls limited to people who need access for their work, and regular review of our data practices. No system is perfectly secure, and we do not promise that ours is. We do promise that if a breach occurs, we will notify affected individuals and the relevant authorities in line with PDPA requirements." },
        ],
      },
      {
        id: "international-transfers",
        letter: "I",
        title: "International transfers",
        blocks: [
          { type: "p", text: "StarryTrader operates between Singapore and the United States. Personal data may be transferred between these jurisdictions and to service providers based elsewhere. When this happens, we apply protections at least equivalent to those required by PDPA." },
        ],
      },
      {
        id: "users-under-18",
        letter: "J",
        title: "Age and minors",
        blocks: [
          { type: "p", text: "StarryTrader is an educational platform open to anyone curious about how investing works. We do not provide investment advice and we do not facilitate real-money trades. The platform's App Store and Google Play age ratings reflect that the content is suitable for a general audience." },
          { type: "p", text: "We require account holders to be at least 13 years old. This minimum age aligns with global standards for online services that collect personal data, including the United States Children's Online Privacy Protection Act (COPPA), and lets us run accounts without collecting parental consent records." },
          { type: "p", text: "If we learn that someone under 13 has created an account, we will delete the account and any personal data we collected from it. Parents or guardians who believe their child has signed up should write to team@starrytrader.com." },
        ],
      },
      {
        id: "updates",
        letter: "K",
        title: "Updates to this notice",
        blocks: [
          { type: "p", text: "We may update this notice when our practices change or when laws change. The “last updated” date at the top of this page reflects the most recent change. Material changes will be communicated to active users by email or through the app." },
        ],
      },
    ] as PrivacySection[],
  },

  definitions: {
    title: "Definitions and technical details",
    placeholder:
      "This section will list our sub-processors, retention periods per data category, and a cookie list once finalised. Last reviewed: 2026-04-28.",
  },

  closer: {
    heading: "Have a privacy question?",
    sub: "Privacy is a real conversation, not a one-way disclosure. If something is unclear, if you want to exercise a right, or if you spot something we should improve, write to us.",
    primaryCta: { label: "Email the team", mailto: "mailto:team@starrytrader.com" },
    secondaryCta: { label: "Read about how we are funded", href: "/funding" },
  },
} as const;
