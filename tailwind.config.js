/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      paralucent: ['ParalucentW00', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), 'prettier-plugin-tailwindcss'],
};
