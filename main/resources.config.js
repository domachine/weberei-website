const root = new URL('public/', import.meta.url)

export const assets = {
  root: new URL('assets', root),
  manifest: new URL('assets/manifest.json', root),
  path: '/assets',
}

export const app = {
  root: new URL('app', root),
  path: '/app',
  historyFallback: new URL('app/index.html', root),
}
