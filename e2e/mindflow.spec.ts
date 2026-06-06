import { test, expect } from '@playwright/test'

test.describe('MindFlow E2E', () => {
  test('landing page loads with exam student messaging', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Mental Wellness Tracker/)
    await expect(page.getByRole('link', { name: /Open App/i })).toBeVisible()
  })

  test('navigates to dashboard', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: /Exam Wellness Dashboard/i })).toBeVisible()
    await expect(page.getByText(/How are you feeling today/i)).toBeVisible()
  })

  test('mood check-in flow updates selection', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('radio', { name: 'Happy' }).click()
    await expect(page.getByRole('radio', { name: 'Happy' })).toHaveAttribute('aria-checked', 'true')
  })
})
