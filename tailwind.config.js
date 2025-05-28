/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#18191A',
        surface: '#242526',
        primary: '#E4E6EB', 
        secondary: '#B0B3B8',
      }
    },
  },
  plugins: [],
}

