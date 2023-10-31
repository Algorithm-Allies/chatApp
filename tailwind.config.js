/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/img.jpg')",
        turg: "#264653",
      },
      colors: {
        turg: "#264653",
      },
      backgroundColor: {
        turg: "#2a9d8f",
      },
    },
  },
  plugins: [],
};
