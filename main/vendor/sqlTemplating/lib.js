/** @typedef {SQL | string | number | Blob | Buffer} AllowedValues */

/**
 * @param {TemplateStringsArray} strings
 * @param {AllowedValues[]} placeholders
 */
export function sql(strings, ...placeholders) {
  return new SafeSQL(strings, placeholders)
}

export class SQL {
  /**
   * @param {unknown[]} _placeholders
   * @returns {string}
   */
  render(_placeholders) {
    throw new Error('render() not implemented')
  }
}

export class SafeSQL extends SQL {
  #strings
  #placeholders

  /**
   * @param {TemplateStringsArray} strings
   * @param {AllowedValues[]} placeholders
   */
  constructor(strings, placeholders) {
    super()
    this.#strings = strings
    this.#placeholders = placeholders
  }

  toObject() {
    const placeholders = /** @type {unknown[]} */ ([])
    return /** @type {const} */ ([this.render(placeholders), placeholders])
  }

  /**
   * @param {unknown[]} placeholders
   * @returns {string}
   */
  render(placeholders) {
    return String.raw(
      this.#strings,
      ...this.#placeholders.map((p) => {
        if (p instanceof SQL) return p.render(placeholders)
        placeholders.push(p)
        return '?'
      })
    )
  }
}

/**
 * @param {unknown[]} sql
 * @param {SQL} defaultValue
 */
export function sqlAnd(sql, defaultValue) {
  return new SafeSQLAnd(sql, defaultValue)
}

export class SafeSQLAnd extends SQL {
  #sql
  #defaultValue

  /**
   * @param {unknown[]} sql
   * @param {SQL} defaultValue
   */
  constructor(sql, defaultValue) {
    super()
    this.#sql = sql
    this.#defaultValue = defaultValue
  }

  /** @param {unknown[]} placeholders */
  render(placeholders) {
    const sql = this.#sql
      .filter(
        /** @returns {s is SQL} */
        (s) => s instanceof SQL
      )
      .map((s) => s.render(placeholders))

    return sql.length
      ? sql.join(' AND ')
      : this.#defaultValue.render(placeholders)
  }
}
