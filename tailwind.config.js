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
        gray: "#eee",
      },
    },
  },
  plugins: [],
};
