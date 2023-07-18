import { html } from '../../../vendor/htmlTemplating/lib.js'
import { layout } from '../shared/html.js'

/**
 * @param {import('../shared/types.js').Locals} locals
 * @param {object} params
 * @param {Date} params.now
 * @param {{ rows: Array<{ id: string }> }} params.userQuery
 */
export default function (locals, { now, userQuery }) {
  const numberOfUsers = userQuery.rows.filter((r) =>
    r.id.startsWith('org.couchdb.user:')
  ).length

  return html`
    ${layout(locals, {
      body: html`
        <h1 class="text-lg font-bold">Hello world!</h1>
        <p>This is a starter for a website</p>
        <p>
          Current time:
          <span
            >${now.toLocaleDateString('de', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}</span
          >
        </p>
        <p>
          Number of couchdb users:
          <data id="number_of_couchdb_users" value="${String(numberOfUsers)}"
            >${String(numberOfUsers)}</data
          >
        </p>
      `,
    })}
  `.toString()
}
