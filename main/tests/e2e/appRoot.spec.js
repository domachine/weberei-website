import { expect, test } from '../shared/fixture.js'

test('shows home page', async ({ page }) => {
  await page.goto('/app/')
  await expect(page.getByText('app: Hello world!')).toBeVisible()
  await page.locator('#do_something_async').click()
  await expect(
    page.getByRole('heading', { name: 'Task finished' })
  ).toBeVisible()
})
