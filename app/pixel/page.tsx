import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import DailyGameGuard from "@/components/DailyGameGuard";
import DailyProgress from "@/components/DailyProgress";
import BackToAllGames from "@/components/BackToAllGames";
import GamePageBackground from "@/components/GamePageBackground";
import GameSchema from "@/components/seo/GameSchema";
import Link from "next/link";

const SLUG = "pixel";

export const metadata: Metadata = {
  title: "Pixel Brawler | Guess from the Pixelated Portrait | Brawldly",
  description: "Identify the daily Brawl Stars brawler from a pixelated portrait. Each wrong guess reveals a clearer image. Free, no login.",
  keywords: ["brawl stars pixel game", "guess brawler image", "brawldly pixel"],
  alternates: { canonical: `${SITE.url}/${SLUG}` },
  openGraph: {
    title: "Pixel Brawler | Brawldly",
    description: "Identify the brawler from a pixelated portrait. Each wrong guess reveals more.",
    url: `${SITE.url}/${SLUG}`,
    siteName: "Brawldly",
    images: [{ url: "/og/defaultogimage.webp" }],
  },
  twitter: { card: "summary_large_image" },
};

const FAQS = [
  { question: "How does Pixel Brawler work?", answer: "A brawler portrait is shown heavily pixelated. Guess the brawler name — each wrong guess reduces the blur, revealing the image more clearly." },
  { question: "How many guesses until the image is fully clear?", answer: "The image starts at maximum blur and becomes clearer with each wrong guess, reaching full clarity after 5 wrong guesses." },
  { question: "Is the brawler the same for everyone?", answer: "Yes — the daily pixel brawler is seeded by UTC date and is identical for all players." },
  { question: "Can I play again after solving?", answer: "The daily puzzle resets at midnight UTC. You can play the Ultimate Challenge mode any time for endless practice." },
];

export default function PixelPage() {
  return (
    <GamePageBackground>
      <GameSchema
        slug={SLUG}
        title="Pixel Brawler"
        description="Identify the brawler from a pixelated portrait"
        faqs={FAQS}
      />
      <BackToAllGames />
      <DailyProgress />

      <h1 className="font-brawl text-3xl text-yellow-400 text-center mt-6">Pixel Brawler</h1>
      <h2 className="text-center text-white/70 mb-4 text-lg">Guess from the Pixelated Portrait</h2>

      <DailyGameGuard slug={SLUG} />

      <section className="mt-16 space-y-8 text-sm text-white/60">
        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">How to Play</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>A brawler portrait is shown at maximum pixelation.</li>
            <li>Type a brawler name and submit your guess.</li>
            <li>Each wrong guess reduces the blur — the image gets clearer over time.</li>
            <li>Identify the brawler as quickly as possible for the best score!</li>
            <li>Puzzle resets daily at midnight UTC.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-2">About Pixel Brawler</h2>
          <p>Pixel Brawler tests your visual recognition of Brawl Stars character art. Only the sharpest brawler fans can identify their favourite characters from a blurry mess of pixels.</p>
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
            <Link href="/gadget" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Guess the Gadget</Link>
            <Link href="/hypercharge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Hypercharge</Link>
            <Link href="/ultimate-challenge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Ultimate Challenge</Link>
          </div>
        </div>
      </section>
    </GamePageBackground>
  );
}
