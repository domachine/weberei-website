import config from 'config'

export function getConfig() {
  return {
    website: {
      port: config.get('website.port'),
      baseUrl: config.get('website.baseUrl'),
    },
    couchDB: config.get('couchDB'),
  }
}
