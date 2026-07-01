/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': ['15px', '1.6'],
        'body-lg': ['16px', '1.6'],
        'title': ['20px', '1.2'],
        'title-lg': ['24px', '1.2'],
        'meta': ['13px', '1.4'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366F1', // Neon Indigo
          hover: '#4F46E5',
          light: '#818CF8',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
