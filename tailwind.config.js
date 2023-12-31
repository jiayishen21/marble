/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'landing': "url('/landingBackground.svg')",
        'landing2': "url('/landingBackground2.png')",
      }
    },
  },
  plugins: [],
}
