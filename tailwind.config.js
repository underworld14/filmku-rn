/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "text-regular": "Mulish_400Regular",
        "text-medium": "Mulish_500Medium",
        "text-bold": "Mulish_700Bold",
        "title-regular": "Merriweather_400Regular",
        "title-bold": "Merriweather_700Bold",
      },
      fontSize: {
        ss: "0.625rem",
      },
    },
  },
  plugins: [],
};
