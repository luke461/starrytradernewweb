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
      "Andre started programming in middle school. By the time he enlisted for National Service in Singapore, he had already shipped websites and joined hackathons. The bunk became his unlikely co-working space.",
      "The idea for StarryTrader came from watching his friends bet money on stocks they didn’t understand. When Andre asked why they never read the financial news, the answer was three words long. ‘Too many words.’ He took that seriously. With a co-founder, he started building an app that summarises financial news in plain English and turns market literacy into a daily habit.",
      "StarryTrader earned an honourable mention in Google’s Build with Gemini competition (1 of 21 selected from 3,100 submissions). Andre is now in his first year of Computer Science at NUS, with a minor in Mathematics, and he is still building. He reads widely, boulders, and wants to go deep into Natural Language Processing long-term.",
      "Featured in NUS Computing News and The Daily Northwestern.",
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
