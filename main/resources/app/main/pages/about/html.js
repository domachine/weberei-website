import { html } from '../../../../../vendor/htmlTemplating/lib.js'
import { layout } from '../shared/html.js'

/**
 * @param {import('../../../shared/types.js').Locals} locals
 * @param {object} params
 * @returns
 */
export default function (locals, {}) {
  return html`
    ${layout(locals, {
      activePage: 'ABOUT',
      main: html` <h2 class="block text-lg mb-3 mt-4 font-bold">About</h2> `,
    })}
  `.toString()
}
