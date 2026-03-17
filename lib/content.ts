export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brawledly.com",
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Brawledly",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@brawledly.com",
};

export type GameMetaItem = {
  slug: string;
  title: string;
  description: string;
  mode: "daily" | "endless";
  shortDesc: string;
  seoHowItWorks: string;
};

export const GAME_META: GameMetaItem[] = [
  {
    slug: "classic",
    title: "Classic Wordle",
    description: "Guess the daily Brawl Stars brawler from stat clues",
    shortDesc: "Guess from stats",
    mode: "daily",
    seoHowItWorks: "Each guess reveals whether the mystery brawler shares stats like rarity, class, speed, and release year.",
  },
  {
    slug: "pixel",
    title: "Pixel Brawler",
    description: "Identify the brawler from a pixelated portrait",
    shortDesc: "Pixelated image",
    mode: "daily",
    seoHowItWorks: "The brawler portrait starts heavily pixelated. Each wrong guess reveals a clearer version.",
  },
  {
    slug: "gadget",
    title: "Guess the Gadget",
    description: "Which brawler has this gadget?",
    shortDesc: "Gadget clue",
    mode: "daily",
    seoHowItWorks: "Read the gadget name and description, then guess which brawler it belongs to.",
  },
  {
    slug: "hypercharge",
    title: "Hypercharge",
    description: "Which brawler has this hypercharge ability?",
    shortDesc: "Hypercharge clue",
    mode: "daily",
    seoHowItWorks: "Read the hypercharge name and description, then guess which brawler it belongs to.",
  },
  {
    slug: "ultimate-challenge",
    title: "Ultimate Challenge",
    description: "All 4 modes combined — one brawler, 25 attempts",
    shortDesc: "All modes combined",
    mode: "endless",
    seoHowItWorks: "Face all 4 game modes simultaneously. Identify the same brawler across Classic, Pixel, Gadget, and Hypercharge clues.",
  },
];

export const GAME_FLOW_SLUGS = ["classic", "pixel", "gadget", "hypercharge", "ultimate-challenge"];

export function getGameMetaBySlug(slug: string): GameMetaItem | undefined {
  return GAME_META.find((g) => g.slug === slug);
}

export function getNextGameBySlug(currentSlug: string): GameMetaItem | null {
  const idx = GAME_FLOW_SLUGS.indexOf(currentSlug);
  if (idx === -1 || idx === GAME_FLOW_SLUGS.length - 1) return null;
  return getGameMetaBySlug(GAME_FLOW_SLUGS[idx + 1]) ?? null;
}

export function getGameLogoPath(slug: string): string {
  const map: Record<string, string> = {
    classic: "/Game-Logos/Classic.webp",
    pixel: "/Game-Logos/Pixel.webp",
    gadget: "/Game-Logos/Gadget.webp",
    hypercharge: "/Game-Logos/Hypercharge.webp",
    "ultimate-challenge": "/Game-Logos/Ultimate-Challenge.webp",
  };
  return map[slug] ?? "/Game-Logos/Classic.webp";
}
