"use client";
import { useState, useCallback } from "react";
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
import { GADGET_POOL } from "@/lib/brawler-gadgets";
import { HYPERCHARGE_POOL } from "@/lib/brawler-hypercharges";
import type { ClassicGuess, ClassicGuessAttributes, AttributeResult } from "@/types/game";
import Image from "next/image";

const MAX_ATTEMPTS = 25;

type TabId = "classic" | "pixel" | "gadget" | "hypercharge";

interface UCState {
  secretKey: string;
  attempts: number;
  guessedNames: string[]; // shared pool
  classicGuesses: ClassicGuess[];
  pixelGuesses: string[];
  gadgetGuesses: string[];
  hyperchargeGuesses: string[];
  solvedModes: TabId[];
  gameOver: boolean;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildInitialState(): UCState {
  const brawlerKeys = getBrawlerKeys();
  // Pick a brawler that has gadget + hypercharge entries for all 4 modes
  const eligible = brawlerKeys.filter(
    (k) => GADGET_POOL.some((g) => g.brawlerKey === k) && HYPERCHARGE_POOL.some((h) => h.brawlerKey === k)
  );
  const secretKey = eligible.length > 0 ? pickRandom(eligible) : pickRandom(brawlerKeys);
  return {
    secretKey,
    attempts: 0,
    guessedNames: [],
    classicGuesses: [],
    pixelGuesses: [],
    gadgetGuesses: [],
    hyperchargeGuesses: [],
    solvedModes: [],
    gameOver: false,
  };
}

const ATTRIBUTE_LABELS: Record<keyof ClassicGuessAttributes, string> = {
  rarity: "Rarity",
  class: "Class",
  speed: "Speed",
  attackRange: "Range",
  releaseYear: "Year",
  hasHypercharge: "HC",
};

function Cell({ attr }: { attr: AttributeResult }) {
  const base = "px-1.5 py-1.5 rounded text-xs text-center font-medium";
  const bg =
    attr.result === "correct" ? "bg-green-600/80 text-white" :
    attr.result === "wrong"   ? "bg-red-800/60 text-white/70" :
                                "bg-orange-700/70 text-white";
  const arrow = attr.result === "higher" ? "↑" : attr.result === "lower" ? "↓" : "";
  const display =
    typeof attr.value === "boolean" ? (attr.value ? "Yes" : "No") : String(attr.value);
  return (
    <div className={`${base} ${bg}`}>
      <div className="truncate">{display}</div>
      {arrow && <div>{arrow}</div>}
    </div>
  );
}

export default function UltimateChallengeGame() {
  const [state, setState] = useState<UCState>(buildInitialState);
  const [tab, setTab] = useState<TabId>("classic");
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState("");

  const brawlerKeys = getBrawlerKeys();
  const gadgetEntry = GADGET_POOL.find((g) => g.brawlerKey === state.secretKey);
  const hyperchargeEntry = HYPERCHARGE_POOL.find((h) => h.brawlerKey === state.secretKey);
  const blurAmount = Math.max(0, 40 - state.pixelGuesses.length * 8);

  const handleInput = useCallback((val: string) => {
    setInput(val);
    setError("");
    if (val.length < 1) { setSuggestions([]); return; }
    setSuggestions(
      brawlerKeys.filter((k) => brawlerMatchesSearch(k, val) && !state.guessedNames.includes(k)).slice(0, 8)
    );
  }, [brawlerKeys, state.guessedNames]);

  const submitGuess = useCallback((key: string) => {
    setInput("");
    setSuggestions([]);
    if (state.guessedNames.includes(key)) { setError("Already guessed!"); return; }
    if (state.gameOver) return;

    setState((prev) => {
      const newAttempts = prev.attempts + 1;
      const newGuessedNames = [...prev.guessedNames, key];
      const isCorrect = key === prev.secretKey;
      const newSolvedModes = [...prev.solvedModes];

      // Classic
      let classicGuesses = prev.classicGuesses;
      if (!prev.solvedModes.includes("classic")) {
        const secret = BRAWLER_STATS[prev.secretKey];
        const guess = BRAWLER_STATS[key];
        if (guess && secret) {
          const attributes: ClassicGuessAttributes = {
            rarity:        { value: guess.rarity,         result: compareOrdered(guess.rarity, secret.rarity, RARITY_ORDER) },
            class:         { value: guess.class,           result: guess.class === secret.class ? "correct" : "wrong" },
            speed:         { value: guess.speed,           result: compareOrdered(guess.speed, secret.speed, SPEED_ORDER) },
            attackRange:   { value: guess.attackRange,     result: guess.attackRange === secret.attackRange ? "correct" : "wrong" },
            releaseYear:   { value: guess.releaseYear,     result: guess.releaseYear === secret.releaseYear ? "correct" : guess.releaseYear > secret.releaseYear ? "higher" : "lower" },
            hasHypercharge:{ value: guess.hasHypercharge,  result: guess.hasHypercharge === secret.hasHypercharge ? "correct" : "wrong" },
          };
          classicGuesses = [{ brawlerKey: key, brawlerName: getBrawlerDisplayName(key), attributes }, ...prev.classicGuesses];
          if (isCorrect && !newSolvedModes.includes("classic")) newSolvedModes.push("classic");
        }
      }

      // Pixel
      let pixelGuesses = prev.pixelGuesses;
      if (!prev.solvedModes.includes("pixel")) {
        pixelGuesses = [...prev.pixelGuesses, key];
        if (isCorrect && !newSolvedModes.includes("pixel")) newSolvedModes.push("pixel");
      }

      // Gadget
      let gadgetGuesses = prev.gadgetGuesses;
      if (!prev.solvedModes.includes("gadget")) {
        gadgetGuesses = [...prev.gadgetGuesses, key];
        if (isCorrect && !newSolvedModes.includes("gadget")) newSolvedModes.push("gadget");
      }

      // Hypercharge
      let hyperchargeGuesses = prev.hyperchargeGuesses;
      if (!prev.solvedModes.includes("hypercharge")) {
        hyperchargeGuesses = [...prev.hyperchargeGuesses, key];
        if (isCorrect && !newSolvedModes.includes("hypercharge")) newSolvedModes.push("hypercharge");
      }

      const allSolved = newSolvedModes.length === 4;
      const outOfAttempts = newAttempts >= MAX_ATTEMPTS;
      const gameOver = allSolved || outOfAttempts;

      if (allSolved) {
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#fbbf24", "#34d399", "#60a5fa", "#a855f7"] });
      }

      return {
        ...prev,
        attempts: newAttempts,
        guessedNames: newGuessedNames,
        classicGuesses,
        pixelGuesses,
        gadgetGuesses,
        hyperchargeGuesses,
        solvedModes: newSolvedModes,
        gameOver,
      };
    });
  }, [state.guessedNames, state.gameOver]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = findExactMatchKey(input);
    if (key) { submitGuess(key); return; }
    if (suggestions.length === 1) { submitGuess(suggestions[0]); return; }
    setError("Select a brawler from the list.");
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "classic", label: "Classic" },
    { id: "pixel", label: "Pixel" },
    { id: "gadget", label: "Gadget" },
    { id: "hypercharge", label: "Hypercharge" },
  ];

