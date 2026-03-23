/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1A2B1A',
        emerald: {
          DEFAULT: '#2D6A2D',
          hover: '#245A24',
          tint: '#E8F2E8',
        },
        'off-white': '#F5F4F0',
        'warm-grey': '#EFEDE8',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
