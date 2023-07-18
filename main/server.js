import Database from 'better-sqlite3'
import { pino as Pino } from 'pino'
import migrate from './shared/migrate.js'
import website from './server/website.js'
import { getConfig } from './shared/environment.js'

const config = getConfig()

/** @type {import('./server/types.js').ServerContext} */
const ctx = {
  logger: Pino(),
  sqlite: new Database(':memory:'),
  config,
  clock: { now: () => new Date() },
}

ctx.sqlite.pragma('journal_mode = WAL')

migrate(ctx.sqlite)

website(ctx)
