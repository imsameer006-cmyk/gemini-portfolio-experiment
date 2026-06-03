const { chromium } = require('playwright');
const path = require('path');

const PAGE_URL = 'http://localhost:3001/screens/challenge-poc.html';
const OUT_PATH = path.join(__dirname, '../public/case-studies/gemini/challenge-poc.png');

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1020 },
    deviceScaleFactor: 2,
  });

  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for Three.js canvas to render
  await page.waitForFunction(
    () => { const c = document.querySelector('#viewer canvas'); return c && c.width > 0; },
    { timeout: 15000 }
  ).catch(() => {});

  // Stop rotation and let the model settle
  await page.evaluate(() => { window.__autoRotate = false; });
  await page.waitForTimeout(1200);

  await page.locator('.master').screenshot({ path: OUT_PATH, type: 'png' });
  await browser.close();
  console.log('Screenshot saved to', OUT_PATH);
})();
