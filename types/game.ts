export type GameMode = "classic" | "pixel" | "gadget" | "hypercharge" | "ultimate-challenge";
export type GuessResult = "correct" | "higher" | "lower" | "wrong";

export interface AttributeResult {
  value: string | number | boolean;
  result: "correct" | "wrong" | "higher" | "lower";
}

export interface ClassicGuessAttributes {
  rarity: AttributeResult;
  class: AttributeResult;
  speed: AttributeResult;
  attackRange: AttributeResult;
  releaseYear: AttributeResult;
  hasHypercharge: AttributeResult;
}

export interface ClassicGuess {
  brawlerKey: string;
  brawlerName: string;
  attributes: ClassicGuessAttributes;
}
