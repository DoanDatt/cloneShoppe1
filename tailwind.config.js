/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        red1: '#f53d2d',
        orange1: '#f63'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
