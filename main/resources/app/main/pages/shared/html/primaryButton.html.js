import { SafeHTML, html } from '../../../../../../vendor/htmlTemplating/lib.js'

/**
 * @param {object} params
 * @param {string} params.type
 * @param {string} params.id
 * @param {SafeHTML | string} text
 */
export default function ({ type, id }, text) {
  return html`
    <button
      type="${type}"
      id="${id}"
      class="bg-slate-800 hover:bg-gray-300 hover:text-slate-800 text-white p-2 shadow"
    >
      ${text}
    </button>
  `
}
