import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:4173/resume', { waitUntil: 'networkidle' });

await page.pdf({
  path: 'public/media/resume.pdf',
  format: 'Letter',
  margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
  printBackground: true,
});

console.log('Resume PDF generated at public/media/resume.pdf');
await browser.close();
