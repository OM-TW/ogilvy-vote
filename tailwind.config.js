/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      paralucent: ['ParalucentW00', 'sans-serif'],
    },
    colors: {
      primary: '#eb3f43',
      secondary: '#f1ff53',
      accent: '#8949ff',
      neutral: '#000000',
      'base-100': '#ffffff',
    },
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui'), 'prettier-plugin-tailwindcss'],
};
