# Brawldly SEO Skill
## How to beat royaledle.com and dominate Brawl Stars search

This skill defines the SEO rules, priorities, and patterns to follow in every
conversation about brawldly.com.

---

## Our Structural Advantages (never break these)

1. **Next.js App Router with SSR** — every page delivers full HTML before JS runs.
   Keep the pattern: `page.tsx` (SSR shell + metadata) + `*Game.tsx` (client component).

2. **Per-page unique `metadata` exports** — every `page.tsx` must have its own
   `generateMetadata()` or `export const metadata` with unique `title`, `description`,
   `alternates.canonical`, and `openGraph` fields. Never reuse the layout default.

3. **AI crawlers are allowed** — `robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
   Never add Disallow rules for AI bots. royaledle.com blocks all of them — this is our #1 GEO advantage.

---

## Rules for Every Page

### Titles
- Format: `[Game-Specific Keyword] | [Secondary Keyword] | Brawldly`
- Must include the specific game mode name + a natural keyword
- 50–60 characters max
- Example: `Brawl Stars Wordle | Guess the Daily Brawler | Brawldly`

### Meta Descriptions
- Must be unique per page — no copy-paste from other pages
- 140–160 characters
- Must mention: the specific game mode, a key mechanic, and "Brawldly"
- Must include a soft call to action ("Play", "Guess", "Test your knowledge")

### Heading Structure (CRITICAL)
- Exactly ONE `<h1>` per page — the game's primary name
- The second line (game mechanic) must be `<h2>`, NOT a second `<h1>`
- Required structure for game pages:
  ```
  <h1>  [Game Name]        e.g. "Brawl Stars Wordle"
  <h2>  [Game Mechanic]    e.g. "Guess the Daily Brawler"
  <h2>  How to Play
  <h3>  [FAQ sub-questions]
  ```

### Canonical Tags
- Every page must have `alternates: { canonical: \`${SITE.url}/[slug]\` }` in its metadata

### Open Graph Tags
Every page must have in its metadata:
- `openGraph.title`, `openGraph.description`, `openGraph.url`, `openGraph.siteName`
- `openGraph.images` pointing to a real file (verify `public/og/defaultogimage.webp` exists at 1200×630px)

### Schema JSON-LD (competitor has NONE — this is our biggest advantage to build)
Every game page must have:
```json
{ "@type": "WebApplication", "name": "[Game Name]", "url": "https://brawldly.com/[slug]",
  "applicationCategory": "GameApplication", "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }
{ "@type": "BreadcrumbList", "itemListElement": [
  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brawldly.com" },
  { "@type": "ListItem", "position": 2, "name": "[Game Name]", "item": "https://brawldly.com/[slug]" }
]}
```
Use `components/seo/GameSchema.tsx` — it already handles all of this.

---

## AI Search Rules

1. **Never block AI crawlers** in `robots.ts`
2. **Create and maintain `public/llms.txt`** — add every new game page when launched
3. **Every game page must have a visible FAQ section** with at least 4 plain-text questions in real HTML (not inside a modal or JS-only). This feeds AI Overviews and Perplexity.
4. Write page descriptions as declarative statements, not questions — AI models cite declarations more reliably

---

## Internal Linking Rules

1. Every game page must have a "More Games" section above the footer with `<a href>` links to at least 3 other game pages
2. Homepage must link to every game page with descriptive anchor text
3. All links must be real `<a href="...">` anchors — not onClick handlers

---

## Sitemap Rules

Using Next.js `app/sitemap.ts`:
- Homepage: priority 1.0, changefreq: daily
- Game pages: priority 0.9, changefreq: daily
- About/Privacy/Terms: priority 0.5, changefreq: monthly
- Every new page must be added to `app/sitemap.ts` when created

---

## Content Depth Rules

Every game page must have server-rendered body text below the game UI:
1. How to Play — at least 4 bullet points
2. About [Game Mode] — 2–3 sentences
3. FAQ — 4 questions minimum (plain `<h3>` + `<p>` structure, NOT inside a modal)
4. More Games — links to other modes

This content must be in `page.tsx` (server component), NOT inside `*Game.tsx` (client component).

---

## Page-Level Checklist (run before every new page goes live)

- [ ] Unique `<title>` with game keyword + secondary keyword + "Brawldly"
- [ ] Unique `<meta description>` 140–160 chars, game-specific
- [ ] Exactly ONE `<h1>` matching the title keyword
- [ ] `<h2>` for game mechanic (second headline)
- [ ] `alternates.canonical` set to the page's own URL
- [ ] `openGraph.title`, `.description`, `.url`, `.images` all set
- [ ] `twitter.card: "summary_large_image"` set
- [ ] `<GameSchema>` component rendered in page.tsx
- [ ] Page URL added to `app/sitemap.ts`
- [ ] Page URL added to `public/llms.txt`
- [ ] At least 150 words of SSR body text below the game
- [ ] FAQ section with 4+ questions in real HTML
- [ ] "More Games" section with 3+ `<a href>` links

---

## Our SEO Baseline Status

| Item | Our status | Action |
|---|---|---|
| SSR | ✅ Next.js SSR | Maintain |
| Per-page titles | ✅ Unique per page | Maintain |
| Per-page meta desc | ✅ Unique per page | Maintain |
| Canonical tags | ✅ Set in metadata | Maintain |
| OG image | ❌ Need to add | Critical |
| Schema per page | ✅ GameSchema on all pages | Maintain |
| AI crawler access | ✅ All allowed | Never block |
| llms.txt | ❌ Need to create | High |
| FAQ content | ✅ Added to all game pages | Maintain |
| Internal links | ✅ "More Games" on all pages | Maintain |
| H1 structure | ✅ Correct H1/H2 | Maintain |

> **Note**: Competitor analysis has not been done yet. Run an SEO audit on Brawl Stars Wordle competitors before adding a competitor-gap.md.
