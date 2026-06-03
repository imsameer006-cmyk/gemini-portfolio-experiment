const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');

// ?rec=1 applies layout CSS before first render — no layout shift
const PAGE_URL  = 'http://localhost:3001/screens/solution-short-flow.html?rec=1';
const OUT_DIR   = path.join(__dirname, '..', 'public', 'case-studies', 'gemini');
const OUT_MP4   = path.join(OUT_DIR, 'solution-short-flow.mp4');
const TEMP_DIR  = path.join(__dirname, '..', '.playwright-videos');

// Master at 1550×860, body padding removed via ?rec=1
const MASTER_W = 1550;
const MASTER_H = 860;

// Animation timing (must match HTML):
// 5 steps × 1200ms + 1000ms pause = 7000ms per cycle
// Show 500ms of initial state before animation → total video = 7500ms
const SETTLE_MS  = 1000;  // wait after page load before triggering animation
const ANIM_MS    = 7500;  // duration to record after animation starts
const TRIM_START = 0.3;   // seconds: trim to cut any leading blank frames

(async () => {
  if (!fs.existsSync(OUT_DIR))  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch({
    args: ['--use-gl=egl', '--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport:    { width: MASTER_W, height: MASTER_H },
    recordVideo: { dir: TEMP_DIR, size: { width: MASTER_W, height: MASTER_H } },
  });

  const page = await context.newPage();
  console.log('Navigating to', PAGE_URL);

  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for Lucide icons
  await page.waitForFunction(
    () => document.querySelectorAll('svg[data-lucide]').length > 0,
    { timeout: 10000 }
  ).catch(() => {});

  console.log('Page ready. Settling…');
  await page.waitForTimeout(SETTLE_MS);

  // Trigger animation
  await page.evaluate(() => {
    window.__startAnimation();
  });
  console.log(`Recording ${(ANIM_MS / 1000).toFixed(1)}s of animation…`);
  await page.waitForTimeout(ANIM_MS);

  const video = page.video();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  console.log('Raw webm:', webmPath);

  const keepDuration = ((SETTLE_MS + ANIM_MS) / 1000 - TRIM_START).toFixed(2);

  console.log('Converting to MP4…');
  execSync(
    `"${ffmpegPath}" -i "${webmPath}" -ss ${TRIM_START} -t ${keepDuration} -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -movflags +faststart "${OUT_MP4}" -y`,
    { stdio: 'pipe' }
  );

  fs.unlinkSync(webmPath);
  const size = (fs.statSync(OUT_MP4).size / 1024).toFixed(0);
  console.log(`Done → ${OUT_MP4} (${size} KB)`);
})();
