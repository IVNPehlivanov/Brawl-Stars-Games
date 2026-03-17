"use client";

import { usePathname } from "next/navigation";

const NO_BACKGROUND_PATHS = ["/about-us", "/privacy-policy", "/terms-of-service"];

export default function ConditionalBackground() {
  const pathname = usePathname();
  if (NO_BACKGROUND_PATHS.includes(pathname ?? "")) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-0 min-h-screen min-w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Background/Background.webp')" }}
      />
      <div
        className="fixed inset-0 z-0 min-h-screen min-w-full bg-black/50 pointer-events-none"
        aria-hidden
      />
    </>
  );
}
