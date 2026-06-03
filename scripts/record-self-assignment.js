const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');

const PAGE_URL = 'http://localhost:3001/screens/self-assignment.html?rec=1';
const OUT_DIR = path.join(__dirname, '..', 'public', 'case-studies', 'gemini');
const OUT_MP4 = path.join(OUT_DIR, 'self-assignment.mp4');
const TEMP_DIR = path.join(__dirname, '..', '.playwright-videos');

const MASTER_W = 1550;
const MASTER_H = 860;
const SETTLE_MS = 800;
const TRIM_START = 0.3;

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext({
    viewport: { width: MASTER_W, height: MASTER_H },
    recordVideo: { dir: TEMP_DIR, size: { width: MASTER_W, height: MASTER_H } },
  });

  const page = await context.newPage();
  console.log('Navigating to', PAGE_URL);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(SETTLE_MS);

  console.log('Recording interaction sequence...');
  await page.evaluate(() => {
    const cursor = document.querySelector('#cursor');
    cursor.style.left = '920px';
    cursor.style.top = '360px';
    cursor.style.opacity = '1';
  });
  await page.waitForTimeout(1200);

  await page.evaluate(() => {
    const cursor = document.querySelector('#cursor');
    cursor.style.left = '420px';
    cursor.style.top = '447px';
  });
  await page.waitForTimeout(900);

  await page.evaluate(() => {
    document.querySelector('#sfTab').classList.add('clicked');
    document.querySelector('#sfToggle').textContent = '-';
    document.querySelector('#backdrop').classList.add('visible');
    document.querySelector('#sfPanel').classList.add('visible');
    document.querySelector('#annText').classList.add('show');
    document.querySelector('#connectorGroup').classList.add('show');
  });
  await page.waitForTimeout(2400);

  await page.evaluate(() => {
    const cursor = document.querySelector('#cursor');
    cursor.style.left = '544px';
    cursor.style.top = '416px';
  });
  await page.waitForTimeout(900);
  await page.click('#assignBtn');
  await page.waitForTimeout(2200);

  await page.evaluate(() => {
    const cursor = document.querySelector('#cursor');
    cursor.style.left = '525px';
    cursor.style.top = '540px';
  });
  await page.waitForTimeout(900);
  await page.click('#approveBtn');
  await page.waitForTimeout(2400);

  await page.evaluate(() => {
    document.querySelector('#sfPanel').classList.remove('visible');
    document.querySelector('#backdrop').classList.remove('visible');
    document.querySelector('#annText').classList.remove('show');
    document.querySelector('#connectorGroup').classList.remove('show');
    document.querySelector('#sfTab').classList.remove('clicked');
    document.querySelector('#sfToggle').textContent = '+';
  });
  await page.waitForTimeout(1800);

  const video = page.video();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  console.log('Converting to MP4...');
  execSync(
    `"${ffmpegPath}" -i "${webmPath}" -ss ${TRIM_START} -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -movflags +faststart "${OUT_MP4}" -y`,
    { stdio: 'pipe' }
  );

  fs.unlinkSync(webmPath);
  const size = (fs.statSync(OUT_MP4).size / 1024).toFixed(0);
  console.log(`Done -> ${OUT_MP4} (${size} KB)`);
})();
