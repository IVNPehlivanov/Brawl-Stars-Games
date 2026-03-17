export interface DailyPlayedRecord {
  [dayKey: string]: string[]; // gameSlug[]
}

export interface ClassicGameState {
  guesses: import("@/types/game").ClassicGuess[];
  won: boolean;
  secretKey: string;
  dayKey: string;
}

export interface PixelGameState {
  guesses: string[];
  won: boolean;
  secretKey: string;
  dayKey: string;
}

export interface SimpleGameState {
  guesses: string[];
  won: boolean;
  secretKey: string;
  dayKey: string;
}
