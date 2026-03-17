"use client";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { BRAWLER_STATS, getBrawlerKeys, getBrawlerDisplayName, brawlerMatchesSearch, findExactMatchKey } from "@/lib/brawler-stats";

const HYPERCHARGE_POOL = Object.entries(BRAWLER_STATS)
  .filter(([, v]) => v.hyperchargeName !== null)
  .map(([brawlerKey, v]) => ({
    brawlerKey,
    hyperchargeName: v.hyperchargeName as string,
    hyperchargeDescription: v.hyperchargeDescription ?? "",
  }));
import { getDailySecretFromPool, markPlayedToday, setPersistedGameState, getPersistedGameState } from "@/lib/daily";
import NextModeLink from "@/components/NextModeLink";
import Image from "next/image";

interface Props {
  dayKey: string;
  onSolved: () => void;
}

interface PersistedState {
  guesses: string[];
  won: boolean;
  secretKey: string;
}

export default function HyperchargeGame({ dayKey, onSolved }: Props) {
  const entry = getDailySecretFromPool(HYPERCHARGE_POOL, "hypercharge", dayKey);
  const secretKey = entry.brawlerKey;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = getPersistedGameState<PersistedState>("hypercharge", dayKey);
    if (saved && saved.secretKey === secretKey) {
      setGuesses(saved.guesses);
      setWon(saved.won);
    }
  }, [dayKey, secretKey]);

  const persist = (g: string[], w: boolean) => {
    setPersistedGameState("hypercharge", dayKey, { guesses: g, won: w, secretKey });
  };

  const brawlerKeys = getBrawlerKeys().filter((k) =>
    HYPERCHARGE_POOL.some((h) => h.brawlerKey === k)
  );

  const handleInput = (val: string) => {
    setInput(val);
    setError("");
    if (val.length < 1) { setSuggestions([]); return; }
    setSuggestions(
      brawlerKeys
        .filter((k) => brawlerMatchesSearch(k, val) && !guesses.includes(k))
        .slice(0, 8)
    );
  };

  const submitGuess = (key: string) => {
    setInput("");
    setSuggestions([]);
    if (guesses.includes(key)) { setError("Already guessed!"); return; }

    const newGuesses = [...guesses, key];
    const isWon = key === secretKey;

    setGuesses(newGuesses);
    persist(newGuesses, isWon);

    if (isWon) {
      setWon(true);
      markPlayedToday("hypercharge");
      onSolved();
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#fbbf24", "#34d399", "#a855f7"] });
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
      {/* Hypercharge clue */}
      <div className="p-4 border border-purple-400/30 rounded-xl bg-purple-400/5">
        <p className="text-purple-300 font-semibold text-sm mb-1">⚡ Hypercharge: {entry.hyperchargeName}</p>
        <p className="text-white/70 text-sm leading-relaxed">{entry.hyperchargeDescription}</p>
      </div>

      {!won && (
        <div className="relative">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Which brawler has this hypercharge?"
              autoComplete="off"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 outline-none focus:border-purple-400/60 text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors text-sm">
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
        <div className="mt-4 p-4 border border-green-500/30 rounded-xl bg-green-500/10 text-center animate-fade-up">
          <Image
            src={`/Brawlers/${secretKey.replace(/_/g, "-")}.webp`}
            alt={getBrawlerDisplayName(secretKey)}
            width={100}
            height={100}
            className="mx-auto rounded-lg mb-2"
          />
          <p className="text-green-400 font-bold text-xl">🎉 {getBrawlerDisplayName(secretKey)}!</p>
          <p className="text-white/60 text-sm mt-1">{guesses.length} {guesses.length === 1 ? "guess" : "guesses"}</p>
          <NextModeLink currentSlug="hypercharge" />
        </div>
      )}

      {/* Wrong guesses */}
      {guesses.filter((k) => k !== secretKey).length > 0 && (
        <div className="mt-2">
          <p className="text-white/40 text-xs mb-2">Wrong guesses ({guesses.filter((k) => k !== secretKey).length}):</p>
          <div className="flex flex-wrap gap-2">
            {guesses.filter((k) => k !== secretKey).map((k) => (
              <span key={k} className="px-2 py-1 bg-red-900/40 border border-red-500/30 rounded text-xs text-white/60 animate-wrong-in">
                {getBrawlerDisplayName(k)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
