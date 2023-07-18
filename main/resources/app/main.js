import pages from './main/pages.js'
import { PageLoader, TaskIndicator } from './shared/elements.js'
import error from './main/error.js'
import Navigation from './main/Navigation.js'

customElements.define('page-loader', PageLoader)
customElements.define('task-indicator', TaskIndicator)

const shadowRoot = document.body.attachShadow({ mode: 'open' })
shadowRoot.innerHTML = '<slot></slot>'

const navigation = new Navigation(render)

let abortController = new AbortController()
let preventDefaultAnchorNavigation = true

navigator.serviceWorker
  .register('/app/service-worker.js')
  .then((reg) => {
    setInterval(() => {
      reg.update()
    }, 2 * 60 * 1000)
    reg.addEventListener('updatefound', () => {
      if (!(reg.installing instanceof ServiceWorker)) return
      reg.installing.addEventListener('statechange', (e) => {
        if (!(e.target instanceof ServiceWorker)) return
        if (e.target.state === 'activated') {
          // Do a full page reload for the next anchor click to update
          // the app.
          preventDefaultAnchorNavigation = false
        }
      })
    })
  })
  .catch((e) => {
    console.log('Failed to register service worker')
    console.error(e)
  })

document.body.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLElement)) return
  const anchor = e.target.closest('a')
  if (!(anchor instanceof HTMLAnchorElement)) return

  if (preventDefaultAnchorNavigation) {
    e.preventDefault()
    navigation.navigate(anchor.href)
  }
})

window.addEventListener('popstate', () => {
  if (!navigation.hadApplicationPush()) return
  render()
})

render()

function render() {
  abortController.abort()
  abortController = new AbortController()
  const { signal } = abortController

  /** @type {import('./main/shared/types.js').AppContext} */
  const ctx = {
    navigation,
    signal,
  }

  const pageLoader = /** @type {PageLoader} */ (
    document.createElement('page-loader')
  )

  shadowRoot.appendChild(pageLoader)

  pages(ctx)
    .catch((err) => {
      if (signal.aborted) return
      error(err, ctx)
    })
    .finally(() => {
      pageLoader.remove()
    })
}
