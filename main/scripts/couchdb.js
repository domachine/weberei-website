import { getConfig } from '../shared/environment.js'
import * as couchdb from '../testData/couchdb.js'

const [, , cmd] = process.argv

if (cmd === 'loadData') {
  await couchdb.tasks.loadData(getConfig().couchDB)
} else if (cmd === 'saveData') {
  await couchdb.tasks.saveData(getConfig().couchDB)
}
