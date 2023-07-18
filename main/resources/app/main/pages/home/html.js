import { html } from '../../../../../vendor/htmlTemplating/lib.js'
import { layout, primaryButton } from '../shared/html.js'

/**
 * @param {import('../../../shared/types.js').Locals} locals
 * @param {object} params
 * @returns
 */
export default function (locals, {}) {
  return html`
    ${layout(locals, {
      activePage: 'HOME',
      main: html`
        <h2 class="block text-lg mb-3 mt-4 font-bold">app: Hello world!</h2>
        <div>
          ${primaryButton(
            { type: 'button', id: 'do_something_async' },
            'Do something async'
          )}
        </div>
      `,
    })}
  `.toString()
}
