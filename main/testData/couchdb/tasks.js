import glob from 'glob'
import Nano from 'nano'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { fileURLToPath } from 'url'
import prettier from 'prettier'

/**
 * @param {import('nano').Configuration | string} config
 */
export async function loadData(config) {
  const nano = Nano(config)
  const path = fileURLToPath(new URL('json', import.meta.url))

  for (const db of glob.sync('*.json', { cwd: path })) {
    const dbName = basename(db, '.json')
    const json = JSON.parse(await readFile(resolve(path, db), 'utf-8'))
    if (!dbName.startsWith('_')) {
      await nano.db.destroy(dbName).catch((err) => {
        if (err.statusCode !== 404) throw err
      })
      /** @type {any} */
      let err
      do {
        err = await nano.db.create(dbName).then(
          () => null,
          (e) => e
        )
        if (err && err.statusCode !== 412) throw err
      } while (err?.statusCode === 412)
    }
    await nano.use(dbName).bulk({
      docs: json.docs,
    })
    if (json.security) {
      await nano.request({
        db: dbName,
        path: '/_security',
        body: json.security,
        method: 'PUT',
      })
    }
  }
}

/**
 * @param {import('nano').Configuration} config
 * @returns
 */
export async function saveData(config) {
  const nano = Nano(config)

  await writeJSON()
  await writeJS()

  return {}

  async function writeJS() {
    const dataFile = fileURLToPath(
      new URL('data/databases.js', import.meta.url)
    )
    const dbs = await nano.request({ path: '/_all_dbs' })
    /** @type {Array<{ name: string; docs: { all: string[] } }>} */
    const userdbs = []

    for (const db of dbs) {
      if (db.startsWith('userdb-')) {
        userdbs.push({
          name: db,
          docs: {
            all: (await nano.use(db).list()).rows.map((r) => r.id),
          },
        })
      }
    }

    await writeFile(
      dataFile,
      prettier.format(
        `export default ${JSON.stringify({
          _users: {
            all: await nano.use('_users').list(),
          },
          userdbs,
        })}`,
        {
          ...(await prettier.resolveConfig(dataFile)),
          filepath: dataFile,
        }
      )
    )
  }

  async function writeJSON() {
    const outDir = fileURLToPath(new URL('json', import.meta.url))
    const dbs = await nano.request({ path: '/_all_dbs' })

    await mkdir(outDir, { recursive: true })
    for (const db of dbs) {
      if (db.startsWith('_')) continue

      const docs = await nano
        .use(db)
        .list(/** @type {any} */ ({ include_docs: true, attachments: true }))

      const json = {
        security: await nano.request({ db, path: '/_security' }),
        docs: docs.rows.map((row) => {
          const doc = { ...row.doc }
          const attachments = doc._attachments ?? {}
          for (const key of Object.keys(attachments)) {
            for (const attName of Object.keys(attachments[key])) {
              if (attName === 'data' || attName === 'content_type') continue
              delete attachments[key][attName]
            }
          }
          delete doc._rev
          return doc
        }),
      }

      await writeFile(join(outDir, `${db}.json`), JSON.stringify(json, null, 2))
    }
  }
}
