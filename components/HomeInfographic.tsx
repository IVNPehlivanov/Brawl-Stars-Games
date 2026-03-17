"use client";
import Link from "next/link";
import { GAME_META } from "@/lib/content";

const CENTER = { x: 300, y: 300 };
const RADIUS = 200;
const NODE_R = 60;
const ANGLES = [270, 342, 54, 126, 198]; // degrees, clockwise from top

function toLogoPath(slug: string): string {
  return `/Game-Logos/${slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("-")}.webp`;
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
      <svg viewBox="0 0 600 600" className="w-full max-w-lg" aria-label="Game modes">
        {/* Connector lines */}
        {nodes.map((n) => {
          const dx = n.x - CENTER.x;
          const dy = n.y - CENTER.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ex = CENTER.x + (dx / dist) * NODE_R;
          const ey = CENTER.y + (dy / dist) * NODE_R;
          return (
            <line key={n.slug} x1={ex} y1={ey} x2={n.x} y2={n.y}
              stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" />
          );
        })}
        {/* Center node */}
        <circle cx={CENTER.x} cy={CENTER.y} r={NODE_R} fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.5)" strokeWidth="2" />
        <text x={CENTER.x} y={CENTER.y + 6} textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">BRAWLEDLY</text>
        {/* Game nodes */}
        {nodes.map((n) => (
          <Link key={n.slug} href={`/${n.slug}`}>
            <circle cx={n.x} cy={n.y} r={NODE_R} fill="rgba(30,30,50,0.9)" stroke="rgba(251,191,36,0.6)" strokeWidth="2"
              className="cursor-pointer hover:stroke-yellow-400 transition-all" />
            <image href={toLogoPath(n.slug)}
              x={n.x - 24} y={n.y - 24} width="48" height="48" />
            <text x={n.x} y={n.y + NODE_R + 16} textAnchor="middle" fill="white" fontSize="10">{n.title}</text>
          </Link>
        ))}
      </svg>
    </section>
  );
}
