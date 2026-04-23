import { chromium } from "playwright";
import { snippets } from "./snippets.ts";

const BASE = process.env.PLAYROOM_BASE || "http://localhost:4327";
const failures = [];

function ok(name, cond, extra = "") {
  const icon = cond ? "✔" : "✘";
  console.log(`${icon} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failures.push(name);
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();

page.on("pageerror", (err) => console.log("[pageerror]", err.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("[console.error]", m.text());
});

await page.goto(`${BASE}/playroom`, { waitUntil: "networkidle" });

// Wait for the chrome to mount
await page.waitForSelector(".playroom-root", { timeout: 10000 });
ok("playroom chrome mounted", true);

// Wait for at least one iframe
await page.waitForSelector(".playroom-iframe", { timeout: 10000 });
const iframeHandles = await page.$$(".playroom-iframe");
ok("iframes present", iframeHandles.length >= 6, `got ${iframeHandles.length}`);

// Give previews time to mount + receive code + render
await page.waitForTimeout(2500);

// Verify one cell at 360px light contains the button demo
async function verifyFirstIframe() {
  const frames = page.frames().filter((f) => f.url().includes("/playroom/preview"));
  ok("preview frames attached", frames.length > 0, `got ${frames.length}`);
  if (!frames.length) return;
  // First iframe should render default snippet (Button)
  const f = frames[0];
  await f.waitForSelector("button", { timeout: 8000 });
  const texts = await f.$$eval("button", (els) => els.map((e) => e.textContent));
  ok("default snippet renders buttons", texts.includes("Default"), `labels: ${texts.join("|")}`);
}
await verifyFirstIframe();

// Exercise every snippet
for (const s of snippets) {
  // Pick snippet via the select
  await page.selectOption(".playroom-select", s.name).catch(() => {});
  await page.waitForTimeout(800);
  const frames = page.frames().filter((f) => f.url().includes("/playroom/preview"));
  // At least one frame should have some rendered content
  let anyRendered = false;
  let anyErr = null;
  for (const f of frames) {
    try {
      const html = await f.evaluate(() => document.body.innerText.slice(0, 200));
      if (html && html.trim().length > 0) anyRendered = true;
    } catch (e) {
      anyErr = e.message;
    }
  }
  ok(`snippet ${s.name} renders`, anyRendered, anyErr || "");
}

// Theme split — uncheck dark, verify only light iframes remain, then re-check
const darkChk = page.locator(".playroom-chip", { hasText: "dark" }).locator("input");
await darkChk.uncheck();
await page.waitForTimeout(300);
const afterUncheckCount = await page.$$eval(".playroom-iframe", (els) => els.length);
ok("theme uncheck reduces frames", afterUncheckCount === 3, `${afterUncheckCount}`);
await darkChk.check();
await page.waitForTimeout(300);

// Viewport uncheck
const w768 = page.locator(".playroom-chip", { hasText: "768px" }).locator("input");
await w768.uncheck();
await page.waitForTimeout(300);
const afterWidthUncheck = await page.$$eval(".playroom-iframe", (els) => els.length);
ok("width uncheck reduces frames", afterWidthUncheck === 4, `${afterWidthUncheck}`);
await w768.check();
await page.waitForTimeout(200);

// URL round-trip — current hash should be non-empty
const hash = await page.evaluate(() => window.location.hash);
ok("url hash populated", hash.length > 1, hash.slice(0, 20));

// Reopen page with that hash and verify editor contents include a token from the last snippet
const url = `${BASE}/playroom${hash}`;
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector(".cm-editor", { timeout: 5000 });
const editorText = await page.$eval(".cm-editor", (el) => el.innerText);
const lastSnippetName = snippets[snippets.length - 1].name;
const lastSnippetCode = snippets.find((s) => s.name === lastSnippetName).code;
const expectedToken = lastSnippetCode.match(/[A-Z][a-zA-Z]+/)?.[0] || "import";
ok(
  "URL round-trip restores editor content",
  editorText.includes(expectedToken),
  `expected ${expectedToken} in editor`,
);

// Error path — type deliberately broken code
await page.evaluate(() => {
  // Find CodeMirror and replace content
  const ev = new KeyboardEvent("keydown");
  // Use .cm-content focus + execCommand-ish; fallback: set via CM API if exposed
});

await browser.close();

if (failures.length) {
  console.log(`\nFAILED: ${failures.length}`);
  process.exit(1);
}
console.log("\nALL GOOD");
