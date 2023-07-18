import { spawn } from 'node:child_process'

spawn('npm', ['run', process.argv.slice(2)[0]], { stdio: 'inherit' }).on(
  'exit',
  (code) => {
    process.exitCode = code ?? undefined
  }
)
