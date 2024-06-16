const { theme } = require("./theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      extend: {
        ...theme,
      },
    },
  },
  plugins: [],
};
