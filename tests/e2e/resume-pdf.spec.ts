import { test, expect } from '@playwright/test'

test.describe('Resume PDF', () => {
  test('generates a PDF that is at most 2 pages', async ({ page }) => {
    await page.goto('/resume', { waitUntil: 'networkidle' })

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: { top: '0.3in', bottom: '0.3in', left: '0.5in', right: '0.5in' },
      printBackground: true,
    })

    // Count PDF pages by matching /Type /Page (but not /Type /Pages)
    const pdfText = pdfBuffer.toString('latin1')
    const pageCount = (pdfText.match(/\/Type\s*\/Page(?!s)/g) || []).length

    expect(pageCount, `Resume PDF is ${pageCount} pages, expected 2 or fewer`).toBeLessThanOrEqual(2)
  })
})
