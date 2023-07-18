const pkg = require('./package.json')

const apps = Object.entries(pkg.scripts)
  .filter(([name]) => name.startsWith('dev:'))
  .map(([name]) => ({
    name: name.split(':')[1],
    script: './scripts/npm.mjs',
    args: [name],
  }))

module.exports = { apps }
