import express from 'express'
import { fileURLToPath } from 'node:url'
import { resources } from './shared/resources.js'

/**
 * @param {import('../shared/types.js').ServerContext} _ctx
 */
export default function (_ctx) {
  const router = express.Router()

  for (const resource of Object.values(resources)) {
    const { historyFallback } = resource

    router.use(resource.path, express.static(fileURLToPath(resource.root)))

    if (historyFallback) {
      router.use(resource.path, (req, res, next) => {
        if (
          (req.method === 'GET' || req.method === 'HEAD') &&
          req.accepts('html')
        ) {
          res.sendFile(fileURLToPath(historyFallback))
        } else next()
      })
    }
  }

  return router
}
