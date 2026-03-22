"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GAME_META, SITE } from "@/lib/content";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const INFO_PATHS = ["/", "/about-us", "/privacy-policy", "/terms-of-service"];

export default function Footer() {
  const pathname = usePathname();
  const showFullFooter = INFO_PATHS.includes(pathname);

  return (
    <footer className="relative z-20 mt-16 box-border w-full min-w-0 max-w-full shrink-0 py-8 text-sm text-white bg-transparent">
      <div className="mx-auto box-border w-full min-w-0 max-w-6xl px-4 sm:px-6">
      {showFullFooter ? (
        <div className="grid w-full min-w-0 grid-cols-1 gap-10 text-left md:grid-cols-[minmax(0,min(100%,32rem))_auto] md:justify-center md:gap-x-12 md:gap-y-0 md:items-start">
          <div className="min-w-0 font-brawl">
            <p className="text-white text-xl md:text-2xl mb-3">Brawldly</p>
            <p className="text-sm md:text-base text-white leading-relaxed">
              Brawldly offers daily and endless browser-based guessing games where you can test your knowledge of Brawl Stars. Play Wordle-style puzzles, try Higher-or-Lower, and track your scores.
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 text-sm md:text-base font-brawl text-blue-400 no-underline hover:text-blue-300"
            >
              <MailIcon className="h-4 w-4 shrink-0 opacity-90" />
              {SITE.contactEmail}
            </a>
          </div>
          <div className="flex flex-col gap-8 min-w-0 sm:flex-row sm:gap-8 md:gap-10">
            <div className="shrink-0">
              <p className="font-brawl text-white text-xl md:text-2xl mb-3">Games</p>
              <ul className="space-y-1.5 font-brawl text-base md:text-lg">
                {GAME_META.map((g) => (
                  <li key={g.slug}><Link href={`/${g.slug}`} className="text-white hover:text-white/90 transition-colors">{g.title}</Link></li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <p className="font-brawl text-white text-xl md:text-2xl mb-3">Info</p>
              <ul className="space-y-1.5 font-brawl text-base md:text-lg">
                <li><Link href="/about-us" className="text-white hover:text-white/90 transition-colors">About</Link></li>
                <li><Link href="/privacy-policy" className="text-white hover:text-white/90 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-white hover:text-white/90 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full min-w-0 max-w-4xl mx-auto flex-wrap gap-4 justify-center items-center">
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
      <div className="mt-8 pt-4 text-xs text-center text-white">
        <p className="text-white">© {new Date().getFullYear()} Brawldly. All rights reserved.</p>
        <p className="mt-3 max-w-2xl mx-auto">
          This material is unofficial and is not endorsed by Supercell. For more information see{" "}
          <a
            href="https://supercell.com/en/fan-content-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 no-underline"
          >
            Supercell&apos;s Fan Content Policy
          </a>
          .
        </p>
      </div>
      </div>
    </footer>
  );
}
