module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          100: '#1dca5b',
          200: '#1db954',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
