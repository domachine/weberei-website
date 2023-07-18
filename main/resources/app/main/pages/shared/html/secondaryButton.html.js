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
      class="bg-gray-300 hover:bg-gray-400 text-slate-800 p-2 shadow"
    >
      ${text}
    </button>
  `
}
