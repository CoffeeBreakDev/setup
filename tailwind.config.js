/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust to your project's file structure
    "./src/styles/**/*.css",
  ],
  safelist: [
    'color-online',
    'color-away',
    'color-busy',
    'color-offline',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#171b21',
        },
        primaryDarkBlue: '#0D172A',
        primaryLightBlue: '#3CB6FB',
        primaryGray: '#101217',
        secondaryGray: '#171B21',
        secondaryLightGray: '#969bac',
        onlineText: 'rgb(163 230 53 / var(--tw-text-opacity))',
        awayText: 'rgb(251 191 36 / var(--tw-text-opacity))',
        busyText: 'rgb(239 68 68 / var(--tw-text-opacity))',
        offlineText: 'rgb(87 94 116 / var(--tw-text-opacity))',
        onlineText: '#34D399',  // Green
        awayText: '#FBBF24',    // Yellow
        busyText: '#EF4444',    // Red
        offlineText: '#9CA3AF', // Gray
      },
      fontFamily: {
        oswald: ['Oswald', 'Arial', 'sans-serif'],
        adamina: ['Adamina', 'serif'],
        lexend: ['Lexend Deca', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
      backgroundFade: {
        'custom-fade-gray': 'linear-gradient(130deg, #171B21 15%, #0F172A 85%, #0d1015)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}

