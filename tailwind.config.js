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
      fontSize: {
        base: '20px',
        sm: '17px',
      },
      transitionDuration: {
        'default': '300ms'
      }
    },
  },
  plugins: [],
} 