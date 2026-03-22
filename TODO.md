# Brawldly TODO

## Critical (do first — project won't work without these)
- [ ] Add og:image (public/og/defaultogimage.webp — 1200×630px)
- [ ] Add 5 game logos to public/Game-Logos/ (Classic, Pixel, Gadget, Hypercharge, Ultimate-Challenge)
- [ ] Add brawler portraits to public/Brawlers/ (one WebP per brawler)
- [x] Self-hosted display font in public/Fonts/ (wired in globals.css)
- [ ] Add hero background to public/homepage/background.webp

## High Priority — Content Data
- [ ] Fill brawler-stats.ts with 60+ brawlers (stats: rarity, class, speed, attackRange, releaseYear, hasHypercharge)
- [ ] Fill brawler-gadgets.ts with real gadget names + descriptions (one per brawler)
- [ ] Fill brawler-hypercharges.ts with real hypercharge names + descriptions

## High Priority — SEO
- [ ] Verify GameSchema renders correctly on all 4 daily game pages
- [ ] Create public/llms.txt listing all game URLs
- [ ] Add FAQ section (SSR, in page.tsx) to all game pages (4+ questions each)
- [ ] Add "More Games" section with <a href> links to all game pages
- [ ] Verify public/og/defaultogimage.webp exists and is 1200×630px

## Medium Priority
- [ ] Add DailyProgress component to all game pages
- [ ] Add StreakBadge component
- [ ] Add DailyResetTimer to AlreadyPlayedSummary in DailyGameGuard
- [ ] Test seed consistency: same brawler shows for all users on same UTC date
- [ ] Mobile responsiveness pass on HomeInfographic SVG

## Future Games (backlog)
- [ ] Star Power game — guess brawler from star power description
- [ ] Sound game — guess brawler from their in-game sound (if audio assets available)

## Completed
- [x] Privacy Policy: exact template copy (Royaledly→Brawldly, SITE email), no extra clauses
- [x] Global rebrand: Brawldly + brawldly.com + contact@brawldly.com (SITE defaults, copy, llms.txt, localStorage `brawldly_` prefix)
- [x] Terms of Service page rewritten (Brawldly + Brawl Stars, full 12 sections, SITE name/email)
- [x] HomeInfographic: game tiles same size as center logo (shared TILE_SIZE + layout)
- [x] Hero display font loaded from public/Fonts/ (Brawl Stars CSS family + homepage tagline uses font-brawl)
- [x] Initial scaffold created (BRAWL_SCAFFOLD.md)
- [x] All project files created from scaffold spec
- [x] FAQ sections added to all game pages (SSR in page.tsx)
- [x] "More Games" sections added to all game pages
