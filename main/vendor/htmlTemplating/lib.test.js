import assert from 'node:assert'
import { describe, test } from 'node:test'
import { html } from './lib.js'

describe('htmlTemplating', () => {
  test('sample html template', () => {
    assert.equal(
      html`<a> ${'my thing'} ${null}${undefined}</a>
        <ul>
          ${['a', 'b'].map((l) => html`<li>${l}</li>`)}
        </ul>
        <span>${'Hello & welcome'}</span>`.toString(),
      `<a> my thing </a>
        <ul>
          <li>a</li><li>b</li>
        </ul>
        <span>Hello &amp; welcome</span>`
    )
  })
})
