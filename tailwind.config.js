/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1366px",
        "big-desktop": "1600px",
        "max-desktop": { max: "1365px" },
        "max-tablet": { max: "751px" },
        "max-nav": { max: "1280px" },
      },
      colors: {
        "blur-white": " rgb(255,255,255)",
      },
    },
  },
};
