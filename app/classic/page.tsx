import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import DailyGameGuard from "@/components/DailyGameGuard";
import DailyProgress from "@/components/DailyProgress";
import BackToAllGames from "@/components/BackToAllGames";
import GamePageBackground from "@/components/GamePageBackground";
import GameSchema from "@/components/seo/GameSchema";
import Link from "next/link";

const SLUG = "classic";

export const metadata: Metadata = {
  title: "Brawl Stars Wordle | Guess the Daily Brawler | Brawledly",
  description: "Guess today's mystery Brawl Stars brawler from stat clues. Daily Wordle-style game — free, no login. Rarity, class, speed, and more.",
  keywords: ["brawl stars wordle", "guess the brawler", "brawledly", "brawl stars game"],
  alternates: { canonical: `${SITE.url}/${SLUG}` },
  openGraph: {
    title: "Brawl Stars Wordle | Brawledly",
    description: "Guess the daily Brawl Stars brawler from stat clues. Free, no login.",
    url: `${SITE.url}/${SLUG}`,
    siteName: "Brawledly",
    images: [{ url: "/og/defaultogimage.webp" }],
  },
  twitter: { card: "summary_large_image" },
};

const FAQS = [
  { question: "How do I play Brawl Stars Wordle?", answer: "Type any brawler name to guess. Each guess reveals whether the mystery brawler matches on rarity, class, speed, attack range, and release year." },
  { question: "How many guesses do I get?", answer: "Unlimited guesses — but try to solve it in as few as possible to build your streak!" },
  { question: "What clues does it give?", answer: "6 attributes: rarity, class, movement speed, attack range, release year, and whether they have a hypercharge. Green = correct, arrows = higher/lower." },
  { question: "When does the puzzle reset?", answer: "Every day at midnight UTC. A new brawler is selected for all players worldwide." },
];

export default function ClassicPage() {
  return (
    <GamePageBackground>
      <GameSchema
        slug={SLUG}
        title="Brawl Stars Wordle"
        description="Guess the daily Brawl Stars brawler from stat clues"
        faqs={FAQS}
      />
      <BackToAllGames />
      <DailyProgress />

      <h1 className="font-brawl text-3xl text-yellow-400 text-center mt-6">Brawl Stars Wordle</h1>
      <h2 className="text-center text-white/70 mb-4 text-lg">Guess the Daily Brawler</h2>

      <DailyGameGuard slug={SLUG} />

      {/* SEO content — server rendered */}
      <section className="mt-16 space-y-8 text-sm text-white/60">
        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">How to Play</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Type any Brawl Stars brawler name in the search box and select it.</li>
            <li>Each guess reveals 6 stat clues: rarity, class, speed, attack range, release year, and hypercharge status.</li>
            <li>Green means the attribute matches exactly. An arrow means the secret brawler is higher or lower on that scale.</li>
            <li>Keep guessing until you find the brawler. You get unlimited guesses!</li>
            <li>A new brawler is chosen every day at midnight UTC — the same one for all players worldwide.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-2">About Brawl Stars Wordle</h2>
          <p>Brawledly&apos;s Classic mode is the Brawl Stars equivalent of the original Wordle — but instead of letters, you&apos;re matching brawler stats. It tests your knowledge of every brawler&apos;s rarity, movement class, and release history.</p>
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
            <Link href="/pixel" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Pixel Brawler</Link>
            <Link href="/gadget" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Guess the Gadget</Link>
            <Link href="/hypercharge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Hypercharge</Link>
            <Link href="/ultimate-challenge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Ultimate Challenge</Link>
          </div>
        </div>
      </section>
    </GamePageBackground>
  );
}
