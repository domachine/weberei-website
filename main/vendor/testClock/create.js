/**
 * This plugin provides a clock which is controllable over the
 * rest api. This is useful for testing.
 */

import express from 'express'

export default function () {
  const router = express.Router()
  /** @type {Date | null} */
  let NOW = null

  const clock = {
    now: () => (NOW === null ? new Date() : NOW),
  }

  router.use(
    '/_plugins/clock',
    express
      .Router()
      .post('/set', express.json(), (req, res) => {
        const { now } = req.body
        NOW = new Date(now)
        res.json({ ok: true })
      })
      .post('/clear', (req, res) => {
        NOW = null
        res.json({ ok: true })
      })
  )

  return { router, clock }
}
