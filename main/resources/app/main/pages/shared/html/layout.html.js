import { SafeHTML, html } from '../../../../../../vendor/htmlTemplating/lib.js'
import { baseURL } from '../../../../shared/config.js'
import * as urls from '../../../../shared/urls.js'

/**
 * @param {import('../../../../shared/types.js').Locals} locals
 * @param {object} params
 * @param {'HOME' | 'ABOUT'} params.activePage
 * @param {SafeHTML} params.main
 * @returns
 */
export default function (locals, { activePage, main }) {
  return html`
    <nav class="px-6 py-4">
      <ul class="flex gap-4">
        <li>
          <a
            class="${activePage === 'HOME' ? '' : 'underline'}"
            href="${urls.home(baseURL).href}"
            >Home</a
          >
        </li>
        <li>
          <a
            class="${activePage === 'ABOUT' ? '' : 'underline'}"
            href="${urls.about(baseURL).href}"
            >About</a
          >
        </li>
      </ul>
    </nav>
    <main class="px-6 py-1 text-sm">${main}</main>
  `
}
