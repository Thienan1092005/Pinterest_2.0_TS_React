import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-red-color": "#e60023",
        "ocren-blue": "#7fc1ff",
        "pinter-gray": "#f1f1f1",
        " gray-color-300 ": "#e9e9e9",
      },
      fontFamily: {
        "sf-black": ["SF-Pro-Display-Black", "sans-serif"],
        "sf-bold": ["SF-Pro-Display-Bold", "sans-serif"],
        "sf-light": ["SF-Pro-Display-Light", "sans-serif"],
        "sf-medium": ["SF-Pro-Display-Medium", "sans-serif"],
        "sf-regular": ["SF-Pro-Display-Regular", "sans-serif"],
        "sf-thin": ["SF-Pro-Display-Thin", "sans-serif"],
        "sf-ultralight": ["SF-Pro-Display-Ultralight", "sans-serif"],
      },
      boxShadow: {
        "custom-yuki": " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
    },
  },
  plugins: [nextui()],
};
