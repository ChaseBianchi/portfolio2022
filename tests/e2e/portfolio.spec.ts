import { expect, test } from '@playwright/test'

test('Atlas shows the requested identity and career wording', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Chase Bianchi.*AI Engineering/)
  await expect(page.getByRole('link', { name: 'Chase Bianchi home' })).toContainText('Chase Bianchi')
  await expect(page.getByRole('heading', { name: 'Follow the connections.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Professional poker player', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /GitHub · Personal/ })).toHaveAttribute('href', 'https://github.com/ChaseBianchi')
  await expect(page.getByRole('link', { name: /GitHub · Work/ })).toHaveAttribute('href', 'https://github.com/ChaseBianchiSlalom')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('a selected project opens its case study and returns to work', async ({ page }) => {
  await page.goto('/')
  const hub = page.getByRole('button', { name: /02 \/ PORTABILITY AI Hub/ })
  await hub.click()
  await expect(hub).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#map-title')).toHaveText('AI Hub')
  await page.getByRole('link', { name: 'Open case study ↗' }).click()
  await expect(page).toHaveURL(/\/work\/ai-hub\/$/)
  await expect(page.getByRole('heading', { name: 'Team knowledge that travels between tools.' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'What shipped.' })).toBeVisible()
  await page.getByRole('link', { name: '← Selected work' }).click()
  await expect(page).toHaveURL(/\/#work$/)
})

test('resume PDF is available', async ({ request }) => {
  const response = await request.get('/assets/chase-bianchi-resume.pdf')
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
})
