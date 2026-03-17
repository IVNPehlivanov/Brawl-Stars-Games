/**
 * scrape-hypercharge-descriptions.mjs
 *
 * Scrapes hypercharge descriptions from https://brawlstars.fandom.com/wiki/{BrawlerName}
 * and fills in the hyperchargeDescription fields in lib/brawler-stats.ts.
 *
 * Usage:
 *   node scripts/scrape-hypercharge-descriptions.mjs
 *
 * Requires playwright (already installed if you ran scrape-wiki-stats.mjs):
 *   npm install -D playwright && npx playwright install chromium --with-deps
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Key → wiki URL slug ───────────────────────────────────────────────────────
function keyToWikiSlug(key) {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("_")
    .replace(/^Mr_P$/, "Mr._P")
    .replace(/^Eight_Bit$/, "8-Bit")
    .replace(/^Larry_And_Lawrie$/, "Larry_%26_Lawrie")
    .replace(/^R_T$/, "R-T")
    .replace(/^Jae_Yong$/, "Jae-Yong");
}

// ── Load entries needing descriptions from brawler-stats.ts ──────────────────
function loadHyperchargePool() {
  const src = fs.readFileSync(path.join(ROOT, "lib", "brawler-stats.ts"), "utf8");
  const entries = [];
  // Match entries that have a hyperchargeName but null or empty hyperchargeDescription
  const re = /^\s{2}(\w+):\s*\{[^}]*hyperchargeName:\s*"([^"]+)",\s*hyperchargeDescription:\s*(null|"")\s*\}/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    entries.push({ brawlerKey: m[1], hyperchargeName: m[2], hyperchargeDescription: "" });
  }
  return entries;
}

// ── Write a single description back into brawler-stats.ts ────────────────────
function saveDescription(brawlerKey, description) {
  const statsPath = path.join(ROOT, "lib", "brawler-stats.ts");
  let src = fs.readFileSync(statsPath, "utf8");
  // Replace hyperchargeDescription: null or "" for this specific brawler key
  src = src.replace(
    new RegExp(`(\\s{2}${brawlerKey}:\\s*\\{[^}]*hyperchargeName:\\s*"[^"]*",\\s*hyperchargeDescription:\\s*)(?:null|"[^"]*")(\\s*\\})`),
    `$1${JSON.stringify(description)}$2`
  );
  fs.writeFileSync(statsPath, src);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  let chromium;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    console.error("Playwright not installed. Run:");
    console.error("  npm install -D playwright && npx playwright install chromium --with-deps");
    process.exit(1);
  }

  const entries = loadHyperchargePool();
  const toScrape = entries.filter((e) => !e.hyperchargeDescription);
  console.log(`${entries.length} total hypercharges, ${toScrape.length} need descriptions\n`);

  if (toScrape.length === 0) {
    console.log("Nothing to do — all descriptions already filled.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });

  let filled = 0;
  let failed = 0;

  for (const entry of toScrape) {
    const slug = keyToWikiSlug(entry.brawlerKey);
    const url = `https://brawlstars.fandom.com/wiki/${slug}`;

    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

      const desc = await page.evaluate(() => {
        // The hypercharge section has a heading like "Hypercharge: Name"
        // The description is in a <blockquote> or italic <p> right after it
        const headings = document.querySelectorAll("h2, h3, h4, .mw-headline");
        for (const h of headings) {
          const txt = h.textContent.trim().toLowerCase();
          if (!txt.startsWith("hypercharge")) continue;

          // Look for the description in the next ~5 sibling elements
          let el = h.closest("h2, h3, h4") ?? h;
          el = el.nextElementSibling;
          for (let i = 0; i < 8 && el; i++) {
            const tagName = el.tagName.toLowerCase();

            // <blockquote> — most common format on fandom
            if (tagName === "blockquote") {
              const text = el.textContent.trim().replace(/^[""]|[""]$/g, "").trim();
              if (text.length > 10) return text;
            }

            // <p> containing italic text (the quoted description)
            if (tagName === "p") {
              const italic = el.querySelector("i");
              if (italic) {
                const text = italic.textContent.trim().replace(/^[""]|[""]$/g, "").trim();
                if (text.length > 10) return text;
              }
              // Sometimes the description is directly in <p> wrapped in quotes
              const text = el.textContent.trim();
              if (text.startsWith('"') || text.startsWith('\u201c')) {
                return text.replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "").trim();
              }
            }

            // <div> containing a blockquote or italic (some wiki templates wrap in divs)
            if (tagName === "div") {
              const inner = el.querySelector("blockquote, i");
              if (inner) {
                const text = inner.textContent.trim().replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, "").trim();
                if (text.length > 10) return text;
              }
            }

            // Stop if we hit another heading
            if (["h2", "h3", "h4"].includes(tagName)) break;

            el = el.nextElementSibling;
          }
        }
        return null;
      });

      await page.close();

      if (desc) {
        saveDescription(entry.brawlerKey, desc);
        console.log(`  ✓ ${entry.brawlerKey.padEnd(20)} "${entry.hyperchargeName}" → "${desc.slice(0, 60)}…"`);
        filled++;
      } else {
        console.log(`  ⚠ ${entry.brawlerKey.padEnd(20)} description not found on wiki`);
        failed++;
      }

      await new Promise((r) => setTimeout(r, 600));
    } catch (e) {
      console.log(`  ✗ ${entry.brawlerKey}: ${e.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n✓ lib/brawler-stats.ts updated`);
  console.log(`  filled: ${filled}, failed/not found: ${failed}`);
  if (failed > 0) {
    console.log("\nFor missing ones, check the wiki manually and add descriptions directly to");
    console.log("lib/brawler-hypercharges.ts — then re-run this script to fill remaining ones.");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
