import { fetch } from 'undici'
import assert from 'node:assert'
import * as clockHttp from '../../vendor/testClock/http.js'

export const defaultTime = new Date('2021-11-16T23:00:00.000Z')

/**
 * @param {string} baseUrl
 */
export async function set(baseUrl) {
  const r = await fetch(new URL(clockHttp.set.path(), baseUrl), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ now: defaultTime.toISOString() }),
  })
  assert(r.ok, r.statusText)
}

/**
 * @param {string} baseUrl
 */
export async function clear(baseUrl) {
  const r = await fetch(new URL(clockHttp.clear.path(), baseUrl), {
    method: 'POST',
  })
  assert(r.ok, r.statusText)
}
