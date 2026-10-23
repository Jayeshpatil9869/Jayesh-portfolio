import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = path.resolve("public/images");

for (const file of fs.readdirSync(dir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  if (file === "og-card.jpg") continue;
  const input = path.join(dir, file);
  const before = fs.statSync(input).size;
  const webp = path.join(dir, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  await sharp(input)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(webp);
  const after = fs.statSync(webp).size;
  console.log(`${file} ${Math.round(before / 1024)}KB -> ${path.basename(webp)} ${Math.round(after / 1024)}KB`);
}

const maskIn = path.join(dir, "hero-mask.png");
const maskTmp = path.join(dir, "hero-mask-opt.png");
await sharp(maskIn)
  .resize({ width: 800, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(maskTmp);
fs.renameSync(maskTmp, maskIn);
console.log(`hero-mask.png now ${Math.round(fs.statSync(maskIn).size / 1024)}KB`);

const portrait = await sharp(path.join(dir, "jayesh-patil.jpg"))
  .resize(480, 630, { fit: "cover", position: "attention" })
  .toBuffer();

const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#d6d6d6"/>
  <text x="64" y="290" font-family="Arial, Helvetica, sans-serif" font-size="68" fill="#161616">Jayesh Patil</text>
  <text x="64" y="360" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#393632">Full Stack Developer</text>
</svg>`);

await sharp(svg)
  .composite([{ input: portrait, left: 700, top: 0 }])
  .jpeg({ quality: 82 })
  .toFile(path.join(dir, "og-card.jpg"));

const og = fs.statSync(path.join(dir, "og-card.jpg"));
console.log(`og-card.jpg ${og.size} bytes`);
