/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Muscat Bay brand colors - following the memory
        primary: {
          DEFAULT: '#5f5168',
          50: '#f5f3f7',
          100: '#ebe8ee',
          200: '#d7d0de',
          300: '#bfa8c4',
          400: '#a17fa7',
          500: '#8b6992',
          600: '#6f5375',
          700: '#5f5168',
          800: '#4d4156',
          900: '#403747',
          950: '#27212c'
        },
        teal: {
          soft: '#A8D5E3',
          light: '#C3FBF4'
        },
        beige: {
          warm: '#BFA181',
          light: '#F2F0EA'
        },
        navy: {
          muted: '#0A1828',
          deep: '#002349'
        },
        sidebar: {
          bg: '#5f5168',
          text: '#F2F0EA',
          'active-bg': '#ffffff',
          'active-text': '#5f5168'
        },
        // Module-specific colors
        electricity: '#5f5168',
        water: '#3b82f6',
        stp: '#10b981',
        reserve: '#06b6d4',
        contractor: '#f59e0b',
        // Status colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif']
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
        '2xs': '0.625rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'design-system': '12px',
      },
      boxShadow: {
        'design-system': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(95, 81, 104, 0.3)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'primary': '0 4px 12px rgba(95, 81, 104, 0.3)',
        'teal': '0 4px 12px rgba(168, 213, 227, 0.3)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(95, 81, 104, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(95, 81, 104, 0.8)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #5f5168 0%, #403747 100%)',
        'gradient-teal': 'linear-gradient(135deg, #A8D5E3 0%, #C3FBF4 100%)',
        'gradient-beige': 'linear-gradient(135deg, #BFA181 0%, #F2F0EA 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '10px'
      },
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    // Custom utilities plugin
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        },
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.05)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
    // Glass morphism utilities
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.05)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
        }
      })
    }
  ],
}

