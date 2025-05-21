/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jowers-blue': '#1e70b7',
        'jowers-light-blue': '#89bbe3',
        'jowers-dark': '#0a1c34',
        'jowers-navy': '#0a1c34'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['Brush Script MT', 'cursive']
      }
    },
  },
  plugins: [],
}