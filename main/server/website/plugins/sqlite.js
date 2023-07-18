/**
 * This plugin provides a very powerful api to the sqlite which
 * can be used by tests to manage test data. It should never be used
 * in production.
 */

import migrate from '../../../shared/migrate.js'
import middleware from '../../../vendor/sqliteTestMiddleware/middleware.js'

/**
 * @param {import('../../shared/types.js').ServerContext} ctx
 */
export default function sqlite(ctx) {
  return middleware(ctx.sqlite, migrate)
}
