const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 2 });

  // Master icon (512x512)
  await page.goto('file://' + path.resolve(__dirname, 'icon-template.html'));
  const markEl = await page.$('.mark');
  await markEl.screenshot({ path: path.resolve(__dirname, 'icon-master.png') });

  // OG image (1200x630)
  const page2 = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await page2.goto('file://' + path.resolve(__dirname, 'og-template.html'));
  await page2.waitForTimeout(300); // let webfont load
  const canvasEl = await page2.$('.canvas');
  await canvasEl.screenshot({ path: path.resolve(__dirname, 'og-master.png') });

  await browser.close();
  console.log('Rendered icon-master.png and og-master.png');
})();
