/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'public/index.html'
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px'
      },
      colors: {
        'dark-gray': '#191919',
        'gray': '#212121',
        'light-gray': '#282828',
        'text-light': '#F3F3F3'
      },
      backgroundImage: {
        'error-container-img': "url('/src/assets/images/bad-weather.jpg')"
      }
    }
  },
  plugins: []
};
