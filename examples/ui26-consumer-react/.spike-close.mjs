import { chromium } from '@playwright/test';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const shots = [
  { url: '/components/button/', name: 'button' },
  { url: '/components/card/', name: 'card' },
  { url: '/components/badge/', name: 'badge' },
  { url: '/components/input/', name: 'input' },
  { url: '/components/switch/', name: 'switch' },
];
for (const s of shots) {
  for (const theme of ['light', 'dark']) {
    await p.goto('http://localhost:4326' + s.url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    if (theme === 'dark') {
      await p.evaluate(() => { document.documentElement.dataset.theme='dark'; document.documentElement.classList.add('dark'); });
      await p.waitForTimeout(250);
    }
    const main = await p.$('main');
    if (!main) continue;
    await main.screenshot({ path: `/Users/winston/dev/personal/ui26/.spike-screenshots/zoom-${s.name}-${theme}.png` });
  }
}
await b.close();
console.log('ok');
