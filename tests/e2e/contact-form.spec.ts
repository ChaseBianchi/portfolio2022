import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('form fields are visible', async ({ page }) => {
    await expect(page.locator('#contact-name')).toBeVisible()
    await expect(page.locator('#contact-email')).toBeVisible()
    await expect(page.locator('#contact-message')).toBeVisible()
  })

  test('form fields are required', async ({ page }) => {
    await expect(page.locator('#contact-name')).toHaveAttribute('required', '')
    await expect(page.locator('#contact-email')).toHaveAttribute('required', '')
    await expect(page.locator('#contact-message')).toHaveAttribute('required', '')
  })

  test('labels are associated with inputs', async ({ page }) => {
    await expect(page.locator('label[for="contact-name"]')).toHaveText('Name')
    await expect(page.locator('label[for="contact-email"]')).toHaveText('Email')
    await expect(page.locator('label[for="contact-message"]')).toHaveText('Message')
  })

  test('form can be filled out', async ({ page }) => {
    await page.fill('#contact-name', 'Test User')
    await page.fill('#contact-email', 'test@example.com')
    await page.fill('#contact-message', 'Test message')

    await expect(page.locator('#contact-name')).toHaveValue('Test User')
    await expect(page.locator('#contact-email')).toHaveValue('test@example.com')
    await expect(page.locator('#contact-message')).toHaveValue('Test message')
  })

  test('submit button exists', async ({ page }) => {
    await expect(page.locator('.submitBtn')).toBeVisible()
  })
})
