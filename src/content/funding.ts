/**
 * /funding page content. The page exists from day one: it states
 * StarryTrader's current self-funded position openly, lays out what
 * the team is looking for, and frames the funding plan transparently.
 *
 * Voice: institutional, factual, no fundraising clichés, no em dashes.
 * Edits to copy here update the page directly.
 */

export type FundingCategoryIcon = "Award" | "GraduationCap" | "Heart";

export const fundingContent = {
  hero: {
    label: "FUNDING",
    headline: "Open to partners who share the mission.",
    sub: "StarryTrader is built and operated by its founding team, free for every learner who uses it. We're inviting foundations, universities, and ethical sponsors who want plain-English financial education to reach further.",
  },
  currentState: {
    heading: "Where we stand today.",
    body: "StarryTrader has been built and operated by its founding team since March 2024, with infrastructure support from our brokerage partners. The platform is free, and our commitment is that it will stay free. The next stretch of growth is about reach, and that is where mission-aligned partners come in.",
    chips: [
      { label: "Building since", value: "March 2024" },
      { label: "Cost to learners", value: "Free, always" },
      { label: "Currently open to", value: "Foundations, universities, sponsors" },
    ],
  },
  lookingFor: {
    heading: "What we are looking for.",
    leadParts: [
      { text: "We are looking for support from organisations whose interests align with ours: making investing literacy free for young people, with rigour and without commercial interference. We do not accept funding tied to placement, content control, or learner data. The commitments we make publicly are on our " },
      { text: "About page", href: "/about" },
      { text: "." },
    ],
    categories: [
      {
        icon: "Award" as FundingCategoryIcon,
        heading: "Foundations and grants.",
        body: "Grants from foundations, public funds, and educational endowments that support youth financial literacy. We are open to project-based and unrestricted grants. We can provide governance documentation, an accountability framework, and the metrics we track.",
      },
      {
        icon: "GraduationCap" as FundingCategoryIcon,
        heading: "University partnerships.",
        body: "Collaborations with universities and educational institutions interested in pairing plain-English financial literacy with their student support programs. We are open to formalising relationships with universities ready to put investing literacy in front of their student community.",
      },
      {
        icon: "Heart" as FundingCategoryIcon,
        heading: "Mission-aligned corporate sponsorship.",
        body: "Sponsorship from companies (including brokerages, fintech firms, and education companies) who want to support free financial education without buying placement. Sponsorship funds operations and reach. It does not buy a logo placement, an endorsement, or a product recommendation.",
      },
    ],
    closingLine: "Where we are uncertain about a funder's alignment, we will say no. The bar is judgement, not absolutes.",
  },
  useOfFunds: {
    heading: "How we will use funds.",
    lead: "Once we have funding to allocate, this is the framework we will publish at each milestone.",
    allocations: [
      { name: "Curriculum and content", description: "Authors, editors, and reviewers building the educational content." },
      { name: "Engineering and platform", description: "Backend, app development, and the infrastructure that delivers the experience." },
      { name: "Outreach and partnerships", description: "The work of reaching learners through schools, universities, and community partners." },
      { name: "Operations and accountability", description: "Legal, accounting, governance, and the team's modest stipends." },
    ],
    note: "We will publish the actual breakdown in our Impact Report each year.",
  },
  impactReport: {
    heading: "Our first Impact Report publishes Q3 2026.",
    body: "From the first dollar of external funding onward, we publish an annual Impact Report. The report covers funding received, how it was allocated, the outcomes we measured, and the lessons we learned. The report is public. The report is rigorous. The report is the artefact we want every funder to evaluate us by.",
  },
  governance: {
    heading: "Governance and legal status.",
    body: "StarryTrader is currently operated by the founding team. We are in the process of establishing the appropriate non-profit legal structure for our jurisdiction, and we will update this section as that work completes. Funders evaluating a formal commitment should write to the team directly. We will provide governance documentation, financial controls documentation, and any due diligence material requested.",
    ctaLabel: "Request our funder due-diligence pack",
    ctaMailto: "mailto:team@starrytrader.com?subject=Due%20diligence%20pack%20request",
  },
  closer: {
    headline: "Want to support the mission?",
    sub: "If you are a foundation, a university, or a mission-aligned company, we would like to hear from you. The work is in front of you on this site. The funding plan is on this page. The next step is a conversation.",
    primaryCtaLabel: "Send us a funding inquiry",
    primaryCtaMailto: "mailto:team@starrytrader.com?subject=Funding%20inquiry",
    secondaryLinks: [
      // Temporarily hidden — uncomment to restore the partners cross-link from /funding.
      // { label: "Read about our partners", href: "/partners" },
      { label: "Read about the team", href: "/team" },
    ],
  },
} as const;
