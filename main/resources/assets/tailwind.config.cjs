/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    __dirname + '/../../server/**/html.js',
    __dirname + '/../../server/**/*.html.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
