// Renders the built /resume/ page to public/assets/chase-bianchi-resume.pdf.
// Run with `npm run build:resume-pdf` (builds first), then rebuild or deploy so the new PDF ships.
import { readFileSync } from 'node:fs'
import { preview } from 'vite'
import { chromium } from '@playwright/test'

const OUT = 'public/assets/chase-bianchi-resume.pdf'
const MAX_PAGES = 2

const server = await preview({ preview: { port: 4183, strictPort: true }, logLevel: 'error' })
const browser = await chromium.launch()
let pages = 0
try {
  const page = await browser.newPage()
  await page.emulateMedia({ media: 'print', colorScheme: 'light' })
  await page.goto('http://localhost:4183/resume/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: OUT, format: 'Letter', preferCSSPageSize: true, printBackground: true })
  pages = (readFileSync(OUT).toString('latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length
} finally {
  await browser.close()
  await new Promise(done => server.httpServer.close(done))
}

console.log(`${OUT}: ${pages} page(s)`)
if (pages < 1 || pages > MAX_PAGES) {
  console.error(`Resume must be 1-${MAX_PAGES} pages; got ${pages}.`)
  process.exit(1)
}
