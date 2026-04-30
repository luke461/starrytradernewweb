/**
 * Brokerage / institutional partners. Drives the home page logo wall
 * (HomePartners.tsx) and the dedicated /partners page.
 *
 * Adding a new partner: append one entry below. The /partners page renders
 * sections automatically and alternates dark/light backgrounds.
 */
export type Partner = {
  name: string;
  logoPath: string;
  url?: string;
  isReal: boolean;
  type: "Brokerage" | "Grant" | "University" | "Foundation" | "Sponsor" | "Other";
  order: number;
  region: string;
  shortDescription?: string;
  whoTheyAre: string;
  whatTheyDo: string;
  whyWePartner: string;
  whatLearnersGet: string;
  /** Intrinsic pixel dimensions of the logo file. Required so next/image
   *  preserves the correct aspect ratio (declaring wrong dims squashes
   *  the logo even with w-auto on the className). */
  logoWidth: number;
  logoHeight: number;
};

export const partners: Partner[] = [
  {
    name: "Moomoo",
    logoPath: "/images/partners/moomoo-trimmed.webp",
    url: "https://www.moomoo.com",
    isReal: true,
    type: "Brokerage",
    order: 1,
    region: "Asia-Pacific",
    shortDescription: "Brokerage partner for paper-trading infrastructure and US market data.",
    whoTheyAre:
      "Moomoo is a digital brokerage operating across the United States, Singapore, Australia, Japan, Malaysia, and Canada. They focus on commission-free trading and structured market data.",
    whatTheyDo:
      "Moomoo provides paper-trading infrastructure and access to real-time US market data. StarryTrader integrates this so learners can practice without funding a real account.",
    whyWePartner:
      "Moomoo's structured market data and paper-trading capability let StarryTrader teach without exposing learners to real-money risk. Their educational tooling matches the level of plain-English clarity we ask of every partner.",
    whatLearnersGet:
      "Access to a paper-trading environment that uses real US market data. The ability to test investment strategies before they ever fund a real brokerage account. A clear bridge from the StarryTrader curriculum to live markets when learners are ready.",
    logoWidth: 436,
    logoHeight: 84,
  },
  {
    name: "uSMART",
    logoPath: "/images/partners/usmart-trimmed.webp",
    url: "https://www.usmart.com",
    isReal: true,
    type: "Brokerage",
    order: 2,
    region: "Hong Kong, Singapore",
    shortDescription: "Brokerage partner for regional market access and educational integration.",
    whoTheyAre:
      "uSMART is a regulated brokerage based in Hong Kong and Singapore. They serve retail investors with multi-market access including Hong Kong, US, Singapore, and China A-share markets.",
    whatTheyDo:
      "uSMART provides regional market access and educational integration capabilities that StarryTrader uses to extend learning paths beyond US markets.",
    whyWePartner:
      "Most retail-investing education content is US-centric. uSMART's regional reach lets StarryTrader teach learners in Asia-Pacific markets in their own market context, not in translation.",
    whatLearnersGet:
      "Education that includes the markets they actually invest in. Stock examples and market cycle modules that draw from Hong Kong, Singapore, and US data. A pathway to act on what they learn through a regulated regional broker when they choose to.",
    logoWidth: 309,
    logoHeight: 55,
  },
];

/** Returns a slug fragment usable for in-page anchors (#partner-moomoo). */
export function partnerAnchorId(name: string): string {
  return `partner-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
