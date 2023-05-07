/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const daisyui = require('daisyui');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ['dracula'],
  },
};
