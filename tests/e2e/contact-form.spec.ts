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

  test('shows success message when EmailJS API returns OK', async ({ page }) => {
    // Intercept the EmailJS API call and return a success response
    await page.route('**/api.emailjs.com/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'OK',
      })
    })

    await page.fill('#contact-name', 'Test User')
    await page.fill('#contact-email', 'test@example.com')
    await page.fill('#contact-message', 'Hello, this is a test message.')

    await page.locator('.submitBtn').click()

    await expect(page.locator('.messageNotification')).toHaveText(
      'Message sent. Talk to you soon!',
      { timeout: 5000 }
    )
  })

  test('shows error message when EmailJS API fails', async ({ page }) => {
    // Intercept the EmailJS API call and return an error
    await page.route('**/api.emailjs.com/**', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'text/plain',
        body: 'Bad Request',
      })
    })

    await page.fill('#contact-name', 'Test User')
    await page.fill('#contact-email', 'test@example.com')
    await page.fill('#contact-message', 'Hello, this is a test message.')

    await page.locator('.submitBtn').click()

    await expect(page.locator('.messageNotification')).toContainText(
      'Error',
      { timeout: 5000 }
    )
  })

  test('EmailJS env vars are present in production build', async ({ page }) => {
    // Check that the console warning about missing env vars does NOT fire
    const warnings: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'warning') warnings.push(msg.text())
    })

    await page.goto('/', { waitUntil: 'networkidle' })

    const envVarWarning = warnings.find((w) => w.includes('EmailJS environment variables'))
    expect(envVarWarning, 'EmailJS env vars should be set in the build').toBeUndefined()
  })
})
