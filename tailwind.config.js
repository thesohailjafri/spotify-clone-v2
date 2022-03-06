module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
      },
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
