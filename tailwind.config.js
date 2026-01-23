/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Atkinson Hyperlegible Next', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
}