// Pool for the Hypercharge game mode — only brawlers who have one
export interface HyperchargeEntry {
  brawlerKey: string;
  hyperchargeName: string;
  hyperchargeDescription: string;
}

export const HYPERCHARGE_POOL: HyperchargeEntry[] = [
  { brawlerKey: "shelly",   hyperchargeName: "Shell Shock",    hyperchargeDescription: "Shelly's Super now slows enemies for an extended duration and gains a wider blast radius." },
  { brawlerKey: "colt",     hyperchargeName: "Bullet Storm",   hyperchargeDescription: "Colt's Super destroys all terrain it passes through and deals increased damage." },
  { brawlerKey: "brock",    hyperchargeName: "Rocket Rain",    hyperchargeDescription: "Brock fires a massive barrage of rockets in a wide spread pattern during his Super." },
  { brawlerKey: "el_primo", hyperchargeName: "Meteor Rush",    hyperchargeDescription: "El Primo's Super becomes a fiery meteor impact with doubled range and area of effect." },
  { brawlerKey: "mortis",   hyperchargeName: "Death's Door",   hyperchargeDescription: "Mortis charges twice as fast during his Super, stealing health with every hit." },
  { brawlerKey: "spike",    hyperchargeName: "Fertilize",      hyperchargeDescription: "Spike's Super creates a larger zone that deals damage and roots enemies for a long duration." },
  { brawlerKey: "leon",     hyperchargeName: "Shadow Clone",   hyperchargeDescription: "Leon creates a shadow clone that mimics his attacks for several seconds." },
  { brawlerKey: "frank",    hyperchargeName: "Shattering Blow",hyperchargeDescription: "Frank's Super shockwave travels further, knocking back and stunning all enemies it hits." },
];
