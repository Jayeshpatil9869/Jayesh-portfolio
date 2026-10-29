/**
 * Crop browser chrome from assets/screenshots/*-live.png
 * and write optimized public/images previews (+ webp).
 *
 * Usage: node scripts/sync-project-previews.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve(process.cwd());
const shots = path.join(root, "assets", "screenshots");
const outDir = path.join(root, "public", "images");

const jobs = [
  {
    src: "riyansh-live.png",
    outBase: "Riyansh-Ayurvedic-E-Commerce",
    formats: ["jpg", "webp"],
  },
  {
    src: "veloraa-live.png",
    outBase: "veloraa-rougee",
    formats: ["png", "webp"],
  },
  {
    src: "gravitate-live.png",
    outBase: "Gravitate_Masala",
    formats: ["png", "webp"],
  },
  {
    src: "linknest-live.png",
    outBase: "linknest",
    formats: ["png", "webp"],
  },
  {
    src: "divines-code-live.png",
    outBase: "divines-code",
    formats: ["png", "jpg", "webp"],
  },
];

function chromeTop(height) {
  // Approximate browser chrome on full-desktop captures.
  if (height >= 900) return 110;
  if (height >= 700) return 90;
  return 78;
}

for (const job of jobs) {
  const input = path.join(shots, job.src);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing ${job.src}`);
    continue;
  }

  const meta = await sharp(input).metadata();
  const top = chromeTop(meta.height);
  const height = Math.max(meta.height - top, 360);
  const pipeline = sharp(input)
    .extract({ left: 0, top, width: meta.width, height })
    .resize({ width: 1400, withoutEnlargement: true });

  for (const format of job.formats) {
    const dest = path.join(outDir, `${job.outBase}.${format}`);
    const branch = pipeline.clone();
    if (format === "jpg") {
      await branch.jpeg({ quality: 84, mozjpeg: true }).toFile(dest);
    } else if (format === "png") {
      await branch.png({ compressionLevel: 8 }).toFile(dest);
    } else if (format === "webp") {
      await branch.webp({ quality: 78 }).toFile(dest);
    }
    const size = Math.round(fs.statSync(dest).size / 1024);
    console.log(`${job.src} -> ${path.basename(dest)} (${size}KB)`);
  }
}

console.log("done");
