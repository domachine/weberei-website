import { html } from '../../../../vendor/htmlTemplating/lib.js'

/**
 * @param {object} params
 * @param {Error | null} params.error
 * @returns
 */
export default function ({ error }) {
  return html`
    <style>
      #backdrop {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
        align-items: center;
        justify-content: center;
      }

      #container {
        background-color: rgba(255, 0, 0, 0.2);
        padding: 10px 10px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1);
      }

      #headline {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
      }

      #title {
        font-weight: bold;
      }

      p {
        padding: 1px 5px;
      }
    </style>
    <div id="backdrop">
      <section id="container">
        <div id="headline">
          <span id="title">Error</span>
        </div>
        <p>Error occured during page load:</p>
        <p>${error?.message ?? error?.name ?? JSON.stringify(error)}</p>
        <p>
          <button id="reload_button" type="button">Reload</button>
        </p>
      </section>
    </div>
  `.toString()
}
