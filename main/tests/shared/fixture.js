import { expect, test as baseTest } from '@playwright/test'
import * as sqlite from '../../testData/sqlite.js'
import * as clock from '../../testData/clock.js'
import * as couchDB from '../../testData/couchdb.js'
import { getConfig } from '../../shared/environment.js'

const test = baseTest.extend({
  async page({ page }, use) {
    await clock.tasks.set(getConfig().website.baseUrl)
    await sqlite.tasks.loadData(getConfig().website.baseUrl)
    await couchDB.tasks.loadData(getConfig().couchDB)
    await use(page)
    await clock.tasks.clear(getConfig().website.baseUrl)
  },
})

export { expect, test }
