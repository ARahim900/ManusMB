/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5f5168',
          light: '#7E708A',
          dark: '#3B3241',
        },
        accent: {
          DEFAULT: '#A8D5E3',
          teal: '#C3FBF4',
        },
        muscat: {
          gold: '#BFA181',
          cream: '#F2F0EA',
          navy: '#0A1828',
          deepblue: '#002349',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}