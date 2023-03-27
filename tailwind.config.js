/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Montserrat",
    },
    extend: {
      backgroundColor: {
        primary: "rgba(17, 24, 39, 1)",
        secondary: "rgba(127, 29, 29, 1)",
        gray: "#eee",
      },
    },
  },
  plugins: [],
};