  const attemptsLeft = MAX_ATTEMPTS - state.attempts;

  return (
    <div className="space-y-4">
      {/* Attempts counter */}
      <div className="flex justify-between items-center">
        <span className="text-white/50 text-sm">{attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left</span>
        <div className="flex gap-1">
          {tabs.map((t) => (
            <span key={t.id} className={`text-xs px-1.5 py-0.5 rounded ${state.solvedModes.includes(t.id) ? "bg-green-600/60 text-green-300" : "bg-white/10 text-white/40"}`}>
              {state.solvedModes.includes(t.id) ? "✓" : "○"}
            </span>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-t-lg ${tab === t.id ? "bg-gray-800 text-yellow-400" : "text-white/50 hover:text-white/70"} ${state.solvedModes.includes(t.id) ? "text-green-400" : ""}`}
          >
            {t.label} {state.solvedModes.includes(t.id) ? "✓" : ""}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-32">
        {tab === "classic" && (
          <div>
            {state.classicGuesses.length === 0 && !state.solvedModes.includes("classic") && (
              <p className="text-white/40 text-sm text-center py-4">Submit a guess to see stat comparisons.</p>
            )}
            {state.classicGuesses.length > 0 && (
              <div className="space-y-2">
                <div className="grid grid-cols-8 gap-1 text-xs text-white/40 px-1">
                  <div className="col-span-2">Brawler</div>
                  {(Object.keys(ATTRIBUTE_LABELS) as (keyof ClassicGuessAttributes)[]).map((k) => (
                    <div key={k} className="text-center">{ATTRIBUTE_LABELS[k]}</div>
                  ))}
                </div>
                {state.classicGuesses.map((g) => (
                  <div key={g.brawlerKey} className="grid grid-cols-8 gap-1 items-center">
                    <div className="col-span-2 flex items-center gap-1 text-xs">
                      <Image src={`/Brawlers/${g.brawlerKey.replace(/_/g, "-")}.webp`} alt="" width={24} height={24} className="rounded shrink-0" />
                      <span className="truncate text-white/70">{g.brawlerName}</span>
                    </div>
                    {(Object.keys(ATTRIBUTE_LABELS) as (keyof ClassicGuessAttributes)[]).map((k) => (
                      <Cell key={k} attr={g.attributes[k]} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "pixel" && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-white/20">
              <Image
                src={`/Brawlers/${state.secretKey.replace(/_/g, "-")}.webp`}
                alt="Mystery brawler"
                fill
                className="object-cover"
                style={{ filter: state.solvedModes.includes("pixel") ? "none" : `blur(${blurAmount}px)`, transform: "scale(1.05)" }}
              />
            </div>
            <p className="text-white/40 text-xs">{state.pixelGuesses.length} pixel guess{state.pixelGuesses.length !== 1 ? "es" : ""}</p>
          </div>
        )}

        {tab === "gadget" && (
          <div className="p-4 border border-yellow-400/20 rounded-xl bg-yellow-400/5">
            {gadgetEntry ? (
              <>
                <p className="text-yellow-400 font-semibold text-sm mb-1">Gadget: {gadgetEntry.gadgetName}</p>
                <p className="text-white/70 text-sm">{gadgetEntry.gadgetDescription}</p>
              </>
            ) : (
              <p className="text-white/40 text-sm">No gadget data available for this brawler.</p>
            )}
          </div>
        )}

        {tab === "hypercharge" && (
          <div className="p-4 border border-purple-400/20 rounded-xl bg-purple-400/5">
            {hyperchargeEntry ? (
              <>
                <p className="text-purple-300 font-semibold text-sm mb-1">⚡ Hypercharge: {hyperchargeEntry.hyperchargeName}</p>
                <p className="text-white/70 text-sm">{hyperchargeEntry.hyperchargeDescription}</p>
              </>
            ) : (
              <p className="text-white/40 text-sm">This brawler does not have a hypercharge.</p>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {!state.gameOver && (
        <div className="relative">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Guess the brawler…"
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
                  <button type="button" className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 text-white flex items-center gap-2" onClick={() => submitGuess(k)}>
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

      {/* Game over */}
      {state.gameOver && (
        <div className="text-center py-6 animate-fade-up space-y-3">
          {state.solvedModes.length === 4 ? (
            <p className="text-green-400 font-bold text-2xl">🏆 All 4 modes solved!</p>
          ) : (
            <p className="text-red-400 font-bold text-xl">Out of attempts!</p>
          )}
          <div className="flex justify-center">
            <Image src={`/Brawlers/${state.secretKey.replace(/_/g, "-")}.webp`} alt={getBrawlerDisplayName(state.secretKey)} width={100} height={100} className="rounded-xl border border-white/20" />
          </div>
          <p className="text-white/70 font-semibold">{getBrawlerDisplayName(state.secretKey)}</p>
          <p className="text-white/40 text-sm">{state.attempts} attempt{state.attempts !== 1 ? "s" : ""} used · {state.solvedModes.length}/4 modes solved</p>
          <button
            onClick={() => { setState(buildInitialState()); setInput(""); setSuggestions([]); setError(""); setTab("classic"); }}
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
