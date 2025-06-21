/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Style Guide Colors - Exact matches from style_guide.json
        'background-primary': '#fafafa',
        'background-secondary': '#ffffff',
        'sidebar-bg': '#5f5168',
        'sidebar-text': '#F2F0EA',
        'sidebar-active-bg': '#ffffff',
        'sidebar-active-text': '#5f5168',
        'text-primary': '#5f5168',
        'text-secondary': '#BFA181',
        'text-positive': '#6A994E',
        'text-negative': '#BC4749',
        'kpi-primary-bg': '#5f5168',
        'kpi-primary-text': '#ffffff',
        'accent-navy': '#0A1828',
        'accent-teal': '#A8D5E3',
        'accent-gold': '#BFA181',
        'accent-aqua': '#C3FBF4',
        'accent-dark-blue': '#002349',
        'border-color': '#D9D4DB',
        
        // Keep some legacy colors for backward compatibility but prefer the above
        'muscat-primary': '#5f5168',
        'muscat-teal': '#A8D5E3',
        'muscat-gold': '#BFA181',
        'muscat-navy': '#0A1828',
        'muscat-cream': '#fafafa',
        'muscat-teal-light': '#C3FBF4',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { fontWeight: '700' }],
        'h2': ['1.75rem', { fontWeight: '600' }],
        'h3': ['1.25rem', { fontWeight: '600' }],
        'card-title': ['1rem', { fontWeight: '500' }],
        'body-large': ['1rem', { fontWeight: '400' }],
        'body-regular': ['0.875rem', { fontWeight: '400' }],
        'body-small': ['0.75rem', { fontWeight: '400' }],
        'kpi-value': ['2rem', { fontWeight: '700' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'design-system': '12px',
      },
      boxShadow: {
        'design-system': '0 4px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

