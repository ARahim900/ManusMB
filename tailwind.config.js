/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Muscat Bay Brand Colors
        'muscat-primary': '#5f5168',        // Primary brand color
        'muscat-white': '#ffffff',          // Pure white
        'muscat-white-pink': '#fffeff',     // White with slight pink tint
        'muscat-white-yellow': '#fffffd',   // White with slight yellow tint
        'muscat-white-blue': '#feffff',     // White with slight blue tint
        
        // Complementary Colors
        'muscat-teal': '#A8D5E3',          // Soft teal
        'muscat-teal-light': '#C3FBF4',    // Light teal
        'muscat-gold': '#BFA181',          // Warm beige/gold
        'muscat-cream': '#F2F0EA',         // Cream/ivory
        'muscat-navy': '#0A1828',          // Deep navy
        'muscat-navy-alt': '#002349',      // Alternative navy
        
        // Semantic variations of primary
        'muscat-primary-light': '#8a7a94',
        'muscat-primary-lighter': '#b5adc0',
        'muscat-primary-dark': '#4a4055',
        'muscat-primary-darker': '#3a3142',
      }
    },
  },
  plugins: [],
}

