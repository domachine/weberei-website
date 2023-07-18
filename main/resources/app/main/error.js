import pageErrorHtml from './error/html.js'

/**
 * @param {unknown} error
 * @param {import("./shared/types.js").AppContext} ctx
 */
export default function (error, { signal, navigation }) {
  document.body.innerHTML = pageErrorHtml({ error: /** @type {any} */ (error) })

  document.getElementById('reload_button')?.addEventListener(
    'click',
    () => {
      navigation.reload()
    },
    { signal }
  )
}
