import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import DailyGameGuard from "@/components/DailyGameGuard";
import DailyProgress from "@/components/DailyProgress";
import BackToAllGames from "@/components/BackToAllGames";
import GamePageBackground from "@/components/GamePageBackground";
import GameSchema from "@/components/seo/GameSchema";
import Link from "next/link";

const SLUG = "gadget";

export const metadata: Metadata = {
  title: "Guess the Gadget | Daily Brawl Stars Gadget Quiz | Brawledly",
  description: "Read the gadget description and guess which Brawl Stars brawler it belongs to. Daily quiz — free, no login required.",
  keywords: ["brawl stars gadget quiz", "guess the gadget brawl stars", "brawledly gadget"],
  alternates: { canonical: `${SITE.url}/${SLUG}` },
  openGraph: {
    title: "Guess the Gadget | Brawledly",
    description: "Read the gadget description and guess which brawler it belongs to.",
    url: `${SITE.url}/${SLUG}`,
    siteName: "Brawledly",
    images: [{ url: "/og/defaultogimage.webp" }],
  },
  twitter: { card: "summary_large_image" },
};

const FAQS = [
  { question: "How does Guess the Gadget work?", answer: "A gadget name and description are shown. Guess which brawler the gadget belongs to." },
  { question: "Do I need to know all gadget names?", answer: "Knowledge helps, but you can reason from the description. Gadgets often reflect the brawler's playstyle." },
  { question: "Is there a daily gadget puzzle?", answer: "Yes — one gadget is chosen each day at midnight UTC from the full pool of brawler gadgets." },
  { question: "What happens when I guess wrong?", answer: "Wrong guesses are tracked. The gadget clue stays on screen to help you narrow it down." },
];

export default function GadgetPage() {
  return (
    <GamePageBackground>
      <GameSchema
        slug={SLUG}
        title="Guess the Gadget"
        description="Which brawler has this gadget?"
        faqs={FAQS}
      />
      <BackToAllGames />
      <DailyProgress />

      <h1 className="font-brawl text-3xl text-yellow-400 text-center mt-6">Guess the Gadget</h1>
      <h2 className="text-center text-white/70 mb-4 text-lg">Which Brawler Has This Gadget?</h2>

      <DailyGameGuard slug={SLUG} />

      <section className="mt-16 space-y-8 text-sm text-white/60">
        <div>
          <h2 className="text-white/80 font-semibold text-base mb-3">How to Play</h2>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Read the gadget name and its description carefully.</li>
            <li>Type the name of the brawler you think owns that gadget.</li>
            <li>Wrong guesses are tallied — try to get it in as few as possible.</li>
            <li>The gadget clue remains on screen throughout the game.</li>
            <li>A new gadget is shown every day at midnight UTC.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white/80 font-semibold text-base mb-2">About Guess the Gadget</h2>
          <p>Gadgets are active abilities that Brawl Stars brawlers can equip. This mode tests whether you can match a gadget&apos;s effect to its brawler — from Shelly&apos;s Fast Forward dash to Dynamike&apos;s Fidget Spinner.</p>
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
            <Link href="/hypercharge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Hypercharge</Link>
            <Link href="/ultimate-challenge" className="px-3 py-1.5 border border-white/20 rounded-lg hover:border-yellow-400/50 hover:text-white transition-colors">Ultimate Challenge</Link>
          </div>
        </div>
      </section>
    </GamePageBackground>
  );
}
