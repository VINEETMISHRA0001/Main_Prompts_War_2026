import { test, expect } from '@playwright/test'

test.describe('MindFlow Desktop OS', () => {
  test('landing page links to wellness desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Open Wellness Desktop|Start Daily Check-in/i }).first()).toBeVisible()
  })

  test('desktop OS loads with icons and console', async ({ page }) => {
    await page.goto('/desktop')
    await expect(page.getByLabel(/MindFlow wellness desktop/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Mood Check-in/i })).toBeVisible()
    await expect(page.getByRole('region', { name: /Wellness console/i })).toBeVisible()
    await expect(page.getByRole('toolbar', { name: /Taskbar/i })).toBeVisible()
  })

  test('opens mood app window from desktop icon', async ({ page }) => {
    await page.goto('/desktop')
    await page.getByRole('button', { name: /Open Mood Check-in/i }).click()
    await expect(page.getByRole('dialog', { name: /Mood Check-in/i })).toBeVisible()
  })

  test('console help command works', async ({ page }) => {
    await page.goto('/desktop')
    const input = page.getByLabel(/Console command input/i)
    await input.fill('help')
    await input.press('Enter')
    await expect(page.getByText(/Available commands/i)).toBeVisible()
  })

  test('mood check-in inside desktop window', async ({ page }) => {
    await page.goto('/desktop?app=mood')
    await expect(page.getByRole('dialog', { name: /Mood Check-in/i })).toBeVisible()
    await page.getByRole('radio', { name: 'Happy' }).click()
    await expect(page.getByRole('radio', { name: 'Happy' })).toHaveAttribute('aria-checked', 'true')
  })
})
