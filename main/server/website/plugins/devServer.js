import express from 'express'
import { request } from 'http'
import { pipeline } from 'stream/promises'

const configModule = await import('../../../devServer.config.js').catch(
  () => null
)
const proxyConfigs = configModule ? Object.values(configModule) : []

/**
 * @param {import('../../shared/types.js').ServerContext} ctx
 */
export default function devServer(ctx) {
  const { logger } = ctx

  const router = express.Router()

  for (const { path, ...config } of proxyConfigs) {
    logger.info(config, 'mounting dev server proxy')
    router.use(path, proxyMiddleware({ config }))
  }

  return router
}

/**
 * @param {object} params
 * @param {object} params.config
 * @param {string} [params.config.socket]
 * @param {number | string} [params.config.port]
 * @param {readonly [string, string]} [params.config.pathRewrite]
 * @returns {import('express').Handler}
 */
function proxyMiddleware({ config: { socket, port, pathRewrite } }) {
  return (req, res, next) => {
    pipeline(
      req,
      request(
        {
          ...(typeof socket === 'string'
            ? { socketPath: socket }
            : { host: '127.0.0.1', port: port }),
          method: req.method,
          path: pathRewrite
            ? req.originalUrl.replace(
                new RegExp(pathRewrite[0]),
                pathRewrite[1]
              )
            : req.originalUrl,
          headers: req.headers,
        },
        (r) => {
          for (const [key, value] of Object.entries(r.headers)) {
            if (value === undefined) continue
            res.setHeader(key, value)
          }
          if (r.statusCode !== undefined) res.status(r.statusCode)
          pipeline(r, res).catch(next)
        }
      )
    ).catch(next)
  }
}
