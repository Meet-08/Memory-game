/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: '0rem',
    },
    extend: {},
  },
  plugins: [],
}
