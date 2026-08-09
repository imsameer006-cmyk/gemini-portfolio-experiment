const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.CAPTURE_BASE_URL || 'http://localhost:3001';
const PAGE_URL = `${BASE_URL}/screens/context-governance.html`;
const OUT_PATH  = path.join(__dirname, '..', 'public', 'case-studies', 'gemini', 'context-governance.png');

// Master frame = 1550px wide. Body has 40px padding each side.
// Master height = header ~70px + content row 660px + caption ~44px + inner padding 88px ≈ 862px
// Body needs: 862 + 80 (body padding) = 942px
// Add 60px headroom → viewport 1700 × 1020
const VIEWPORT = { width: 1700, height: 1020 };

(async () => {
  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    args: [
      '--use-gl=egl',           // software WebGL — ensures Three.js renders in headless
      '--disable-web-security', // allow file:// cross-origin for module imports
      '--no-sandbox',
    ],
  });

  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // retina — 2× pixel density for crisp output
  });

  console.log('Loading:', PAGE_URL);

  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for fonts + SVG to settle
  await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(800);

  // Screenshot the .master element exactly — no surrounding whitespace
  const master = page.locator('.master');
  await master.screenshot({
    path: OUT_PATH,
    type: 'png',
  });

  await browser.close();
  console.log('Screenshot saved to:', OUT_PATH);
})();
