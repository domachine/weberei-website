import html from './about/html.js'

/**
 * @param {import('../shared/types.js').AppContext} ctx
 * @param {import('../../shared/types.js').Locals} locals
 */
export default async function (ctx, locals) {
  document.body.innerHTML = html(locals, {})
}
