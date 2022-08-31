const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "issus": "url('img/issus2.jpg')",
        "peirson": "url('img/peirson.webp')",
        "romano": "url('img/romano.jpg')",
        "wolfe": "url('img/wolfe.jpeg')",
        "cardsharps": "url('img/cardsharps.webp')",
        "trafalgar": "url('img/trafalgar.webp')",
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      )
    })
  ],
}
