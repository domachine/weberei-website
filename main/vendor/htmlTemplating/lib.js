import escapeHtml from 'lodash.escape'

/**
 * @param {TemplateStringsArray} strings
 * @param {(SafeHTML | string | SafeHTML[] | null | undefined)[]} placeholders
 */
export function html(strings, ...placeholders) {
  return new SafeHTML(
    String.raw(
      strings,
      ...placeholders.map((p) =>
        p instanceof SafeHTML
          ? p
          : typeof p === 'string'
          ? new SafeHTML(escapeHtml(p))
          : Array.isArray(p)
          ? new SafeHTML(p.join(''))
          : p == null
          ? ''
          : p
      )
    )
  )
}

export class SafeHTML {
  /**
   * @param {string} value
   */
  constructor(value) {
    this.#value = value
  }

  #value

  toString() {
    return this.#value
  }
}
