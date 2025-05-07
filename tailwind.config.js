/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        barlow: ["var(--font-barlow)", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
