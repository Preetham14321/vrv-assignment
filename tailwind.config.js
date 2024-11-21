/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js,jsx}"],
  variants: {
    scrollbar: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  theme: {
    extend: {},
    colors: {
    'solid':'#646464',
    'white':'#FFFFFF',
    'hero':'#00A78E',
    'gray':'#f5f5f9',
    'back':'#fcfcfe',
    'bor':'#1e293b'
    },
  },margin: {
    '485px': '4855px',
  },
  plugins: [],
}
