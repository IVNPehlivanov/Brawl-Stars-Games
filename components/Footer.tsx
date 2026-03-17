"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GAME_META, SITE } from "@/lib/content";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="w-full border-t border-white/10 mt-16 py-8 px-4 text-sm text-white/50">
      {isHome ? (
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="font-brawl text-yellow-400 text-lg mb-2">Brawledly</p>
            <p className="text-xs">Daily Brawl Stars Wordle games</p>
          </div>
          <div>
            <p className="font-semibold text-white/70 mb-2">Games</p>
            <ul className="space-y-1">
              {GAME_META.map((g) => (
                <li key={g.slug}><Link href={`/${g.slug}`} className="hover:text-white transition-colors">{g.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white/70 mb-2">Info</p>
            <ul className="space-y-1">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {GAME_META.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="hover:text-white transition-colors">{g.title}</Link>
          ))}
        </div>
      )}

      {/* REQUIRED: Supercell fan content disclaimer — DO NOT REMOVE */}
      <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-white/10 text-xs text-center text-white/30">
        <p>
          Brawledly is not affiliated with, endorsed, sponsored, or specifically approved by Supercell.
          Brawl Stars content and materials are trademarks and copyrights of Supercell.
          This site is not official Supercell content — it is a fan-made project.{" "}
          <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
            Supercell Fan Content Policy
          </a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Brawledly · <a href={`mailto:${SITE.contactEmail}`} className="underline">{SITE.contactEmail}</a></p>
      </div>
    </footer>
  );
}
