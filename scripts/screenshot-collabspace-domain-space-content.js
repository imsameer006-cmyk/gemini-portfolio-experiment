/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.CAPTURE_BASE_URL || 'http://localhost:3001';
const PAGE_URL = `${BASE_URL}/screens/collabspace-domain-space-content.html`;
const OUT_DIR = path.join(__dirname, '..', 'public', 'case-studies', 'collabspace');
const OUT_FILE = path.join(OUT_DIR, 'domain-space-content.png');

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1020 },
    deviceScaleFactor: 2,
  });

  console.log('Navigating to', PAGE_URL);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 45000 });

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const frameElement = await page.waitForSelector('iframe[name="collabspaceDomainContent"]', { timeout: 15000 });
  const frame = await frameElement.contentFrame();
  if (!frame) throw new Error('Could not access Collabspace iframe.');

  await frame.waitForLoadState('networkidle', { timeout: 45000 }).catch(() => {});
  await frame.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));

    const headings = Array.from(document.querySelectorAll('h3'));
    const target = headings.find((el) => el.textContent?.trim() === 'Domain Reels');
    if (!target) throw new Error('Domain Reels heading not found.');

    const scrollY = target.getBoundingClientRect().top + window.scrollY - 225;
    window.scrollTo(0, Math.max(0, scrollY));
  });

  await page.waitForTimeout(900);

  await page.locator('.master').screenshot({ path: OUT_FILE, type: 'png' });
  await browser.close();

  const size = (fs.statSync(OUT_FILE).size / 1024).toFixed(0);
  console.log(`Done -> ${OUT_FILE} (${size} KB)`);
})();
