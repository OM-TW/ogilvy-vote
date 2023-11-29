/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ...fontFamily,
      paralucent: ['ParalucentText', 'sans-serif'],
      FZLanTingHeiT: ['FZLanTingHeiT-H-GB', 'sans'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), 'prettier-plugin-tailwindcss'],
};
