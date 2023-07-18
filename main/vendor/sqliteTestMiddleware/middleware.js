/**
 * This plugin provides a very powerful api to the database which
 * can be used by tests to manage test data. It should never be used
 * in production.
 */

import express from 'express'

/**
 * @param {import('better-sqlite3').Database} database
 * @param {(db: import('better-sqlite3').Database) => void} migrate
 */
export default function (database, migrate) {
  const router = express.Router()

  router.use(
    '/_plugins/sqlite',
    express
      .Router()
      .post('/exec', express.json(), (req, res) => {
        const { source: sql } = req.body
        database.transaction(() => {
          database.exec(sql)
        })()
        res.json({ ok: true })
      })
      .post('/load-schema', (_req, res) => {
        database.pragma('foreign_keys = Off')
        try {
          database.transaction(() => {
            const objects = database
              .prepare('SELECT * FROM sqlite_schema')
              .all()
            for (const obj of objects) {
              if (obj.type !== 'table') continue
              database.prepare(`DROP TABLE "${obj.name}"`).run()
            }
            database.pragma('user_version = 0')
            migrate(database)
          })()
        } finally {
          database.pragma('foreign_keys = On')
        }
        res.json({ ok: true })
      })
      .post('/query', express.json(), (req, res) => {
        const [sql, ...params] = req.body
        const result = database.prepare(sql).all(params)
        res.json(result)
      })
  )

  return router
}
