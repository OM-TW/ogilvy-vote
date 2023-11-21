/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      paralucent: ['ParalucentW00', 'sans-serif'],
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-tertiary)',
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

  plugins: [
    require('@tailwindcss/typography'),
    'prettier-plugin-tailwindcss',
    function ({ addBase }) {
      addBase({
        ':root': {
          '--color-primary': 'rgb(235, 63, 67)',
          '--color-secondary': 'rgb(241, 255, 83)',
          '--color-tertiary': 'rgb(137, 73, 255)',
        },
        '@supports (color: color(display-p3 1 1 1))': {
          ':root': {
            '--color-primary':
              'color(display-p3 0.92156862745098 0.247058823529412 0.262745098039216)',
            '--color-secondary': 'color(display-p3 0.945098039215686 1 0.325490196078431)',
            '--color-tertiary': 'color(display-p3 0.537254901960784 0.286274509803922 1)',
          },
        },
      });
    },
  ],
};
