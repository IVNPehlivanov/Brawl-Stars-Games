export type BrawlerRarity = "Common" | "Rare" | "Super Rare" | "Epic" | "Mythic" | "Legendary" | "Starting Brawler";
export type BrawlerClass = "Damage Dealer" | "Tank" | "Marksman" | "Assassin" | "Support" | "Controller" | "Healer" | "Hybrid";
export type BrawlerSpeed = "Slow" | "Normal" | "Fast" | "Very Fast";

export interface BrawlerStats {
  rarity: BrawlerRarity;
  class: BrawlerClass;
  speed: BrawlerSpeed;
  attackRange: "Short" | "Mid" | "Long";
  releaseYear: number;
  hasHypercharge: boolean;
}

export const BRAWLER_STATS: Record<string, BrawlerStats> = {
  shelly:    { rarity: "Starting Brawler", class: "Damage Dealer", speed: "Normal",    attackRange: "Short", releaseYear: 2017, hasHypercharge: true },
  colt:      { rarity: "Common",           class: "Damage Dealer", speed: "Normal",    attackRange: "Long",  releaseYear: 2017, hasHypercharge: true },
  bull:      { rarity: "Common",           class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2017, hasHypercharge: false },
  brock:     { rarity: "Rare",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2017, hasHypercharge: true },
  dynamike:  { rarity: "Rare",             class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  bo:        { rarity: "Rare",             class: "Controller",    speed: "Normal",    attackRange: "Long",  releaseYear: 2017, hasHypercharge: false },
  el_primo:  { rarity: "Rare",             class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2017, hasHypercharge: true },
  barley:    { rarity: "Rare",             class: "Controller",    speed: "Slow",      attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  poco:      { rarity: "Rare",             class: "Healer",        speed: "Normal",    attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  rosa:      { rarity: "Rare",             class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2018, hasHypercharge: false },
  jessie:    { rarity: "Super Rare",       class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  nita:      { rarity: "Super Rare",       class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  mortis:    { rarity: "Mythic",           class: "Assassin",      speed: "Very Fast", attackRange: "Short", releaseYear: 2017, hasHypercharge: true },
  crow:      { rarity: "Legendary",        class: "Assassin",      speed: "Very Fast", attackRange: "Mid",   releaseYear: 2017, hasHypercharge: false },
  spike:     { rarity: "Legendary",        class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2017, hasHypercharge: true },
  leon:      { rarity: "Legendary",        class: "Assassin",      speed: "Fast",      attackRange: "Short", releaseYear: 2018, hasHypercharge: true },
  sandy:     { rarity: "Legendary",        class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2019, hasHypercharge: false },
  amber:     { rarity: "Legendary",        class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  meg:       { rarity: "Mythic",           class: "Tank",          speed: "Normal",    attackRange: "Mid",   releaseYear: 2021, hasHypercharge: false },
  surge:     { rarity: "Mythic",           class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  colette:   { rarity: "Epic",             class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  lou:       { rarity: "Epic",             class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  belle:     { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2021, hasHypercharge: false },
  squeak:    { rarity: "Mythic",           class: "Controller",    speed: "Slow",      attackRange: "Mid",   releaseYear: 2021, hasHypercharge: false },
  grom:      { rarity: "Epic",             class: "Marksman",      speed: "Slow",      attackRange: "Long",  releaseYear: 2022, hasHypercharge: false },
  buzz:      { rarity: "Super Rare",       class: "Assassin",      speed: "Normal",    attackRange: "Short", releaseYear: 2021, hasHypercharge: false },
  griff:     { rarity: "Super Rare",       class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2021, hasHypercharge: false },
  gene:      { rarity: "Mythic",           class: "Support",       speed: "Normal",    attackRange: "Long",  releaseYear: 2018, hasHypercharge: false },
  max:       { rarity: "Mythic",           class: "Support",       speed: "Very Fast", attackRange: "Mid",   releaseYear: 2019, hasHypercharge: false },
  mr_p:      { rarity: "Mythic",           class: "Controller",    speed: "Normal",    attackRange: "Long",  releaseYear: 2019, hasHypercharge: false },
  piper:     { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2018, hasHypercharge: false },
  pam:       { rarity: "Epic",             class: "Healer",        speed: "Normal",    attackRange: "Mid",   releaseYear: 2018, hasHypercharge: false },
  frank:     { rarity: "Epic",             class: "Tank",          speed: "Slow",      attackRange: "Short", releaseYear: 2018, hasHypercharge: true },
  bibi:      { rarity: "Epic",             class: "Tank",          speed: "Fast",      attackRange: "Short", releaseYear: 2019, hasHypercharge: false },
  bea:       { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2019, hasHypercharge: false },
  nani:      { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2019, hasHypercharge: false },
  edgar:     { rarity: "Mythic",           class: "Assassin",      speed: "Fast",      attackRange: "Short", releaseYear: 2020, hasHypercharge: false },
  griff_2:   { rarity: "Super Rare",       class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2021, hasHypercharge: false },
  gale:      { rarity: "Mythic",           class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  darryl:    { rarity: "Super Rare",       class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2018, hasHypercharge: false },
  penny:     { rarity: "Super Rare",       class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2018, hasHypercharge: false },
  jacky:     { rarity: "Super Rare",       class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2019, hasHypercharge: false },
  carl:      { rarity: "Super Rare",       class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2019, hasHypercharge: false },
  tick:      { rarity: "Super Rare",       class: "Controller",    speed: "Slow",      attackRange: "Long",  releaseYear: 2019, hasHypercharge: false },
  eight_bit: { rarity: "Super Rare",       class: "Damage Dealer", speed: "Slow",      attackRange: "Long",  releaseYear: 2019, hasHypercharge: false },
  emz:       { rarity: "Super Rare",       class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2019, hasHypercharge: false },
  stu:       { rarity: "Epic",             class: "Assassin",      speed: "Very Fast", attackRange: "Short", releaseYear: 2020, hasHypercharge: false },
  ruffs:     { rarity: "Epic",             class: "Support",       speed: "Normal",    attackRange: "Mid",   releaseYear: 2020, hasHypercharge: false },
  lola:      { rarity: "Epic",             class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2021, hasHypercharge: false },
  fang:      { rarity: "Mythic",           class: "Assassin",      speed: "Fast",      attackRange: "Short", releaseYear: 2021, hasHypercharge: false },
  eve:       { rarity: "Mythic",           class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2022, hasHypercharge: false },
  janet:     { rarity: "Epic",             class: "Damage Dealer", speed: "Normal",    attackRange: "Long",  releaseYear: 2022, hasHypercharge: false },
  bonnie:    { rarity: "Epic",             class: "Hybrid",        speed: "Normal",    attackRange: "Long",  releaseYear: 2022, hasHypercharge: false },
  otis:      { rarity: "Mythic",           class: "Controller",    speed: "Normal",    attackRange: "Mid",   releaseYear: 2022, hasHypercharge: false },
  sam:       { rarity: "Epic",             class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2022, hasHypercharge: false },
  buster:    { rarity: "Epic",             class: "Tank",          speed: "Normal",    attackRange: "Short", releaseYear: 2022, hasHypercharge: false },
  chester:   { rarity: "Legendary",        class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2022, hasHypercharge: false },
  gray:      { rarity: "Mythic",           class: "Support",       speed: "Normal",    attackRange: "Mid",   releaseYear: 2023, hasHypercharge: false },
  mandy:     { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2023, hasHypercharge: false },
  maisie:    { rarity: "Epic",             class: "Marksman",      speed: "Normal",    attackRange: "Long",  releaseYear: 2023, hasHypercharge: false },
  hank:      { rarity: "Epic",             class: "Tank",          speed: "Slow",      attackRange: "Short", releaseYear: 2023, hasHypercharge: false },
  pearl:     { rarity: "Epic",             class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2023, hasHypercharge: false },
  larry_and_lawrie: { rarity: "Epic",      class: "Damage Dealer", speed: "Normal",    attackRange: "Mid",   releaseYear: 2023, hasHypercharge: false },
};

export function getBrawlerKeys(): string[] {
  return Object.keys(BRAWLER_STATS);
}

export function getBrawlerDisplayName(key: string): string {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Mr P", "Mr. P")
    .replace("Eight Bit", "8-Bit")
    .replace("Larry And Lawrie", "Larry & Lawrie");
}

export function brawlerMatchesSearch(key: string, query: string): boolean {
  return getBrawlerDisplayName(key).toLowerCase().includes(query.toLowerCase());
}

export function findExactMatchKey(query: string): string | null {
  const q = query.toLowerCase().trim();
  return getBrawlerKeys().find((k) => getBrawlerDisplayName(k).toLowerCase() === q) ?? null;
}

export const RARITY_ORDER: BrawlerRarity[] = [
  "Starting Brawler", "Common", "Rare", "Super Rare", "Epic", "Mythic", "Legendary",
];

export const SPEED_ORDER: BrawlerSpeed[] = ["Slow", "Normal", "Fast", "Very Fast"];

export function compareOrdered<T>(a: T, b: T, order: T[]): "correct" | "higher" | "lower" {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  if (ai === bi) return "correct";
  return ai > bi ? "higher" : "lower";
}
