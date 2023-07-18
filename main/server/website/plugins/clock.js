/**
 * This plugin provides a clock which is controllable over the
 * rest api. This is useful for testing.
 */

import create from '../../../vendor/testClock/create.js'

/**
 * @param {import('../../shared/types.js').ServerContext} ctx
 */
export default function clock(ctx) {
  const { clock, router } = create()
  ctx.clock = clock
  return router
}
