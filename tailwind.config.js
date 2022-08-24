/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "issus": "url('img/issus2.jpg')",
        "peirson": "url('img/peirson.jpg')",
        "romano": "url('img/romano.jpg')",
        "wolfe": "url('img/wolfe.jpeg')",
        "cardsharps": "url('img/cardsharps.jpg')",
      }
    },
  },
  plugins: [],
}
