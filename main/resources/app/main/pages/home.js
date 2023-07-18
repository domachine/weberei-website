import task from '../shared/task.js'
import html from './home/html.js'

/**
 * @param {import('../shared/types.js').AppContext} ctx
 * @param {import('../../shared/types.js').Locals} locals
 */
export default async function (ctx, locals) {
  const { signal } = ctx

  document.body.innerHTML = html(locals, {})

  document.getElementById('do_something_async')?.addEventListener(
    'click',
    () => {
      task(async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(null)
          }, 1000)
        })
        return {
          title: 'Task finished',
          message: 'Everything is successful!',
        }
      })
    },
    { signal }
  )
}
