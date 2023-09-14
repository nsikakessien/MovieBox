/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"DM Sans"', "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      grey: {
        100: "#666",
      },
    },
    fontSize: {
      xxs: ["0.625rem", "1rem"],
      xs: ["0.75rem", "1.125rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      md: ["1.25rem", "1.75rem"],
      lg: ["1.5rem", "2rem"],
      xl: ["2rem", "3rem"],
      xxl: ["3rem", "4rem"],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  plugins: [],
};
