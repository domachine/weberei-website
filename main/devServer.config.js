export const assets = {
  path: '/assets',
  port: 8080,
}

export const couchdb = /** @type {const} */ ({
  path: '/couchdb',
  pathRewrite: ['^/couchdb', ''],
  port: 5984,
})

export const app = {
  path: '/app',
  port: 8081,
}
