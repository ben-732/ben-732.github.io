/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "deep-blue": "#010105",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
