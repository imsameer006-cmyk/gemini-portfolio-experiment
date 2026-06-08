/**
 * Captures canvas-2 and canvas-3 from /hero-lab as high-res PNGs.
 * Output: scripts/canvas-2.png and scripts/canvas-3.png (3168 × 792 @ 2x)
 *
 * Usage:
 *   node scripts/screenshot-banners.mjs                  ← uses deployed URL
 *   node scripts/screenshot-banners.mjs http://localhost:3000  ← uses local dev server
 */

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.argv[2] ?? "https://gemini-portfolio-experiment.vercel.app";
const URL = `${BASE_URL}/hero-lab`;

const CANVASES = [
  { id: "canvas-2", file: "canvas-2-copper.png" },
  { id: "canvas-3", file: "canvas-3-silver.png" },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1920px viewport → canvas renders at full 1584px (1584 + 2×40px section padding)
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.emulateMedia({ colorScheme: "dark" });

  console.log(`Navigating to ${URL} …`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

  // Wait for fonts and first canvas to appear
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForSelector("#canvas-2", { timeout: 30000 });

  for (const { id, file } of CANVASES) {
    const el = page.locator(`#${id}`);
    const outPath = path.join(__dirname, file);

    await el.screenshot({
      path: outPath,
      scale: "device",  // captures at the browser's devicePixelRatio
      type: "png",
    });

    const box = await el.boundingBox();
    console.log(`✓ ${file}  (${Math.round(box.width * 2)} × ${Math.round(box.height * 2)} px)  →  ${outPath}`);
  }

  await browser.close();
  console.log("\nDone. Open the PNG files in scripts/");
})();
