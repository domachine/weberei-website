export default class Navigation {
  #render
  #applicationPush = false

  /**
   * @param {() => void} render
   */
  constructor(render) {
    this.#render = render
  }

  /**
   * @param {string} url
   * @param {object} [options]
   * @param {'replace'} [options.history]
   */
  navigate(url, { history } = {}) {
    if (url !== window.location.href) {
      this.#applicationPush = true
      if (history === 'replace') {
        window.history.replaceState(null, '', url)
      } else {
        window.history.pushState(null, '', url)
      }
    }
    this.#render()
  }

  reload() {
    this.#render()
  }

  hadApplicationPush() {
    return this.#applicationPush
  }
}
