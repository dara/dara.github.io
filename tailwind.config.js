/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_site/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm': ['"IBM Plex Sans"', 'sans-serif'],
      },
      transitionDuration: {
        'default': '300ms'
      }
    },
  },
  plugins: [],
} 