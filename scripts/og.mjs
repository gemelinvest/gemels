import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public", { recursive: true });
await sharp("src/assets/hero-family-living-room.png")
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile("public/og.jpg");
