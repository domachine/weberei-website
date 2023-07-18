import { loadResourceManifests } from './shared/resources.js'

const resourceManifests =
  process.env.NODE_ENV === 'production' ? await loadResourceManifests() : null

/**
 * @param {import('../shared/types.js').ServerContext} ctx
 * @returns {import('express').Handler}
 */
export default function ({ config }) {
  return (_req, res, next) => {
    const locals = /** @type {import('./shared/types.js').Locals} */ (
      res.locals
    )

    locals.config = config
    if (resourceManifests) locals.resources = resourceManifests

    next()
  }
}
