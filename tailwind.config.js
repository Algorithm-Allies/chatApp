/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#0F1011',
        'secondary':'#212426',
        'secondaryText':'#7A858C',
        'accent':'#F2F2F2'

      }
    },
  },
  plugins: [],
}

