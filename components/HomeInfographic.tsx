"use client";
import Link from "next/link";
import { GAME_META } from "@/lib/content";

/** Larger canvas so full-size tiles don’t clip */
const VIEW = 1000;
const CENTER = { x: VIEW / 2, y: VIEW / 2 };
/** Orbit radius — spaced for 240×240 tiles */
const RADIUS = 300;
/** Center + game logos share the same size (SVG units) */
const TILE_SIZE = 240;
const ANGLES = [270, 342, 54, 126, 198]; // degrees, clockwise from top

/** Home infographic tiles — files in /public/Logos/ (Ultimate uses file spelling "Challange") */
const LOGO_BY_SLUG: Record<string, string> = {
  classic: "/Logos/Classic.webp",
  pixel: "/Logos/Pixel.webp",
  gadget: "/Logos/Gadget.webp",
  hypercharge: "/Logos/Hypercharge.webp",
  "ultimate-challenge": "/Logos/Ultimate-Challange.webp",
};

function homeLogoPath(slug: string): string {
  return LOGO_BY_SLUG[slug] ?? `/Logos/Classic.webp`;
}

export default function HomeInfographic() {
  const nodes = GAME_META.map((game, i) => {
    const angle = (ANGLES[i] * Math.PI) / 180;
    return {
      ...game,
      x: CENTER.x + RADIUS * Math.cos(angle),
      y: CENTER.y + RADIUS * Math.sin(angle),
    };
  });

  return (
    <section className="w-full flex justify-center py-8 px-4">
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full max-w-2xl" aria-label="Game modes">
        {/* Center logo */}
        <image
          href="/Logos/Logo.webp"
          x={CENTER.x - TILE_SIZE / 2}
          y={CENTER.y - TILE_SIZE / 2}
          width={TILE_SIZE}
          height={TILE_SIZE}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        />
        {/* Game nodes */}
        {nodes.map((n) => (
          <Link key={n.slug} href={`/${n.slug}`} className="cursor-pointer">
            <image
              href={homeLogoPath(n.slug)}
              x={n.x - TILE_SIZE / 2}
              y={n.y - TILE_SIZE / 2}
              width={TILE_SIZE}
              height={TILE_SIZE}
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x={n.x}
              y={n.y + TILE_SIZE / 2 + 22}
              textAnchor="middle"
              fill="white"
              fontSize="18"
              className="font-brawl"
            >
              {n.title}
            </text>
          </Link>
        ))}
      </svg>
    </section>
  );
}
