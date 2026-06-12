/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');

const BASE_URL = process.env.CAPTURE_BASE_URL || 'http://localhost:3001';
const PAGE_URL = `${BASE_URL}/screens/collabspace-global-hub.html`;
const OUT_DIR = path.join(__dirname, '..', 'public', 'case-studies', 'collabspace');
const OUT_MP4 = path.join(OUT_DIR, 'global-hub.mp4');
const TEMP_DIR = path.join(__dirname, '..', '.playwright-videos');

const MASTER_W = 1550;
const MASTER_H = 860;
const SETTLE_MS = 1200;
const HOLD_TOP_MS = 2500;
const SCROLL_MS = 9000;
const HOLD_BOTTOM_MS = 1400;
const TRIM_START = 2.6;

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch({
    args: ['--use-gl=egl', '--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: MASTER_W, height: MASTER_H },
    recordVideo: { dir: TEMP_DIR, size: { width: MASTER_W, height: MASTER_H } },
  });

  const page = await context.newPage();
  console.log('Navigating to', PAGE_URL);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 45000 });

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const frameElement = await page.waitForSelector('iframe[name="collabspaceGlobalHub"]', { timeout: 15000 });
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
    window.scrollTo(0, 0);
  });

  await page.waitForTimeout(SETTLE_MS + HOLD_TOP_MS);

  console.log(`Recording ${(SCROLL_MS / 1000).toFixed(1)}s scroll...`);
  await frame.evaluate((duration) => {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const endY = document.documentElement.scrollHeight - window.innerHeight;
      const start = performance.now();
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + (endY - startY) * eased);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(step);
    });
  }, SCROLL_MS);

  await page.waitForTimeout(HOLD_BOTTOM_MS);

  const video = page.video();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  console.log('Raw webm:', webmPath);

  const keepDuration = ((SETTLE_MS + HOLD_TOP_MS + SCROLL_MS + HOLD_BOTTOM_MS) / 1000 - TRIM_START).toFixed(2);

  console.log('Converting to MP4...');
  execSync(
    `"${ffmpegPath}" -i "${webmPath}" -ss ${TRIM_START} -t ${keepDuration} -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -movflags +faststart "${OUT_MP4}" -y`,
    { stdio: 'pipe' }
  );

  fs.unlinkSync(webmPath);
  const size = (fs.statSync(OUT_MP4).size / 1024).toFixed(0);
  console.log(`Done -> ${OUT_MP4} (${size} KB)`);
})();
