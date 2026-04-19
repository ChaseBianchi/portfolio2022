import { expect, test } from '@playwright/test'

test.describe('Portfolio homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the redesigned homepage shell', async ({ page }) => {
    await expect(page).toHaveTitle(/Chase Bianchi/)
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: /adobe platform depth\. front-end rigor\. ai-enabled execution\./i,
      }),
    ).toBeVisible()
    await expect(page.locator('#work')).toBeVisible()
    await expect(page.locator('#capabilities')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Resume', exact: true }),
    ).toBeVisible()
    await expect(page.getByRole('img', { name: /portrait of chase bianchi/i })).toBeVisible()
  })

  test('resume access is available on the homepage', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Read the resume' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open resume' })).toHaveAttribute('href', '/resume')
    await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveCount(0)
  })

  test('supports keyboard access to the main navigation', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Go to top of page' })).toBeFocused()
  })
})
