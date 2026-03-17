"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GAME_META, SITE } from "@/lib/content";

const INFO_PATHS = ["/", "/about-us", "/privacy-policy", "/terms-of-service"];

export default function Footer() {
  const pathname = usePathname();
  const showFullFooter = INFO_PATHS.includes(pathname);

  return (
    <footer className="relative z-20 w-full mt-16 py-8 px-4 text-sm text-white bg-transparent">
      {showFullFooter ? (
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Link href="/" className="font-title text-white text-lg mb-2 block hover:text-white/90 transition-colors">Brawledly</Link>
            <p className="text-xs text-white">Daily Brawl Stars Wordle games</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Games</p>
            <ul className="space-y-1">
              {GAME_META.map((g) => (
                <li key={g.slug}><Link href={`/${g.slug}`} className="text-white hover:text-white/90 transition-colors">{g.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Info</p>
            <ul className="space-y-1">
              <li><Link href="/about-us" className="text-white hover:text-white/90 transition-colors">About</Link></li>
              <li><Link href="/privacy-policy" className="text-white hover:text-white/90 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-white hover:text-white/90 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center items-center">
          <Link href="/" className="text-white hover:text-white/90 transition-colors">All Games</Link>
          <span className="text-white/50">·</span>
          {GAME_META.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="text-white hover:text-white/90 transition-colors">{g.title}</Link>
          ))}
          <span className="text-white/50">·</span>
          <Link href="/about-us" className="text-white hover:text-white/90 transition-colors">About</Link>
          <Link href="/privacy-policy" className="text-white hover:text-white/90 transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-white hover:text-white/90 transition-colors">Terms of Service</Link>
        </div>
      )}

      {/* REQUIRED: Supercell fan content disclaimer — DO NOT REMOVE */}
      <div className="max-w-4xl mx-auto mt-6 pt-4 text-xs text-center text-white">
        <p>
          Brawledly is not affiliated with, endorsed, sponsored, or specifically approved by Supercell.
          Brawl Stars content and materials are trademarks and copyrights of Supercell.
          This site is not official Supercell content — it is a fan-made project.{" "}
          <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/90">
            Supercell Fan Content Policy
          </a>
        </p>
        <p className="mt-2 text-white">© {new Date().getFullYear()} Brawledly · <a href={`mailto:${SITE.contactEmail}`} className="text-white underline">{SITE.contactEmail}</a></p>
      </div>
    </footer>
  );
}
