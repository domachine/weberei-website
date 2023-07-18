import { writeFile } from 'node:fs/promises'
import prettier from 'prettier'
import { fetch } from 'undici'
import assert from 'node:assert'
import { readFile } from 'node:fs/promises'
import * as sqliteHttp from '../../vendor/sqliteTestMiddleware/http.js'
import { fileURLToPath } from 'node:url'

/**
 * @param {string} baseUrl
 */
export async function saveData(baseUrl) {
  const outputFile = fileURLToPath(new URL(`data/tables.js`, import.meta.url))
  await writeFile(
    outputFile,
    prettier.format(
      `export default /** @type {const} */ (${JSON.stringify({})})`,
      {
        ...(await prettier.resolveConfig(outputFile)),
        filepath: outputFile,
      }
    )
  )
}

/**
 * @param {string} baseUrl
 */
export async function loadData(baseUrl) {
  const source = await readFile(new URL('data.sql', import.meta.url), 'utf-8')
  const r = await fetch(new URL(sqliteHttp.exec.path(), baseUrl), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ source }),
  })
  assert(r.ok, r.statusText)
}

/**
 * @param {string} baseUrl
 */
export async function loadSchema(baseUrl) {
  const r = await fetch(new URL(sqliteHttp.loadSchema.path(), baseUrl), {
    method: 'POST',
  })
  assert(r.ok, r.statusText)
}

/**
 * @param {string} baseUrl
 * @param {string} sql
 * @param {any[]} params
 */
export async function query(baseUrl, sql, ...params) {
  const r = await fetch(new URL(sqliteHttp.query.path(), baseUrl), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify([sql, ...params]),
  })
  assert(r.ok, r.statusText)
  return await r.json()
}
