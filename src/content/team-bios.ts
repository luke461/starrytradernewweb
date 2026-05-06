export type TeamBio = {
  slug: string;
  paragraphs: string[];
  responsibilities: string[];
  links?: { label: string; href: string }[];
};

const placeholder: TeamBio = {
  slug: "_placeholder",
  paragraphs: [
    "Bio coming soon. This team member is in the process of joining StarryTrader’s public roster.",
  ],
  responsibilities: [],
};

export const teamBios: Record<string, TeamBio> = {
  "andre-liu": {
    slug: "andre-liu",
    paragraphs: [
      "Andre Liu is the co-founder of StarryTrader, a financial platform with a growing user base that helps investors understand market news more efficiently. He focuses on product direction, user growth, and partnerships, working with financial firms to expand the platform’s reach. Alongside building StarryTrader, he studies Computer Science at the National University of Singapore.",
    ],
    responsibilities: [
      "Product strategy and the long-term research direction.",
      "Engineering across mobile, AI infrastructure, and the news pipeline.",
      "Founder voice across press, partnerships, and investor conversations.",
    ],
    links: [
      { label: "NUS Computing News feature", href: "https://www.comp.nus.edu.sg/news/from-ns-bunk-to-nus-how-andre-liu-kept-building/" },
      { label: "The Daily Northwestern feature", href: "https://dailynorthwestern.com/2026/04/24/campus/northwestern-first-year-creates-educational-investing-app-while-completing-national-service-in-singapore/" },
    ],
  },
};

export function getTeamBio(slug: string): TeamBio {
  return teamBios[slug] ?? { ...placeholder, slug };
}
