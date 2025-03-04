/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css}",
    "./index.html",
    "./apps/**/*.{html,js,css}"
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
} 