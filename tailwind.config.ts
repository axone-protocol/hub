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
      innerBox: '0.625rem',
      lg: '1.25rem',
      full: '9999rem'
    },
    extend: {
      backgroundImage: () => ({
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      }),
      screens: {
        'desktop': '1440px',
        'mobile': '320px',
      },
      fontSize: {
        '10': '0.625rem',
        '16': '1rem',
        '18': '1.125rem',
        '20': '1.25rem',
        '40': '2.5rem',
      },
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
        'axone-blue': '#41AEED',
        'axone-dark-blue': '#00213A',
        'axone-dark-blue-2': '#0062AC',
        'axone-dark-blue-3': '#071A28',
        'axone-orange': '#FB9501',
        'axone-red': '#DC4E4E',
        'axone-green': '#63D18E',
        'axone-grey': '#CCD3D6',
        'axone-grey-2': '#292929',
        'axone-khaki': '#66777E',
        'axone-box-border': 'rgba(255, 255, 255, 0.06)',
        'axone-light-blue': '#D8FAFF',
        'axone-light-blue-2': '#35BCC3',
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')
  ],
} satisfies Config;

export default config;