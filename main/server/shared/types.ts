import { Config } from '../../shared/config.js'

export interface ServerContext {
  logger: import('pino').Logger
  sqlite: import('better-sqlite3').Database
  config: Config
  clock: { now(): Date }
}
