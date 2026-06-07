/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/routes/**/*.html',
    './src/routes/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a2e',
        surface: '#16213e',
        primary: '#1a73e8',
        'primary-hover': '#1558b0',
        accent: '#4caf50',
        danger: '#e57373',
        'text-muted': '#aaaaaa',
      },
      borderRadius: {
        card: '8px',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
