/**
 * @param {URL | string | undefined} baseURL
 * @returns
 */
export const home = (baseURL) => new URL('', baseURL)

/**
 * @param {URL | string | undefined} baseURL
 * @returns
 */
export const about = (baseURL) => new URL('about', baseURL)
