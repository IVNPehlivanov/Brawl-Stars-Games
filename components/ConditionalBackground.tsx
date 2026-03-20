"use client";

import { usePathname } from "next/navigation";

const NO_BACKGROUND_PATHS = ["/about-us", "/privacy-policy", "/terms-of-service"];

export default function ConditionalBackground() {
  const pathname = usePathname();
  if (NO_BACKGROUND_PATHS.includes(pathname ?? "")) return null;

  return (
    <>
      {/* File can be any size; cover + center scales/crops to the viewport — does not shift page layout */}
      <div
        className="fixed inset-0 z-0 min-h-screen min-h-[100dvh] w-full bg-cover bg-no-repeat bg-[50%_50%]"
        style={{ backgroundImage: "url('/Background/Background.webp')" }}
      />
      <div
        className="fixed inset-0 z-0 min-h-screen min-h-[100dvh] w-full bg-black/50 pointer-events-none"
        aria-hidden
      />
    </>
  );
}
