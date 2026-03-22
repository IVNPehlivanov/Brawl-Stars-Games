import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import GamePageBackground from "@/components/GamePageBackground";
import BackToAllGames from "@/components/BackToAllGames";
import GameSchema from "@/components/seo/GameSchema";
import Link from "next/link";
import dynamic from "next/dynamic";

const UltimateChallengeGame = dynamic(() => import("./UltimateChallengeGame"), { ssr: false });

const SLUG = "ultimate-challenge";

export const metadata: Metadata = {
  title: "Ultimate Challenge | All 4 Brawl Stars Modes in One | Brawldly",
  description: "The ultimate Brawl Stars quiz: all 4 game modes combined, one brawler, 25 attempts. Endless mode — play any time, no daily limit.",
  keywords: ["brawl stars ultimate challenge", "brawldly ultimate", "brawl stars all modes"],
  alternates: { canonical: `${SITE.url}/${SLUG}` },
  openGraph: {
    title: "Ultimate Challenge | Brawldly",
    description: "All 4 modes combined — one brawler, 25 attempts. Endless mode.",
    url: `${SITE.url}/${SLUG}`,
    siteName: "Brawldly",
    images: [{ url: "/og/defaultogimage.webp" }],
  },
  twitter: { card: "summary_large_image" },
};

const FAQS = [
  { question: "What is Ultimate Challenge?", answer: "All 4 game modes (Classic, Pixel, Gadget, Hypercharge) combined into one. You must identify the same brawler across all 4 clue types using 25 total attempts." },
  { question: "Is Ultimate Challenge a daily game?", answer: "No — it is endless mode. You can replay it as many times as you like. A new random brawler is chosen each run." },
  { question: "How are the 25 attempts shared?", answer: "All guesses across all 4 modes come from the same pool of 25 attempts. Solve modes early to conserve attempts." },
  { question: "What happens if I run out of attempts?", answer: "The game ends and the brawler is revealed. You can immediately start a new run." },
];

export default function UltimateChallengePage() {
  return (
    <GamePageBackground>
      <GameSchema
        slug={SLUG}
        title="Ultimate Challenge"
        description="All 4 modes combined — one brawler, 25 attempts"
        faqs={FAQS}
      />
      <BackToAllGames />

      <h1 className="font-brawl text-3xl text-yellow-400 text-center mt-6">Ultimate Challenge</h1>
      <h2 className="text-center text-white/70 mb-4 text-lg">All 4 Modes · One Brawler · 25 Attempts</h2>

      <UltimateChallengeGame />

      <section className="mt-16 space-y-8 text-sm text-white/60">
        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">How to Play</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>A single random brawler is chosen as the target.</li>
            <li>All 4 game modes are shown simultaneously: Classic stats, Pixel portrait, Gadget, and Hypercharge.</li>
            <li>You have 25 total guesses shared across all modes.</li>
            <li>Each correct mode solve unlocks that section. Try to solve all 4!</li>
            <li>This is endless mode — you can play as many times as you want.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-2">About Ultimate Challenge</h2>
          <p>Ultimate Challenge is the hardest mode on Brawldly. It combines all four daily puzzle types into a single run against one target brawler. Only the most knowledgeable Brawl Stars fans can solve all 4 modes in one attempt.</p>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-white/70 font-medium">{faq.question}</h3>
                <p className="mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">More Games</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/classic" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Classic Wordle</Link>
            <Link href="/pixel" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Pixel Brawler</Link>
            <Link href="/gadget" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Guess the Gadget</Link>
            <Link href="/hypercharge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Hypercharge</Link>
          </div>
        </div>
      </section>
    </GamePageBackground>
  );
}
