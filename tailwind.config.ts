import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    borderRadius: {
      md: '0.375rem',
      lg: '1.25rem',
      full: '9999rem'
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'axone-bg-dark': '#071622',
        'axone-dark-blue': '#00213A',
        'axone-dark-blue-2': '#0062AC',
        'axone-orange': '#FB9501',
        'axone-grey': '#CCD3D6',
        'axone-khaki': '#66777E',
        'axone-box-border': 'rgba(255, 255, 255, 0.06)',
        'axone-light-blue': '#D8FAFF',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;