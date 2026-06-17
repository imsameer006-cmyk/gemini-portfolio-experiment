import fs from "node:fs/promises";
import sharp from "sharp";

const sources = [1, 2, 3, 4, 5];
const sourceDir = "public/Gallery";
const outputDir = "public/Gallery/editorial";

const clamp = (value) => Math.max(0, Math.min(255, value));

const seededNoise = (index) => {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const quietEditorialPixel = (r, g, b, pixelIndex) => {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const gray = luma;

  let nr = gray + (r - gray) * 0.72;
  let ng = gray + (g - gray) * 0.72;
  let nb = gray + (b - gray) * 0.72;

  nr = 128 + (nr - 128) * 0.88;
  ng = 128 + (ng - 128) * 0.88;
  nb = 128 + (nb - 128) * 0.88;

  const normalizedLuma = luma / 255;
  const highlightMask = Math.max(0, (normalizedLuma - 0.52) / 0.48);
  const shadowMask = Math.max(0, (0.46 - normalizedLuma) / 0.46);
  const greenDominance = Math.min(Math.max((ng - (nr + nb) / 2 - 8) / 36, 0), 1);
  const redDominance = Math.min(Math.max((nr - (ng + nb) / 2 - 14) / 44, 0), 1);

  const highlightPull = 15 * highlightMask;
  const shadowLift = 7 * shadowMask;
  const matteBlackLift = 5 * shadowMask;
  const whiteSoftening = 7 * highlightMask;
  const temperatureShift = 3.5;
  const tintShift = 1.2;
  const greenSoftening = 7 * greenDominance;
  const redSoftening = 5 * redDominance;
  const grain = (seededNoise(pixelIndex) - 0.5) * 1.8;

  nr = nr - highlightPull - whiteSoftening + shadowLift + matteBlackLift + temperatureShift - redSoftening + grain;
  ng = ng - highlightPull - whiteSoftening + shadowLift + matteBlackLift + tintShift - greenSoftening + grain;
  nb = nb - highlightPull - whiteSoftening + shadowLift + matteBlackLift - temperatureShift + greenSoftening * 0.4 + grain;

  return [clamp(nr), clamp(ng), clamp(nb)];
};

await fs.mkdir(outputDir, { recursive: true });

for (const source of sources) {
  const input = `${sourceDir}/${source}.png`;
  const output = `${outputDir}/${source}.webp`;
  const image = sharp(input).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const treated = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += info.channels) {
    const pixelIndex = i / info.channels;
    const [r, g, b] = quietEditorialPixel(data[i], data[i + 1], data[i + 2], pixelIndex);

    treated[i] = Math.round(r);
    treated[i + 1] = Math.round(g);
    treated[i + 2] = Math.round(b);
    treated[i + 3] = data[i + 3];
  }

  await sharp(treated, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .webp({ quality: 86, effort: 6 })
    .toFile(output);

  console.log(`Wrote ${output}`);
}
