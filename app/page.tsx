import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import HomeInfographic from "@/components/HomeInfographic";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Brawldly — Daily Brawl Stars Wordle Games",
  description: "5 daily Brawl Stars Wordle-style mini-games. Guess the Brawler, Gadget, Hypercharge, and more. Free, no login.",
  alternates: { canonical: SITE.url },
  openGraph: { images: [{ url: "/og/defaultogimage.webp" }] },
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full min-w-0 max-w-full flex-col items-stretch overflow-x-hidden">
      {/* Content — stretch full width; center pieces inside where needed */}
      <div className="relative z-10 w-full min-w-0 max-w-full">
        <Header isHome />
        <section className="flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
          <h1 className="font-brawl text-5xl md:text-7xl homepage-text-shadow text-yellow-400 mb-3">
            Brawldly
          </h1>
          <p className="font-brawl text-lg md:text-2xl text-white/90 homepage-text-shadow max-w-xl">
            Daily Brawl Stars Wordle Games
          </p>
        </section>
        <HomeInfographic />
      </div>
    </main>
  );
}
