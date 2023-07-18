import { configWebsiteBaseURL } from '../../../../shared/config.js'
import { html } from '../../../../vendor/htmlTemplating/lib.js'

/**
 * @param {import('../shared/types.js').Locals} locals
 * @param {object} params
 * @param {import('../../../../vendor/htmlTemplating/lib.js').SafeHTML} params.body
 */
export default function layout(locals, { body }) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <base href="${configWebsiteBaseURL(locals.config).href}" />
        <link
          rel="stylesheet"
          href="${locals.resources.assets['website.css']}"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="${locals.resources.assets['favicon.ico']}"
        />
      </head>
      <body class="font-sans">
        ${body}
      </body>
    </html>
  `
}
