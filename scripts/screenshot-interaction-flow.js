const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1020 },
    deviceScaleFactor: 2,
  });

  await page.goto('http://localhost:3001/screens/interaction-flow.html', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(1200);

  const outPath = path.join(__dirname, '../public/case-studies/gemini/interaction-flow.png');
  await page.locator('.master').screenshot({ path: outPath, type: 'png' });

  await browser.close();
  console.log('Screenshot saved to', outPath);
})();
