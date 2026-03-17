/**
 * scrape-wiki-stats.mjs
 *
 * Scrapes Movement Speed, Attack Range, Reload, and Release Year for every brawler
 * from https://brawlstars.fandom.com/wiki/{BrawlerName} using Playwright (headless Chromium).
 * Outputs scripts/wiki-stats.json, then re-invokes generate-data.mjs to apply the values.
 *
 * Setup (one-time):
 *   cd brawl-puzzle
 *   npm install -D playwright
 *   npx playwright install chromium --with-deps
 *
 * Usage:
 *   node scripts/scrape-wiki-stats.mjs
 *
 * After it finishes:
 *   node scripts/generate-data.mjs   ← re-run to apply scraped values
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Image download helper ─────────────────────────────────────────────────────
function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(destPath);
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(destPath, () => {});
        downloadFile(res.headers.location, destPath).then(resolve);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(true); });
    }).on("error", () => { file.close(); fs.unlink(destPath, () => {}); resolve(false); });
  });
}

// ── Load brawler keys + hypercharge names from current brawler-stats.ts ───────
function loadBrawlerData() {
  const statsPath = path.join(ROOT, "lib", "brawler-stats.ts");
  if (!fs.existsSync(statsPath)) {
    console.error("lib/brawler-stats.ts not found. Run generate-data.mjs first.");
    process.exit(1);
  }
  const src = fs.readFileSync(statsPath, "utf8");
  const keys = [];
  // Map of brawlerKey → hyperchargeName (or null)
  const hcNames = {};
  const re = /^\s{2}(\w+):\s*\{[^}]*hyperchargeName:\s*("([^"]+)"|null)/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    keys.push(m[1]);
    hcNames[m[1]] = m[3] ?? null; // m[3] is the captured name string, or undefined if null
  }
  return { keys, hcNames };
}

// ── Sanitize a hypercharge name for use as a filename ─────────────────────────
function sanitizeFilename(name) {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, "") // remove special chars (!, ,, ', etc.)
    .trim()
    .replace(/\s+/g, "-");           // spaces → hyphens
}

// ── Key → wiki URL slug ───────────────────────────────────────────────────────
function keyToWikiSlug(key) {
  // Convert underscore_key to Fandom wiki slug
  const parts = key.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  let slug = parts.join("_");
  // Special cases
  slug = slug
    .replace(/^Mr_P$/, "Mr._P")
    .replace(/^Eight_Bit$/, "8-Bit")
    .replace(/^Larry_And_Lawrie$/, "Larry_%26_Lawrie")
    .replace(/^R_T$/, "R-T")
    .replace(/^Jae_Yong$/, "Jae-Yong");
  return slug;
}

// ── Extract the FIRST number from a string ────────────────────────────────────
function parseFirstNum(str) {
  if (!str) return null;
  const m = str.match(/[\d]+(?:\.[\d]+)?/);
  return m ? parseFloat(m[0]) : null;
}

// ── Extract text label from the first parenthetical in a string ───────────────
// e.g. "720 (Normal)864 (with Hypercharge)" → "Normal"
// e.g. "2 seconds (Slow)1.2 seconds (with Reload Gear)" → "Slow"
function extractLabel(str) {
  if (!str) return null;
  const m = str.match(/\(([^)]+)\)/);
  if (!m) return null;
  // Ignore parentheticals that look like qualifiers (with X, without X, etc.)
  const label = m[1].trim();
  if (/^with\s/i.test(label) || /^without\s/i.test(label)) return null;
  return label;
}

// ── Speed: use wiki text label (720=Normal, 770=Fast, 820=Very Fast, 520=Slow)
function categorizeSpeed(raw) {
  const label = extractLabel(raw);
  if (label) {
    const l = label.toLowerCase();
    if (l.includes("very fast")) return "Very Fast";
    if (l.includes("fast"))      return "Fast";
    if (l.includes("slow"))      return "Slow";
    if (l.includes("normal"))    return "Normal";
  }
  // Numeric fallback (actual Brawl Stars speed values)
  const n = parseFirstNum(raw);
  if (n == null) return null;
  if (n <= 600) return "Slow";
  if (n <= 720) return "Normal";
  if (n <= 770) return "Fast";
  return "Very Fast";
}

// ── Range: use numeric tiles (wiki shows e.g. "8.33 (Long)")
function categorizeRange(raw) {
  if (!raw) return null;
  // Try text label first
  const label = extractLabel(raw);
  if (label) {
    const l = label.toLowerCase();
    if (l.includes("short") || l.includes("close") || l.includes("near")) return "Short";
    if (l.includes("very long")) return "Long";
    if (l.includes("long"))  return "Long";
    if (l.includes("normal") || l.includes("mid")) return "Mid";
  }
  const n = parseFirstNum(raw);
  if (n == null) return null;
  if (n < 4.5) return "Short";
  if (n <= 7.5) return "Mid";
  return "Long";
}

// ── Reload: use wiki text label — 4-tier matching speed
function categorizeReload(raw) {
  const label = extractLabel(raw);
  if (label) {
    const l = label.toLowerCase();
    if (l.includes("very fast")) return "Very Fast";
    if (l.includes("fast"))      return "Fast";
    if (l.includes("very slow") || l.includes("slow")) return "Slow";
    if (l.includes("normal"))    return "Normal";
  }
  // Numeric fallback (seconds)
  const n = parseFirstNum(raw);
  if (n == null) return null;
  if (n < 0.5)  return "Very Fast";
  if (n < 1.2)  return "Fast";
  if (n <= 2.0) return "Normal";
  return "Slow";
}

// ── Extract year from a date string ──────────────────────────────────────────
// Handles MM/DD/YY (e.g. "05/12/18" → 2018) and MM/DD/YYYY (e.g. "05/12/2018")
function parseYear(str) {
  if (!str) return null;
  // Try MM/DD/YY or MM/DD/YYYY first
  const slashM = str.match(/\d{1,2}\/\d{1,2}\/(\d{2,4})/);
  if (slashM) {
    const y = parseInt(slashM[1]);
    return y < 100 ? 2000 + y : y;
  }
  // Try bare 4-digit year
  const yearM = str.match(/\b(20\d{2})\b/);
  return yearM ? parseInt(yearM[1]) : null;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Check playwright is installed
  let chromium;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    console.error("Playwright not installed. Run:");
    console.error("  npm install -D playwright");
    console.error("  npx playwright install chromium --with-deps");
    process.exit(1);
  }

  const { keys: brawlerKeys, hcNames } = loadBrawlerData();
  console.log(`Scraping wiki stats for ${brawlerKeys.length} brawlers…\n`);

  // Ensure output dirs exist
  fs.mkdirSync(path.join(ROOT, "public", "hypercharges"), { recursive: true });

  // Load existing wiki-stats.json if present (resume support)
  const outputPath = path.join(__dirname, "wiki-stats.json");
  let wikiStats = {};
  if (fs.existsSync(outputPath)) {
    wikiStats = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    console.log(`Resuming — already have ${Object.keys(wikiStats).length} brawlers cached\n`);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });

  let scraped = 0;
  let failed = 0;

  for (const key of brawlerKeys) {
    // Skip if already scraped
    if (wikiStats[key]) {
      process.stdout.write(`  [cached] ${key}\n`);
      continue;
    }

    const slug = keyToWikiSlug(key);
    const url = `https://brawlstars.fandom.com/wiki/${slug}`;

    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

      // ── Try to extract stats from the portable infobox ──────────────────────
      // Fandom portable infoboxes use data-source attributes
      const stats = await page.evaluate(() => {
        const result = {};

        // Helper: get value from a data-source cell
        function getDataSource(sources) {
          for (const src of sources) {
            const el = document.querySelector(`[data-source="${src}"] .pi-data-value`);
            if (el) return el.textContent.trim();
          }
          return null;
        }

        // Helper: find table row by label text
        function getTableRow(labels) {
          const tds = document.querySelectorAll("td, th");
          for (const td of tds) {
            const txt = td.textContent.trim().toLowerCase();
            for (const lbl of labels) {
              if (txt === lbl.toLowerCase()) {
                const next = td.nextElementSibling;
                if (next) return next.textContent.trim();
              }
            }
          }
          return null;
        }

        // Helper: find definition-list or pi-data-label
        function getPiLabel(labels) {
          const labelsEls = document.querySelectorAll(".pi-data-label");
          for (const el of labelsEls) {
            const txt = el.textContent.trim().toLowerCase();
            for (const lbl of labels) {
              if (txt.includes(lbl.toLowerCase())) {
                const value = el.closest(".pi-data")?.querySelector(".pi-data-value");
                if (value) return value.textContent.trim();
              }
            }
          }
          return null;
        }

        // Movement Speed
        result.speedRaw =
          getDataSource(["movement_speed", "speed", "movementspeed"]) ||
          getPiLabel(["Movement Speed", "Speed"]) ||
          getTableRow(["Movement Speed", "Speed"]);

        // Attack Range
        result.rangeRaw =
          getDataSource(["attack_range", "range", "attackrange"]) ||
          getPiLabel(["Attack Range", "Range"]) ||
          getTableRow(["Attack Range", "Range"]);

        // Reload
        result.reloadRaw =
          getDataSource(["reload", "reload_speed", "reloadspeed"]) ||
          getPiLabel(["Reload", "Reload Speed"]) ||
          getTableRow(["Reload", "Reload Speed"]);

        // Release date — look for first date in the History section (MM/DD/YY format)
        // e.g. "05/12/18:\nLeon was added to the game."
        result.releaseDateRaw = (() => {
          // Strategy 1: find a heading whose text is "History", then get the first
          // date-like text in the content that follows it
          const headings = document.querySelectorAll("h2, h3");
          for (const h of headings) {
            if (h.textContent.trim().toLowerCase() === "history") {
              // Walk siblings/children until we find a MM/DD/YY pattern
              let el = h.nextElementSibling;
              for (let i = 0; i < 10 && el; i++) {
                const txt = el.textContent;
                const m = txt.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
                if (m) return m[0];
                el = el.nextElementSibling;
              }
            }
          }
          // Strategy 2: scan full page text for the earliest MM/DD/YY date
          const bodyText = document.body.innerText;
          const m = bodyText.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
          return m ? m[0] : null;
        })();

        // Hypercharge icon — look for img whose data-image-key contains "Hypercharge"
        result.hyperchargeIconUrl = (() => {
          const imgs = document.querySelectorAll("img[data-image-key], img[data-src]");
          for (const img of imgs) {
            const key = (img.getAttribute("data-image-key") || "").toLowerCase();
            if (key.includes("hypercharge") && !key.includes("emblem") && !key.includes("icon")) {
              // Prefer data-src (lazy-loaded) over src (might be a placeholder)
              const src = img.getAttribute("data-src") || img.getAttribute("src") || "";
              if (!src) continue;
              // Remove scale-to-width-down/N and query string to get full-size URL
              return src
                .replace(/\/scale-to-width-down\/\d+/, "")
                .replace(/\/revision\/latest\/.*/, "/revision/latest");
            }
          }
          return null;
        })();

        return result;
      });

      await page.close();

      // Categorize using text labels (most reliable) with numeric fallback
      const entry = {
        speed:       categorizeSpeed(stats.speedRaw),
        attackRange: categorizeRange(stats.rangeRaw),
        reload:      categorizeReload(stats.reloadRaw),
        releaseYear: parseYear(stats.releaseDateRaw),
        _raw: stats,
      };

      // Log result
      const ok = entry.speed && entry.attackRange && entry.reload && entry.releaseYear;
      const line = `  ${ok ? "✓" : "⚠"} ${key.padEnd(25)} speed=${entry.speed ?? "?"} range=${entry.attackRange ?? "?"} reload=${entry.reload ?? "?"} year=${entry.releaseYear ?? "?"}`;
      console.log(line);
      if (!ok) console.log(`    raw:`, stats);

      wikiStats[key] = entry;

      // Download hypercharge icon — named after the hypercharge name
      if (stats.hyperchargeIconUrl && hcNames[key]) {
        const filename = sanitizeFilename(hcNames[key]) + ".png";
        const iconPath = path.join(ROOT, "public", "hypercharges", filename);
        if (!fs.existsSync(iconPath)) {
          const ok = await downloadFile(stats.hyperchargeIconUrl, iconPath);
          process.stdout.write(ok ? ` [hc: ${filename} ✓]` : ` [hc: ${filename} ✗]`);
        }
      }

      scraped++;

      // Save after every 10 brawlers (resume support)
      if (scraped % 10 === 0) {
        fs.writeFileSync(outputPath, JSON.stringify(wikiStats, null, 2));
        console.log(`  [saved progress: ${scraped} scraped so far]\n`);
      }

      // Polite delay
      await new Promise((r) => setTimeout(r, 600));
    } catch (e) {
      console.log(`  ✗ ${key}: ${e.message}`);
      failed++;
    }
  }

  await browser.close();

  // Final save
  fs.writeFileSync(outputPath, JSON.stringify(wikiStats, null, 2));
  console.log(`\n✓ wiki-stats.json saved (${Object.keys(wikiStats).length} brawlers)`);
  console.log(`  scraped: ${scraped}, failed: ${failed}`);

  if (failed > 0) {
    console.log(`\n⚠ ${failed} brawlers failed. Check wiki-stats.json for null values.`);
    console.log("  You can edit wiki-stats.json manually to fill in missing entries,");
    console.log("  then re-run: node scripts/generate-data.mjs");
  }

  console.log("\nRe-running generate-data.mjs to apply wiki stats…\n");
  try {
    execSync("node scripts/generate-data.mjs", { cwd: ROOT, stdio: "inherit" });
  } catch {
    console.log("(generate-data.mjs failed — run it manually)");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
