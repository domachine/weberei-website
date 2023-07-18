import { baseURL } from '../shared/config.js'
import * as urls from '../shared/urls.js'
import about from './pages/about.js'
import home from './pages/home.js'

/**
 * @param {import('./shared/types.js').AppContext} ctx
 */
export default async function root(ctx) {
  /** @type {import('../shared/types.js').Locals} */
  const locals = {}

  const { pathname } = new URL(
    window.location.href.slice(baseURL.href.length),
    new URL('/', window.location.href)
  )

  if (pathname === '/') {
    return home(ctx, locals)
  } else if (pathname === '/about') {
    return about(ctx, locals)
  }

  ctx.navigation.navigate(urls.home(baseURL).href, { history: 'replace' })
}
