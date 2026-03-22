import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "About Brawldly | Fan-Made Brawl Stars Wordle Games",
  description: "Learn about Brawldly — the fan-made Brawl Stars daily Wordle puzzle site. Not affiliated with Supercell.",
  alternates: { canonical: `${SITE.url}/about-us` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-gray-950">
      <main className="max-w-2xl mx-auto px-4 py-12 text-white">
        <Header />
      <h1 className="text-3xl font-bold mb-4 text-yellow-400 font-title">About Brawldly</h1>
      <div className="space-y-4 text-white/70 leading-relaxed">
        <p>
          Brawldly is a fan-made Brawl Stars daily puzzle site. We are not affiliated with, endorsed by, or connected to Supercell in any way.
        </p>
        <p>
          New puzzles drop every day at midnight UTC across 4 game modes: Classic Wordle, Pixel Brawler, Guess the Gadget, and Hypercharge. The Ultimate Challenge is an endless mode available any time.
        </p>
        <p>
          All game state is stored locally in your browser — we collect no personal data and require no account or login.
        </p>
        <p>
          Brawldly is the Brawl Stars equivalent of <strong className="text-white/90">royaledly.com</strong>, which offers the same experience for Clash Royale.
        </p>
        <p>
          For questions or feedback, email us at{" "}
          <a href={`mailto:${SITE.contactEmail}`} className="text-yellow-400 hover:text-yellow-300 underline">{SITE.contactEmail}</a>.
        </p>
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/30">
          <p>
            Brawl Stars content and materials are trademarks and copyrights of Supercell.
            This site is fan-made content under the{" "}
            <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50">
              Supercell Fan Content Policy
            </a>.
          </p>
        </div>
      </div>
      </main>
    </div>
  );
}
