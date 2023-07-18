import { test, expect } from '../shared/fixture.js'
import * as clock from '../../testData/clock.js'
import { databases } from '../../testData/couchdb/data.js'

test('shows home page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Hello world!')).toBeVisible()
  await expect(
    page.getByText(
      clock.data.toLocaleDateString('de', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    )
  ).toBeVisible()
  await expect(page.locator('data#number_of_couchdb_users')).toHaveAttribute(
    'value',
    String(
      databases._users.all.rows.filter((r) =>
        r.id.startsWith('org.couchdb.user:')
      ).length
    )
  )
})
