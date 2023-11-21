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
      neutral: '#331800',
      'neutral-content': '#FFE7A3',
      'base-100': '#09090b',
      'base-200': '#171618',
      'base-300': '#2e2d2f',
      'base-content': '#dca54c',
      info: '#66c6ff',
      success: '#87d039',
      warning: '#e2d562',
      error: '#ff6f6f',
    },
  },
  daisyui: {
    themes: [
      {
        Ogilvy: {
          primary: '#eb3f43',
          secondary: '#f1ff53',
          accent: '#8949ff',
          neutral: '#331800',
          'neutral-content': '#FFE7A3',
          'base-100': '#09090b',
          'base-200': '#171618',
          'base-300': '#2e2d2f',
          'base-content': '#dca54c',
          info: '#66c6ff',
          success: '#87d039',
          warning: '#e2d562',
          error: '#ff6f6f',
        },
      },
    ],
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui'), 'prettier-plugin-tailwindcss'],
};
