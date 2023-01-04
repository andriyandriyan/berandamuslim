const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './hooks/*.tsx',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ecf6',
          100: '#bfd0e9',
          200: '#95b1db',
          300: '#6b91cc',
          400: '#4b7ac1',
          500: '#2b62b6',
          600: '#265aaf',
          700: '#2050a6',
          800: '#1a469e',
          900: '#10348e',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
