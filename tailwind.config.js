/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        landing: "url('/landingBackground.svg')",
        landing2: "url('/landingBackground2.png')",
      },
      colors: {
        lightblue: "#a4c5cc",
        moonstone: "#79adbb",
        airforce: "#5687a8",
        lapis: "#2f5a8d",
        semiblack: "#1e252e",
        intermediate: "#6a80af", //change this later!
      },
    },
  },
  plugins: [],
};
