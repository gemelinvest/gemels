import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const dist = "dist";
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

const files = await htmlFiles(dist);
const home = await readFile(join(dist, "index.html"), "utf8");

assert(files.length >= 8, "expected several html pages");
assert(home.includes('lang="he"'), "home lang");
assert(home.includes('dir="rtl"'), "home dir");
assert(home.includes("tel:*0000"), "home tel link");
assert(home.includes('rel="canonical"'), "canonical");
assert(home.includes("og:title"), "open graph");
assert(home.includes("application/ld+json"), "structured data");
assert(home.includes("גמל INS"), "brand name");
assert(!/\d+\s*שנות ניסיון/.test(home), "no invented tenure");
assert(home.includes("דילוג לתוכן"), "skip link");

for (const file of files) {
  const html = await readFile(file, "utf8");
  assert(html.includes('lang="he"'), `${file} lang`);
  assert(html.includes('dir="rtl"'), `${file} dir`);
  assert(html.includes("tel:*0000"), `${file} phone`);
  assert(!html.includes("<img") || html.includes("alt="), `${file} alt`);
}

const robots = await readFile(join(dist, "robots.txt"), "utf8");
assert(robots.includes("Sitemap:"), "robots sitemap");
assert(robots.includes("User-agent:"), "robots agent");

const sitemap = await readFile(join(dist, "sitemap-index.xml"), "utf8");
assert(sitemap.includes("sitemap"), "sitemap index");

const a11y = await readFile(join(dist, "accessibility", "index.html"), "utf8");
assert(!a11y.includes("נגיש לחלוטין"), "no false full-access claim");
assert(a11y.includes("אינו אישור"), "honest accessibility statement");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`checked ${files.length} html files`);
