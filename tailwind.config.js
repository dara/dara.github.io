/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./info.html",
    "./index.html",
    "./src/**/*.{js,css}",
    "./apps/**/*.{html,js,css}"
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
} 