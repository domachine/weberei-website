import { getConfig } from '../shared/environment.js'
import * as sqlite from '../testData/sqlite.js'

const config = getConfig()

const [, , command] = process.argv
if (command === 'loadSchema') {
  await sqlite.tasks.loadSchema(config.website.baseUrl)
} else if (command === 'syncData') {
  await sqlite.tasks.loadData(config.website.baseUrl)
  await sqlite.tasks.saveData(config.website.baseUrl)
}
