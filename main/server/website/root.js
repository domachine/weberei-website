import { Router } from 'express'
import html from './root/html.js'
import nano from 'nano'

/**
 * @param {import('../shared/types.js').ServerContext} ctx
 * @returns
 */
export default function (ctx) {
  const router = Router()

  router.get('/', (_req, res, next) => {
    const locals = /** @type {import('./shared/types.js').Locals} */ (
      res.locals
    )
    nano(ctx.config.couchDB)
      .use('_users')
      .list()
      .then((userQuery) => {
        res.send(html(locals, { now: ctx.clock.now(), userQuery }))
      })
  })

  return router
}
