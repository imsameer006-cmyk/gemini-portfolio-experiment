const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1020 },
    deviceScaleFactor: 2,
  });

  await page.goto('http://localhost:3001/screens/rejection-feedback.html', {
    waitUntil: 'networkidle',
  });

  // Wait for Lucide icons to initialise
  await page.waitForTimeout(800);

  const outPath = path.join(__dirname, '../public/case-studies/gemini/rejection-feedback.png');
  await page.locator('.master').screenshot({ path: outPath, type: 'png' });

  await browser.close();
  console.log('Screenshot saved to', outPath);
})();
