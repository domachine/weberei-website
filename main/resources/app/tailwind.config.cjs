/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    __dirname + '/**/html.js',
    __dirname + '/**/*.html.js',
    __dirname + '/**/*.server.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
