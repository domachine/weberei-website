import errorHtml from './TaskIndicator/error.html.js'
import loaderHtml from './TaskIndicator/loader.html.js'
import successHtml from './TaskIndicator/success.html.js'

/** @typedef {() => Promise<{ title: string; message: string } | void>} Task */

export class TaskIndicator extends HTMLElement {
  #shadowRoot
  /** @type {Task | undefined} */
  #task
  /** @type {AbortController | undefined} */
  #connectedController = new AbortController()

  constructor() {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
  }

  /**
   * @param {Task} task
   */
  set task(task) {
    this.#task = task
  }

  connectedCallback() {
    const { signal } = (this.#connectedController = new AbortController())
    this.#shadowRoot.innerHTML = loaderHtml()

    this.#task?.()
      .then(
        (flash) => {
          if (flash) {
            this.#shadowRoot.innerHTML = successHtml(flash)
          } else {
            this.remove()
          }
        },
        (err) => {
          if (signal.aborted) return
          this.#shadowRoot.innerHTML = errorHtml({ error: err })
        }
      )
      .then(() => {
        const dialog = this.#shadowRoot.querySelector('dialog')
        dialog?.addEventListener(
          'close',
          () => {
            this.remove()
          },
          { signal }
        )
        this.#shadowRoot.getElementById('close_button')?.addEventListener(
          'click',
          () => {
            dialog?.close()
          },
          { signal }
        )
        dialog?.showModal()
      })
  }

  disconnectedCallback() {
    this.#connectedController?.abort()
  }
}
