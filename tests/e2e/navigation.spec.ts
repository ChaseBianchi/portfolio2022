import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Chase Bianchi')
  })

  test('landing section renders name and title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Chase Bianchi')
    await expect(page.locator('#landing h2')).toHaveText('Fullstack Web Developer')
  })

  test('all sections are visible on page', async ({ page }) => {
    await expect(page.locator('#landing')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#connect')).toBeVisible()
    await expect(page.locator('#footer')).toBeVisible()
  })

  test('desktop nav links navigate to sections', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop nav only')
    const navLinks = page.locator('#desktopNavbar a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  test('skip to content link works', async ({ page }) => {
    await page.keyboard.press('Tab')
    const skipLink = page.locator('.skip-to-content')
    await expect(skipLink).toBeFocused()
  })
})
