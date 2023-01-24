/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphism: "2px 2px 15px 2px #cacaca, -2px -2px 15px 1px #ffffff",
        blueNeumorphism: "2px 2px 8px 2px #2551c9, -2px -2px 8px 1px #316dff",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
