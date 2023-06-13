/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'lightBlue':'#8AA29E',
        'charocal':'#3D5467',
        'smokewhite':'#F1EDEE',
        'mainButton':'#214e1d',
        'secondaryButton':'#214e1d',
        'text':'#f1f9f0'
      }
    },
  },
  plugins: [],
}