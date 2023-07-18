import html from './PageLoader/html.js'

export class PageLoader extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = html()
  }
}
