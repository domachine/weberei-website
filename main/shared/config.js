/** @typedef {import('./config/types.js').Config} Config */

/**
 * @param {Config} config
 */
export function configWebsiteBaseURL(config) {
  return new URL(config.website.baseUrl)
}
