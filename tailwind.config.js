/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        flicker: {
          "0%": {
            transform: "skewX(5deg)",
          },
          "25%": {
            transform: "skewX(-5deg)",
          },
          "50%": {
            transform: "skewX(10deg)",
          },
          "75%": {
            transform: "skewX(-10deg)",
          },
          "100%": {
            transform: "skewX(5deg)",
          },
        },
      },

      animation: {
        flicker: "flicker 1s ease-in-out alternate infinite",
      },
    },
  },

  plugins: [],
};
