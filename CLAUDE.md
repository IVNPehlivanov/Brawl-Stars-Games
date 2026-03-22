# Brawldly — Claude Context

## What This Project Is
Brawldly (brawldly.com) is an unofficial Brawl Stars fan site with 5 Wordle-style daily puzzle and endless mini-games. No accounts, no server — all game state lives in localStorage. Daily brawlers are seeded deterministically by UTC date + game slug.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15+ (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript |
| Fonts | Geist, Geist Mono (via `next/font/google`) + Brawl Stars (TTF, self-hosted in `/public/fonts/`) |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| Deployment | Vercel |
| State | localStorage only — no DB, no auth, no API routes |
| Image format | WebP |

## Folder Structure
```
brawl-puzzle/
├── app/
│   ├── layout.tsx      ← root layout: fonts, metadata, Footer, Analytics
│   ├── page.tsx        ← homepage: HomeInfographic + hero
│   ├── classic/        ← daily: guess brawler from stat clues
│   ├── pixel/          ← daily: guess brawler from pixelated portrait
│   ├── gadget/         ← daily: guess brawler from gadget name + description
│   ├── hypercharge/    ← daily: guess brawler from hypercharge name + description
│   ├── ultimate-challenge/ ← endless: all 4 modes, one brawler, 25 attempts
│   ├── about-us/
│   ├── privacy-policy/
│   └── terms-of-service/
├── components/
│   ├── seo/
│   │   └── GameSchema.tsx  ← JSON-LD schema (must be used in every game page)
│   ├── HomeInfographic.tsx
│   ├── DailyGameGuard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── content.ts          ← SITE config, GAME_META array, getGameLogoPath
│   ├── daily.ts            ← daily seed logic, localStorage read/write
│   ├── brawler-stats.ts    ← Classic game brawler pool + stats
│   ├── brawler-gadgets.ts  ← Gadget game pool
│   ├── brawler-hypercharges.ts ← Hypercharge game pool
│   └── streakManager.ts
├── public/
│   ├── Brawlers/       ← brawler portrait WebP images
│   ├── Game-Logos/     ← 5 game mode logos (WebP)
│   ├── fonts/          ← BrawlStars.ttf
│   ├── homepage/       ← background.webp hero image
│   └── og/             ← defaultogimage.webp (1200×630)
└── next.config.ts
```

## Working Rules
- **Always update `TODO.md`** after completing any task — mark items as `[x]` as soon as they are done
- **Always update the "Completed Tasks" section** at the bottom of this file when a task is finished
- **Always update "What's Being Worked On"** if focus shifts to a new area
- At the start of any SEO-related session, read `.claude/skills/SEO_SKILL.md` before touching any code

---

## Key Rules & Constraints
- **Unofficial fan content** — footer must always include Supercell disclaimer. Never remove it.
- **No accounts / no backend** — all state (played today, streak, game progress) is in `localStorage`. Do not introduce server-side state or auth.
- **Daily seed logic** — `lib/daily.ts` uses `dayKey + "_" + gameSlug` as seed. Changing this string changes every user's daily brawler. Be careful.
- **localStorage prefix is `brawldly_`** — never use `royaledly_` or any other prefix.
- **`GameSchema` must be used on every game page** — import from `components/seo/GameSchema.tsx`.
- **One `<h1>` per game page** — the second headline must be `<h2>`, not a second `<h1>`. No double-H1.
- **All brawler image paths**: `/Brawlers/{Key-With-Dashes}.webp` — underscore keys become dash filenames (e.g. `el_primo` → `El-Primo.webp`).

## Environment Variables
| Var | Default | Purpose |
|-----|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://brawldly.com` | Canonical URL for metadata + sitemap |
| `NEXT_PUBLIC_SITE_NAME` | `Brawldly` | Site name in OG tags |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contact@brawldly.com` | Used in footer/privacy |

## SEO Status
- See `.claude/skills/SEO_SKILL.md` for all SEO rules
- No competitor analysis done yet — run a full audit before creating a competitor-gap.md
- Top 3 open SEO tasks: add `og:image`, use `GameSchema` on all game pages, add `llms.txt`

## What's Being Worked On
**Primary goal: launch Brawldly and achieve SEO parity with (then surpass) royaledle.com.**

**Active focus areas:**
1. Initial project setup — get all pages rendering with correct data
2. Add all brawler data (stats, gadgets, hypercharges) to lib/ files
3. Critical SEO: og:image, GameSchema on all pages, llms.txt

## Completed Tasks
- [x] Privacy Policy: standard six-section template (Brawldly / SITE.contactEmail only)
- [x] Rebrand to Brawldly (display name, domain, email, `brawldly_` localStorage prefix)
- [x] Terms of Service: full legal copy (Brawldly, Brawl Stars / Supercell disclaimer, SITE.contactEmail)
- [x] HomeInfographic: game tile logos match center logo size (shared dimensions + SVG scale)
- [x] Initial scaffold created (BRAWL_SCAFFOLD.md)
- [x] All project files created from scaffold spec
