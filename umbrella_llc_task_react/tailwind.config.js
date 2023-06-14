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
        'secondaryButton':'#2f7f30',
        'text':'#f1f9f0',
        'darker':'#1e461b'
      },
      boxShadow:{
        'card':'0 2px 7px #dfdfdf'
      },
      fontFamily:{
        'abezze':[ 'ABeeZee', 'sans-serif'],
        'didot':[ 'Bona Nova', 'serif'],
        'poppins':['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}