import type { Metadata } from "next";
import { SITE, GAME_META } from "@/lib/content";
import HomeInfographic from "@/components/HomeInfographic";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Brawledly — Daily Brawl Stars Wordle Games",
  description: "5 daily Brawl Stars Wordle-style mini-games. Guess the Brawler, Gadget, Hypercharge, and more. Free, no login.",
  alternates: { canonical: SITE.url },
  openGraph: { images: [{ url: "/og/defaultogimage.webp" }] },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Content */}
      <div className="relative z-10 w-full">
        <Header isHome />
        <section className="flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
          <h1 className="font-brawl text-5xl md:text-7xl homepage-text-shadow text-yellow-400 mb-3">
            Brawledly
          </h1>
          <p className="text-lg md:text-2xl text-white/90 homepage-text-shadow max-w-xl">
            Daily Brawl Stars Wordle Games
          </p>
          <p className="mt-2 text-sm text-white/60">
            {GAME_META.filter((g) => g.mode === "daily").length} daily games · resets at midnight UTC
          </p>
        </section>
        <HomeInfographic />
      </div>
    </main>
  );
}
