import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('MindFlow Desktop OS', () => {
  test('landing page links to wellness desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Open Wellness Desktop|Start Daily Check-in/i }).first()).toBeVisible()
  })

  test('landing page passes axe accessibility scan', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('desktop OS loads with icons and console', async ({ page }) => {
    await page.goto('/desktop')
    await expect(page.getByLabel(/MindFlow wellness desktop/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Mood Check-in/i })).toBeVisible()
    await expect(page.getByRole('region', { name: /Wellness console/i })).toBeVisible()
    await expect(page.getByRole('toolbar', { name: /Taskbar/i })).toBeVisible()
  })

  test('desktop passes axe accessibility scan', async ({ page }) => {
    await page.goto('/desktop')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('opens mood app window from desktop icon', async ({ page }) => {
    await page.goto('/desktop')
    await page.getByRole('button', { name: /Open Mood Check-in/i }).click()
    await expect(page.getByRole('dialog', { name: /Mood Check-in/i })).toBeVisible()
  })

  test('opens Sage AI from desktop icon', async ({ page }) => {
    await page.goto('/desktop')
    await page.getByRole('button', { name: /Open Sage AI/i }).click()
    await expect(page.getByRole('dialog', { name: /Sage AI/i })).toBeVisible()
  })

  test('console help command works', async ({ page }) => {
    await page.goto('/desktop')
    const input = page.getByLabel(/Console command input/i)
    await input.fill('help')
    await input.press('Enter')
    await expect(page.getByText(/Available commands/i)).toBeVisible()
  })

  test('console voice command mentions check-in', async ({ page }) => {
    await page.goto('/desktop')
    const input = page.getByLabel(/Console command input/i)
    await input.fill('voice')
    await input.press('Enter')
    await expect(page.getByRole('dialog', { name: /Voice Check-in/i })).toBeVisible()
  })

  test('mood check-in inside desktop window', async ({ page }) => {
    await page.goto('/desktop?app=mood')
    await expect(page.getByRole('dialog', { name: /Mood Check-in/i })).toBeVisible()
    await page.getByRole('radio', { name: 'Happy' }).click()
    await expect(page.getByRole('radio', { name: 'Happy' })).toHaveAttribute('aria-checked', 'true')
  })

  test('Sage AI shows suggestion chips', async ({ page }) => {
    await page.goto('/desktop?app=sage-ai')
    await expect(page.getByRole('group', { name: /Suggested wellness prompts/i })).toBeVisible()
  })
})
