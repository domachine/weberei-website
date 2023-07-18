import { html } from '../../../../../vendor/htmlTemplating/lib.js'

/**
 * @param {object} params
 * @param {string} params.title
 * @param {string} params.message
 * @returns
 */
export default function ({ title, message }) {
  return html`
    <style>
      dialog {
        border: none;
        padding: 0;
      }

      #container {
        background-color: rgb(161, 240, 161);
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
        margin: 0;
        padding: 2px 5px;
        font-size: 20px;
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
          <h2 id="title" class="underline">${title}</h2>
          <button id="close_button" type="button">&times;</button>
        </div>
        <p>${message}</p>
      </section>
    </dialog>
  `.toString()
}
