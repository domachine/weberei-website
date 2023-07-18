import express from 'express'
import { pinoHttp as PinoHttp } from 'pino-http'
import locals from './website/locals.js'
import plugins from './website/plugins.js'
import root from './website/root.js'
import resources from './website/resources.js'

/**
 * @param {import('./shared/types.js').ServerContext} ctx
 */
export default function (ctx) {
  const { logger } = ctx

  const server = express()
  const pinoHttp = PinoHttp({ logger })

  server.use(pinoHttp)
  server.use(plugins(ctx))
  server.use(resources(ctx))
  server.use(locals(ctx))
  server.use('/', root(ctx))

  const srv = server.listen(ctx.config.website.port, () => {
    logger.info(srv.address(), 'listening')
  })

  return srv
}
