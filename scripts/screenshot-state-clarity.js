const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGE_URL = 'http://localhost:3000/screens/state-clarity.html';
const OUT_DIR  = path.join(__dirname, '..', 'public', 'case-studies', 'gemini');
const OUT_FILE = path.join(OUT_DIR, 'state-clarity.png');

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1700, height: 1020 }, deviceScaleFactor: 2 });

  console.log('Navigating to', PAGE_URL);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForFunction(
    () => document.querySelectorAll('svg[data-lucide]').length > 0,
    { timeout: 10000 }
  ).catch(() => {});

  await page.waitForTimeout(600);

  await page.locator('.master').screenshot({ path: OUT_FILE, type: 'png' });
  await browser.close();

  const size = (fs.statSync(OUT_FILE).size / 1024).toFixed(0);
  console.log(`Done → ${OUT_FILE} (${size} KB)`);
})();
