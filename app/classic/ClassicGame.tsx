"use client";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  BRAWLER_STATS,
  getBrawlerKeys,
  getBrawlerDisplayName,
  brawlerMatchesSearch,
  findExactMatchKey,
  compareOrdered,
  RARITY_ORDER,
  SPEED_ORDER,
} from "@/lib/brawler-stats";
import {
  getDailySecretFromPool,
  markPlayedToday,
  setPersistedGameState,
  getPersistedGameState,
} from "@/lib/daily";
import type { ClassicGuess, ClassicGuessAttributes, AttributeResult } from "@/types/game";
import NextModeLink from "@/components/NextModeLink";
import Image from "next/image";

interface Props {
  dayKey: string;
  onSolved: () => void;
}

interface PersistedState {
  guesses: ClassicGuess[];
  won: boolean;
  secretKey: string;
}

const ATTRIBUTE_LABELS: Record<keyof ClassicGuessAttributes, string> = {
  rarity: "Rarity",
  class: "Class",
  speed: "Speed",
  attackRange: "Range",
  releaseYear: "Year",
  hasHypercharge: "Hypercharge",
};

function Cell({ attr }: { attr: AttributeResult }) {
  const base = "px-2 py-2 rounded text-xs text-center font-medium flex flex-col items-center gap-0.5 min-w-0";
  const bg =
    attr.result === "correct" ? "bg-green-600/80 text-white" :
    attr.result === "wrong"   ? "bg-red-800/60 text-white/80" :
                                "bg-orange-700/70 text-white";
  const arrow = attr.result === "higher" ? "↑" : attr.result === "lower" ? "↓" : null;
  const display =
    typeof attr.value === "boolean"
      ? attr.value ? "Yes" : "No"
      : String(attr.value);

  return (
    <div className={`${base} ${bg}`}>
      <span className="truncate w-full text-center">{display}</span>
      {arrow && <span className="text-lg leading-none">{arrow}</span>}
    </div>
  );
}

export default function ClassicGame({ dayKey, onSolved }: Props) {
  const brawlerKeys = getBrawlerKeys();
  const secretKey = getDailySecretFromPool(brawlerKeys, "classic", dayKey);

  const [guesses, setGuesses] = useState<ClassicGuess[]>([]);
  const [won, setWon] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore persisted state
  useEffect(() => {
    const saved = getPersistedGameState<PersistedState>("classic", dayKey);
    if (saved && saved.secretKey === secretKey) {
      setGuesses(saved.guesses);
      setWon(saved.won);
    }
  }, [dayKey, secretKey]);

  const persist = (g: ClassicGuess[], w: boolean) => {
    setPersistedGameState("classic", dayKey, { guesses: g, won: w, secretKey });
  };

  const handleInput = (val: string) => {
    setInput(val);
    setError("");
    if (val.length < 1) { setSuggestions([]); return; }
    setSuggestions(
      brawlerKeys
        .filter((k) => brawlerMatchesSearch(k, val) && !guesses.some((g) => g.brawlerKey === k))
        .slice(0, 8)
    );
  };

  const submitGuess = (key: string) => {
    setInput("");
    setSuggestions([]);
    if (guesses.some((g) => g.brawlerKey === key)) {
      setError("Already guessed!");
      return;
    }
    const secret = BRAWLER_STATS[secretKey];
    const guess = BRAWLER_STATS[key];
    if (!guess || !secret) { setError("Brawler not found."); return; }

    const attributes: ClassicGuessAttributes = {
      rarity:       { value: guess.rarity,        result: compareOrdered(guess.rarity, secret.rarity, RARITY_ORDER) },
      class:        { value: guess.class,          result: guess.class === secret.class ? "correct" : "wrong" },
      speed:        { value: guess.speed,          result: compareOrdered(guess.speed, secret.speed, SPEED_ORDER) },
      attackRange:  { value: guess.attackRange,    result: guess.attackRange === secret.attackRange ? "correct" : "wrong" },
      releaseYear:  { value: guess.releaseYear,    result: guess.releaseYear === secret.releaseYear ? "correct" : guess.releaseYear > secret.releaseYear ? "higher" : "lower" },
      hasHypercharge:{ value: guess.hasHypercharge,result: guess.hasHypercharge === secret.hasHypercharge ? "correct" : "wrong" },
    };

    const newGuess: ClassicGuess = { brawlerKey: key, brawlerName: getBrawlerDisplayName(key), attributes };
    const newGuesses = [newGuess, ...guesses];
    const isWon = key === secretKey;

    setGuesses(newGuesses);
    persist(newGuesses, isWon);

    if (isWon) {
      setWon(true);
      markPlayedToday("classic");
      onSolved();
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#fbbf24", "#34d399", "#60a5fa"] });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = findExactMatchKey(input);
    if (key) { submitGuess(key); return; }
    if (suggestions.length === 1) { submitGuess(suggestions[0]); return; }
    setError("Select a brawler from the list.");
  };

  return (
    <div className="space-y-4">
      {!won && (
        <div className="relative">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Type a brawler name…"
              autoComplete="off"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 outline-none focus:border-yellow-400/60 text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm">
              Guess
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="absolute z-20 w-full mt-1 bg-gray-900 border border-white/20 rounded-lg overflow-hidden shadow-xl">
              {suggestions.map((k) => (
                <li key={k}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 text-white flex items-center gap-2"
                    onClick={() => submitGuess(k)}
                  >
                    <Image src={`/Brawlers/${k.replace(/_/g, "-")}.webp`} alt="" width={24} height={24} className="rounded" />
                    {getBrawlerDisplayName(k)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {won && (
        <div className="text-center py-4 animate-fade-up">
          <p className="text-green-400 font-bold text-xl mb-1">🎉 Correct!</p>
          <p className="text-white/60 text-sm">
            {getBrawlerDisplayName(secretKey)} · {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}
          </p>
          <NextModeLink currentSlug="classic" />
        </div>
      )}

      {/* Guess table */}
      {guesses.length > 0 && (
        <div className="space-y-2 mt-4">
          {/* Header row */}
          <div className="grid grid-cols-8 gap-1 text-xs text-white/40 px-1">
            <div className="col-span-2">Brawler</div>
            {(Object.keys(ATTRIBUTE_LABELS) as (keyof ClassicGuessAttributes)[]).map((k) => (
              <div key={k} className="text-center">{ATTRIBUTE_LABELS[k]}</div>
            ))}
          </div>
          {guesses.map((g, i) => (
            <div key={g.brawlerKey} className={`grid grid-cols-8 gap-1 items-center animate-wrong-in`} style={{ animationDelay: `${i * 30}ms` }}>
              <div className="col-span-2 flex items-center gap-1.5 text-xs">
                <Image src={`/Brawlers/${g.brawlerKey.replace(/_/g, "-")}.webp`} alt="" width={28} height={28} className="rounded shrink-0" />
                <span className="truncate text-white/80">{g.brawlerName}</span>
              </div>
              {(Object.keys(ATTRIBUTE_LABELS) as (keyof ClassicGuessAttributes)[]).map((k) => (
                <Cell key={k} attr={g.attributes[k]} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
