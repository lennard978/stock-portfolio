import { defineConfig } from 'tailwindcss'

export default defineConfig({
  darkMode: 'class', // important: use class-based dark mode
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
})
