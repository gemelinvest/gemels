import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.SITE_URL || "http://127.0.0.1:4321";
const widths = [360, 390, 768, 1024, 1280, 1440, 1920];
const outDir = "/opt/cursor/artifacts/gemel-ins";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (error) => consoleErrors.push(String(error)));

const failures = [];
function assert(ok, message) {
  if (!ok) failures.push(message);
}

await page.goto(base + "/", { waitUntil: "networkidle" });
assert((await page.locator("html").getAttribute("lang")) === "he", "lang");
assert((await page.locator("html").getAttribute("dir")) === "rtl", "dir");
assert((await page.locator('a[href="tel:*0000"]').count()) >= 3, "tel links");
assert(await page.locator('link[rel="canonical"]').count(), "canonical");
assert(await page.locator('script[type="application/ld+json"]').count(), "jsonld");
assert(await page.locator("h1").count() === 1, "single h1");

const brokenImages = await page.evaluate(() =>
  [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.alt || img.src),
);
assert(brokenImages.length === 0, `broken images ${brokenImages.join(",")}`);

for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  assert(overflow.scrollWidth <= overflow.clientWidth + 1, `overflow ${width}: ${overflow.scrollWidth}>${overflow.clientWidth}`);
  await page.screenshot({ path: `${outDir}/home-${width}.png`, fullPage: true });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + "/", { waitUntil: "networkidle" });
const menu = page.locator(".nav-toggle");
await menu.click();
assert(await page.locator(".nav-panel").isVisible(), "mobile menu opens");
await page.screenshot({ path: `${outDir}/menu-390.png` });

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.locator("#contact-form button[type=submit]").click();
assert((await page.locator("#form-status").textContent())?.includes("לתקן"), "invalid form message");
await page.screenshot({ path: `${outDir}/form-invalid.png` });

await page.fill("#full-name", "נועה לוי");
await page.fill("#phone", "0501234567");
await page.fill("#email", "noa@example.com");
await page.selectOption("#topic", "פנסיה");
await page.fill("#message", "אשמח לשיחת היכרות לגבי המשפחה.");
await page.check("#privacy");
await page.locator("#contact-form button[type=submit]").click();
const ready = await page.locator("#form-status").textContent();
assert(ready?.includes("לא נשלחה"), `valid form honest status: ${ready}`);
await page.screenshot({ path: `${outDir}/form-ready.png` });

await page.goto(base + "/", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
assert(focused?.includes("דילוג"), `skip focused first: ${focused}`);

const axe = await new AxeBuilder({ page }).analyze();
const serious = axe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
if (serious.length) {
  failures.push(
    "axe: " +
      serious
        .map((item) => `${item.id} (${item.impact}) ${item.nodes.slice(0, 2).map((node) => node.target.join(" ")).join(" | ")}`)
        .join("\n"),
  );
}

await page.goto(base + "/accessibility/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/accessibility.png`, fullPage: true });
await page.goto(base + "/articles/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/articles.png`, fullPage: true });

await context.close();
await browser.close();

const report = {
  failures,
  consoleErrors,
};
console.log(JSON.stringify(report, null, 2));
if (failures.length || consoleErrors.length) process.exit(1);
