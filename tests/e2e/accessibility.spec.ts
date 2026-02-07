import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has correct lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('en')
  })

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('navigation has aria-label', async ({ page }) => {
    await expect(page.locator('[aria-label="Main navigation"]')).toBeVisible()
    await expect(page.locator('[aria-label="Mobile navigation"]')).toBeAttached()
  })

  test('sections have aria-labels', async ({ page }) => {
    await expect(page.locator('[aria-label="Projects"]')).toBeVisible()
    await expect(page.locator('[aria-label="Experience and Education"]')).toBeVisible()
    await expect(page.locator('[aria-label="About"]')).toBeVisible()
    await expect(page.locator('[aria-label="Contact"]')).toBeVisible()
  })

  test('form inputs have associated labels', async ({ page }) => {
    const nameLabel = page.locator('label[for="contact-name"]')
    await expect(nameLabel).toBeVisible()
    const emailLabel = page.locator('label[for="contact-email"]')
    await expect(emailLabel).toBeVisible()
    const messageLabel = page.locator('label[for="contact-message"]')
    await expect(messageLabel).toBeVisible()
  })

  test('carousel buttons have aria-labels', async ({ page }) => {
    await expect(page.locator('[aria-label="Previous project"]')).toBeAttached()
    await expect(page.locator('[aria-label="Next project"]')).toBeAttached()
  })

  test('social links have aria-labels', async ({ page }) => {
    const emailLinks = page.locator('[aria-label="email"]')
    expect(await emailLinks.count()).toBeGreaterThanOrEqual(1)
    const linkedinLinks = page.locator('[aria-label="linkedin"]')
    expect(await linkedinLinks.count()).toBeGreaterThanOrEqual(1)
    const githubLinks = page.locator('[aria-label="github"]')
    expect(await githubLinks.count()).toBeGreaterThanOrEqual(1)
  })

  test('skip to content link exists', async ({ page }) => {
    const skipLink = page.locator('.skip-to-content')
    await expect(skipLink).toBeAttached()
    await expect(skipLink).toHaveAttribute('href', '#projects')
  })

  test('carousel has aria-live region', async ({ page }) => {
    const liveRegion = page.locator('.slideIndicator[aria-live="polite"]')
    await expect(liveRegion).toBeAttached()
  })
})
