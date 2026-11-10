import { expect, test } from '@playwright/test'

const noHorizontalScroll = () => document.documentElement.scrollWidth <= innerWidth

test('homepage shows the current role and career path', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Chase Bianchi.*Forward Deployed Engineer/)
  await expect(page.getByRole('link', { name: 'Chase Bianchi home' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Turning AI into dependable, everyday engineering.')
  const role = page.getByRole('complementary', { name: 'Current role' })
  await expect(role).toContainText('Associate Director, Senior Forward Deployed Engineer')
  await expect(role).toContainText('Vista Equity Partners')
  await expect(page.getByRole('heading', { name: 'Professional poker player', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /GitHub · Personal/ })).toHaveAttribute('href', 'https://github.com/ChaseBianchi')
  expect(await page.evaluate(noHorizontalScroll)).toBe(true)
})

test('a case study opens from the work list and returns to it', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /AI Hub/ }).click()
  await expect(page).toHaveURL(/\/work\/ai-hub\/$/)
  await expect(page.getByRole('heading', { name: 'Team knowledge that travels between tools.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What shipped.' })).toBeVisible()
  expect(await page.evaluate(noHorizontalScroll)).toBe(true)
  await page.getByRole('link', { name: '← Selected work' }).click()
  await expect(page).toHaveURL(/\/#work$/)
})

test('the delivery walkthrough advances through its approval gates', async ({ page }) => {
  await page.goto('/work/agentic-delivery/')
  const next = page.locator('.pipeline-next')
  await next.click()
  await expect(next).toContainText('Approve the plan')
  await expect(page.locator('.flow-step.active')).toContainText('Plan reviewed')
})

test('resume page lists the new role and offers the PDF', async ({ page }) => {
  await page.goto('/resume')
  await expect(page).toHaveTitle(/Resume/)
  await expect(page.getByRole('heading', { name: 'Chase Bianchi', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Vista Equity Partners' })).toBeVisible()
  await expect(page.getByText('Nov 2026 - Present')).toBeVisible()
  await expect(page.getByText('Jun 2022 - Oct 2026')).toBeVisible()
  await expect(page.getByRole('link', { name: /Download PDF/ })).toHaveAttribute('href', '/assets/chase-bianchi-resume.pdf')
  expect(await page.evaluate(noHorizontalScroll)).toBe(true)
})

test('resume PDF is available', async ({ request }) => {
  const response = await request.get('/assets/chase-bianchi-resume.pdf')
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
})

test('a delivery run needs the visitor at both gates before it ships', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Brief me on Chase/ }).click()
  await page.getByRole('button', { name: 'Approve plan' }).click()
  await expect(page.locator('.deliverable')).toHaveCount(0)
  await page.getByRole('button', { name: 'Ship it' }).click()
  await expect(page.locator('.deliverable')).toContainText('The 30-second brief')
  await expect(page.locator('[data-run-status]')).toHaveText('Shipped')
  expect(await page.evaluate(noHorizontalScroll)).toBe(true)
})

test('the decision lab plays one hand, then a thousand', async ({ page }) => {
  await page.goto('/#lab')
  await page.getByRole('button', { name: 'Next scenario' }).click()
  await expect(page.locator('[data-lab-count]')).toHaveText(/^Scenario 2 of \d+$/)
  await page.getByRole('button', { name: 'Previous scenario' }).click()
  await page.locator('[data-lab-bet]').fill('100')
  await expect(page.locator('[data-lab-bettext]')).toContainText('Call $100 to win $200')
  await expect(page.getByRole('button', { name: 'Call $100' })).toBeVisible()
  await page.getByRole('button', { name: '½ pot' }).click()
  await expect(page.getByRole('button', { name: 'Call $50' })).toBeVisible()
  await page.getByRole('button', { name: 'Pot', exact: true }).click()
  await page.getByRole('button', { name: 'Fold', exact: true }).click()
  await expect(page.locator('.lab-verdict strong')).toHaveText('Good fold.')
  await expect(page.locator('.lab-verdict')).toContainText('Calling, 1,000 hands')
})

test('theme follows the system setting, and the toggle overrides and persists', async ({ browser }) => {
  for (const [colorScheme, other] of [['dark', 'light'], ['light', 'dark']] as const) {
    const context = await browser.newContext({ colorScheme })
    const page = await context.newPage()
    await page.goto('/work/ai-hub/')
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', colorScheme)
    const menu = page.getByRole('button', { name: 'Menu' })
    if (await menu.isVisible()) await menu.click()
    await page.getByRole('button', { name: `Switch to ${other} mode` }).click()
    await expect(html).toHaveAttribute('data-theme', other)
    const paper = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(paper).toBe(other === 'dark' ? 'rgb(17, 19, 21)' : 'rgb(243, 239, 230)')
    await page.goto('/')
    await expect(html).toHaveAttribute('data-theme', other)
    await context.close()
  }
})

test('the top bar hides on the way down, returns on the way up, and marks the section in view', async ({ page }) => {
  await page.goto('/')
  const bar = page.locator('[data-topbar]')
  await expect(bar).toHaveClass(/dark/)
  await page.evaluate(() => document.querySelector('#lab')!.scrollIntoView({ behavior: 'instant' }))
  await expect(bar).toHaveClass(/hidden/)
  await page.mouse.wheel(0, -200)
  await expect(bar).not.toHaveClass(/hidden/)
  await expect(bar).not.toHaveClass(/dark/)
  await expect(bar).toBeInViewport()
  await expect(page.locator('#nav-links a[aria-current]')).toHaveAttribute('href', /#(path|lab)$/)
})