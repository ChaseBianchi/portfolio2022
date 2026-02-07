import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:4173/resume', { waitUntil: 'networkidle' });

const pdfPath = 'public/media/resume.pdf';

await page.pdf({
  path: pdfPath,
  format: 'Letter',
  margin: { top: '0.3in', bottom: '0.3in', left: '0.5in', right: '0.5in' },
  printBackground: true,
});

// Count PDF pages by counting page object references
const pdfBuffer = readFileSync(pdfPath);
const pdfText = pdfBuffer.toString('latin1');
const pageCount = (pdfText.match(/\/Type\s*\/Page(?!s)/g) || []).length;

console.log(`Resume PDF generated at ${pdfPath} (${pageCount} pages)`);

if (pageCount > 2) {
  console.error(`ERROR: Resume PDF is ${pageCount} pages — must be 2 or fewer.`);
  await browser.close();
  process.exit(1);
}

await browser.close();
