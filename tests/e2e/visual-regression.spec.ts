import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('full page desktop screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('full-page-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    })
  })

  test('full page mobile screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('full-page-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    })
  })

  test('landing section screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const landing = page.locator('#landing')
    await expect(landing).toHaveScreenshot('landing-section.png', {
      maxDiffPixelRatio: 0.05,
    })
  })

  test('projects section screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const projects = page.locator('#projects')
    await expect(projects).toHaveScreenshot('projects-section.png', {
      maxDiffPixelRatio: 0.05,
    })
  })

  test('about section screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const about = page.locator('#about')
    await expect(about).toHaveScreenshot('about-section.png', {
      maxDiffPixelRatio: 0.05,
    })
  })
})
