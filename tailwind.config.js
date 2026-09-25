/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: { 20: '#813993' },
        orange: { 20: '#FCCB07' },
        forest: { 50: '#f2f7f5', 100: '#dfece7', 600: '#216b5b', 700: '#1b574b', 800: '#18463d', 900: '#163f36' },
        sand: { 50: '#fbfaf7', 100: '#f4efe6', 400: '#cfb782' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        kaushan: ['"Kaushan Script"', 'cursive'],
      },
      boxShadow: { soft: '0 24px 70px -30px rgb(22 63 54 / 0.35)' },
    },
  },
  plugins: [],
}
