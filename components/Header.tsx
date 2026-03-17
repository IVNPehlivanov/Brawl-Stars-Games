"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ isHome = false }: { isHome?: boolean }) {
  const pathname = usePathname();
  const onHome = isHome || pathname === "/";

  if (onHome) return null;

  return (
    <header className="w-full px-4 py-3 flex items-center justify-start gap-4">
      <Link href="/" className="text-white/60 hover:text-white text-sm flex items-center gap-1">
        ← All Games
      </Link>
    </header>
  );
}
