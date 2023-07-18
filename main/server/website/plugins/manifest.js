/**
 * This plugin reloads the manifests during development (in case they changed
 * or are not available).
 */

import { loadResourceManifests } from '../shared/resources.js'

/**
 * @param {import('../../shared/types.js').ServerContext} _ctx
 * @returns {import('express').Handler}
 */
export default function (_ctx) {
  return (_req, res, next) => {
    const locals = /** @type {import('../shared/types.js').Locals} */ (
      res.locals
    )
    loadResourceManifests()
      .then((r) => {
        locals.resources = r
        next()
      })
      .catch(next)
  }
}
