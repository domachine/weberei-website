import { expect, test } from '../shared/fixture.js'

test('shows about page', async ({ page }) => {
  await page.goto('/app/')
  await page.getByRole('link', { name: 'About' }).click()
  await expect(
    page.getByRole('heading', { name: 'About', level: 2 })
  ).toBeVisible()
})
