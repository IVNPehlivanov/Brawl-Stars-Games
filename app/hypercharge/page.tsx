import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import DailyGameGuard from "@/components/DailyGameGuard";
import DailyProgress from "@/components/DailyProgress";
import BackToAllGames from "@/components/BackToAllGames";
import GamePageBackground from "@/components/GamePageBackground";
import GameSchema from "@/components/seo/GameSchema";
import Link from "next/link";

const SLUG = "hypercharge";

export const metadata: Metadata = {
  title: "Hypercharge Game | Guess the Brawler by Hypercharge | Brawldly",
  description: "Read the hypercharge ability description and guess which Brawl Stars brawler it belongs to. Daily quiz — free, no login.",
  keywords: ["brawl stars hypercharge quiz", "guess brawler hypercharge", "brawldly hypercharge"],
  alternates: { canonical: `${SITE.url}/${SLUG}` },
  openGraph: {
    title: "Hypercharge | Brawldly",
    description: "Read the hypercharge description and guess which brawler it belongs to.",
    url: `${SITE.url}/${SLUG}`,
    siteName: "Brawldly",
    images: [{ url: "/og/defaultogimage.webp" }],
  },
  twitter: { card: "summary_large_image" },
};

const FAQS = [
  { question: "What is the Hypercharge game?", answer: "A hypercharge name and description are shown. Guess which brawler the hypercharge belongs to." },
  { question: "Which brawlers are included?", answer: "Only brawlers who have a hypercharge ability are included in the pool." },
  { question: "How often does the puzzle reset?", answer: "A new hypercharge is selected every day at midnight UTC." },
  { question: "What if I don't know the hypercharge?", answer: "Use context clues from the description — hypercharges often amplify the brawler's Super in a unique way that hints at their identity." },
];

export default function HypercargePage() {
  return (
    <GamePageBackground>
      <GameSchema
        slug={SLUG}
        title="Hypercharge"
        description="Which brawler has this hypercharge ability?"
        faqs={FAQS}
      />
      <BackToAllGames />
      <DailyProgress />

      <h1 className="font-brawl text-3xl text-yellow-400 text-center mt-6">Hypercharge</h1>
      <h2 className="text-center text-white/70 mb-4 text-lg">Which Brawler Has This Hypercharge?</h2>

      <DailyGameGuard slug={SLUG} />

      <section className="mt-16 space-y-8 text-sm text-white/60">
        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">How to Play</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>A hypercharge name and its effect description are revealed.</li>
            <li>Type the brawler you think owns that hypercharge.</li>
            <li>Only brawlers with hypercharges are eligible answers.</li>
            <li>Wrong guesses are counted — aim for as few as possible.</li>
            <li>A new hypercharge puzzle drops every day at midnight UTC.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-2">About Hypercharge</h2>
          <p>Hypercharges are powerful ability upgrades in Brawl Stars that enhance a brawler&apos;s Super. This mode challenges you to match a hypercharge&apos;s description to its owner — perfect for experienced players who know the meta inside out.</p>
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
            <Link href="/ultimate-challenge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Ultimate Challenge</Link>
          </div>
        </div>
      </section>
    </GamePageBackground>
  );
}
