"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ isHome = false }: { isHome?: boolean }) {
  const pathname = usePathname();
  const onHome = isHome || pathname === "/";

  return (
    <header className={`w-full px-4 py-3 flex items-center ${onHome ? "justify-between" : "justify-start gap-4"}`}>
      {onHome ? (
        <>
          <span className="font-brawl text-yellow-400 text-xl">Brawledly</span>
          <Link href="/classic" className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg text-sm hover:bg-yellow-300 transition-colors">
            Play Now
          </Link>
        </>
      ) : (
        <Link href="/" className="text-white/60 hover:text-white text-sm flex items-center gap-1">
          ← All Games
        </Link>
      )}
    </header>
  );
}
