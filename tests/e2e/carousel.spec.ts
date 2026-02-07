import { test, expect } from '@playwright/test'

test.describe('Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows slide indicator starting at 1', async ({ page }) => {
    await expect(page.locator('.slideIndicator')).toContainText('1 of')
  })

  test('right arrow advances carousel', async ({ page }) => {
    await page.click('[aria-label="Next project"]')
    await expect(page.locator('.slideIndicator')).toContainText('2 of')
  })

  test('left arrow is disabled at first slide', async ({ page }) => {
    await expect(page.locator('[aria-label="Previous project"]')).toBeDisabled()
  })

  test('can navigate to last slide', async ({ page }) => {
    const rightArrow = page.locator('[aria-label="Next project"]')
    // Click through all slides
    for (let i = 0; i < 7; i++) {
      await rightArrow.click()
    }
    await expect(page.locator('.slideIndicator')).toContainText('8 of 8')
    await expect(rightArrow).toBeDisabled()
  })

  test('carousel has correct ARIA attributes', async ({ page }) => {
    const carousel = page.locator('[aria-roledescription="carousel"]')
    await expect(carousel).toBeVisible()
    await expect(carousel).toHaveAttribute('role', 'region')
  })
})
