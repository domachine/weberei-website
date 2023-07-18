import { html } from '../../../../../vendor/htmlTemplating/lib.js'

/**
 * @param {object} params
 * @param {Error | null} params.error
 * @returns
 */
export default function ({ error }) {
  return html`
    <style>
      dialog {
        padding: 0;
        border: none;
      }

      #container {
        background-color: rgb(255, 165, 165);
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

      #close_button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 20px;
      }

      p {
        padding: 1px 5px;
      }
    </style>
    <dialog>
      <section id="container">
        <div id="headline">
          <span id="title" class="underline">Error</span>
          <button id="close_button" type="button">&times;</button>
        </div>
        <p>Error occured during task:</p>
        <p>${error?.message ?? error?.name ?? JSON.stringify(error)}</p>
      </section>
    </dialog>
  `.toString()
}
