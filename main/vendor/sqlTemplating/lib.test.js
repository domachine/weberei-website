import assert from 'node:assert'
import { describe, test } from 'node:test'
import { sql, sqlAnd } from './lib.js'

describe('sqlTemplating', function () {
  describe('can generate sql queries', function () {
    test('simple query', function () {
      assert.deepEqual(
        sql`

SELECT * FROM foobar WHERE title = ${'fooinger'} AND ${sql`more = ${'false'}`}

`.toObject(),
        [
          `

SELECT * FROM foobar WHERE title = ? AND more = ?

`,
          ['fooinger', 'false'],
        ]
      )
    })

    test('query with and', function () {
      assert.deepEqual(
        sql`

SELECT * FROM foobar WHERE ${sqlAnd(
          [sql`title = ${'fooinger'}`, sql`more = ${'false'}`],
          sql`true`
        )}

`.toObject(),
        [
          '\n\nSELECT * FROM foobar WHERE title = ? AND more = ?\n\n',
          ['fooinger', 'false'],
        ]
      )
    })

    test('query with optional and', function () {
      assert.deepEqual(
        sql`

SELECT * FROM foobar WHERE ${sqlAnd(
          [sql`title = ${'fooinger'}`, '', 123, sql`more = ${'false'}`, false],
          sql`true`
        )}

`.toObject(),
        [
          '\n\nSELECT * FROM foobar WHERE title = ? AND more = ?\n\n',
          ['fooinger', 'false'],
        ]
      )
    })

    test('query with default value in and', function () {
      assert.deepEqual(
        sql`

SELECT * FROM foobar WHERE ${sqlAnd([false, false], sql`true`)}

`.toObject(),
        ['\n\nSELECT * FROM foobar WHERE true\n\n', []]
      )
    })
  })
})
