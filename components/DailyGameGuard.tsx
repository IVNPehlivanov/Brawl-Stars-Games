"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getDayKey,
  hasPlayedToday,
  getPersistedGameState,
  clearPersistedGameState,
  setDevDayKey,
  getUTCDateString,
} from "@/lib/daily";
import { getBrawlerDisplayName } from "@/lib/brawler-stats";
import DailyResetTimer from "@/components/DailyResetTimer";
import NextModeLink from "@/components/NextModeLink";
import dynamic from "next/dynamic";

// Lazy-load game components to keep page shell fast
const ClassicGame = dynamic(() => import("@/app/classic/ClassicGame"));
const PixelGame = dynamic(() => import("@/app/pixel/PixelGame"));
const GadgetGame = dynamic(() => import("@/app/gadget/GadgetGame"));
const HyperchargeGame = dynamic(() => import("@/app/hypercharge/HyperchargeGame"));
const UltimateChallengeGame = dynamic(() => import("@/app/ultimate-challenge/UltimateChallengeGame"));

interface Props {
  slug: string;
}

interface PersistedState {
  secretKey?: string;
  guesses?: unknown[];
  won?: boolean;
}

export default function DailyGameGuard({ slug }: Props) {
  const [mounted, setMounted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [persistedState, setPersistedState] = useState<PersistedState | null>(null);
  const [dayKey, setDayKey] = useState("");
  const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";

  useEffect(() => {
    const key = getDayKey();
    setDayKey(key);
    const played = hasPlayedToday(slug);
    setHasPlayed(played);
    if (played) {
      const state = getPersistedGameState<PersistedState>(slug, key);
      setPersistedState(state);
    }
    setMounted(true);
  }, [slug]);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasPlayed) {
    const secretKey = persistedState?.secretKey ?? "";
    const guessCount = (persistedState?.guesses ?? []).length;

    return (
      <div className="text-center py-8 animate-fade-up">
        <p className="text-yellow-400 font-brawl text-2xl mb-2">Already played today!</p>
        {secretKey && (
          <div className="my-4">
            <Image
              src={`/Brawlers/${secretKey.replace(/_/g, "-")}.webp`}
              alt={getBrawlerDisplayName(secretKey)}
              width={120}
              height={120}
              className="mx-auto rounded-xl border border-white/10"
            />
            <p className="mt-2 text-white/70 font-semibold">{getBrawlerDisplayName(secretKey)}</p>
            {guessCount > 0 && (
              <p className="text-white/50 text-sm">Solved in {guessCount} {guessCount === 1 ? "guess" : "guesses"}</p>
            )}
          </div>
        )}
        <div className="mt-4">
          <DailyResetTimer />
        </div>
        <NextModeLink currentSlug={slug} />

        {/* Dev-only controls */}
        {isDev && (
          <div className="mt-8 p-3 border border-yellow-400/30 rounded-xl bg-yellow-400/5 space-y-2">
            <p className="text-yellow-400/70 text-xs font-mono">Dev tools</p>
            <button
              className="block w-full text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 transition-colors"
              onClick={() => {
                clearPersistedGameState(slug, dayKey);
                // Remove from played
                try {
                  const raw = localStorage.getItem("brawledly_daily_played");
                  const data: Record<string, string[]> = raw ? JSON.parse(raw) : {};
                  if (data[dayKey]) {
                    data[dayKey] = data[dayKey].filter((s) => s !== slug);
                    localStorage.setItem("brawledly_daily_played", JSON.stringify(data));
                  }
                } catch { /* ignore */ }
                window.location.reload();
              }}
            >
              Play again (reset today)
            </button>
            <button
              className="block w-full text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 transition-colors"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
                setDevDayKey(getUTCDateString(tomorrow));
                window.location.reload();
              }}
            >
              Next day (advance UTC date)
            </button>
            <button
              className="block w-full text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 transition-colors"
              onClick={() => {
                setDevDayKey(null);
                window.location.reload();
              }}
            >
              Reset to today
            </button>
          </div>
        )}
      </div>
    );
  }

  // Render the game
  const onSolved = () => {
    setHasPlayed(true);
    const state = getPersistedGameState<PersistedState>(slug, dayKey);
    setPersistedState(state);
  };

  switch (slug) {
    case "classic":
      return <ClassicGame dayKey={dayKey} onSolved={onSolved} />;
    case "pixel":
      return <PixelGame dayKey={dayKey} onSolved={onSolved} />;
    case "gadget":
      return <GadgetGame dayKey={dayKey} onSolved={onSolved} />;
    case "hypercharge":
      return <HyperchargeGame dayKey={dayKey} onSolved={onSolved} />;
    case "ultimate-challenge":
      return <UltimateChallengeGame />;
    default:
      return <p className="text-white/50 text-center">Unknown game mode.</p>;
  }
}
