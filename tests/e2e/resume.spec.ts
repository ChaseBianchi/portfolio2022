import { expect, test } from '@playwright/test'

test.describe('Resume page', () => {
  test('renders the dedicated resume route', async ({ page }) => {
    await page.goto('/resume')

    await expect(page).toHaveTitle(/Resume/)
    await expect(page.getByRole('heading', { name: 'Chase Bianchi' })).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: /enterprise cms, application engineering, accessibility, and automation\./i,
      }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: /back to portfolio/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /download pdf/i }).first()).toHaveAttribute(
      'href',
      /chase-bianchi-resume\.pdf$/,
    )
  })
})
