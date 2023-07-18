import { readFile } from 'node:fs/promises'
import * as resources from '../../../resources.config.js'

/**
 * @typedef {object} Resource
 * @property {URL} [manifest]
 * @property {URL} root
 * @property {string} path
 * @property {URL} [historyFallback]
 */

/** @typedef {Record<keyof typeof resources, Record<string, string>>} ResourceMap */

/** @satisfies {Record<string, Resource>} */
const _resources = resources

export { _resources as resources }

export async function loadResourceManifests() {
  const resourceManifests =
    /** @type {Record<keyof typeof resources, Record<string, string>>} */ ({})
  const resourceEntries =
    /** @type {Array<[keyof typeof resources, Resource]>} */ (
      Object.entries(resources)
    )

  for (const [name, { manifest }] of resourceEntries) {
    if (manifest === undefined) continue
    resourceManifests[name] = new Proxy(
      await readFile(manifest, 'utf-8').then((m) => JSON.parse(m)),
      {
        get(manifest, p) {
          if (!Object.hasOwn(manifest, p))
            throw new Error(`Resource ${name}['${String(p)}'] not found`)
          return manifest[p]
        },
      }
    )
  }

  return resourceManifests
}
