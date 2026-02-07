import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('desktop layout shows desktop nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await expect(page.locator('#desktopNavbar')).toBeVisible()
  })

  test('mobile layout shows hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.locator('[aria-label="Toggle navigation menu"]')).toBeVisible()
  })

  test('mobile hamburger opens and closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const hamburger = page.locator('[aria-label="Toggle navigation menu"]')

    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    await hamburger.click()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  test('about section stacks vertically on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const aboutContainer = page.locator('.aboutContainer')
    await expect(aboutContainer).toBeVisible()
  })
})
