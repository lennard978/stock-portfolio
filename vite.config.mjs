import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace <your-username> with your GitHub username
export default defineConfig({
  plugins: [react()],
  base: '/stock-portfolio/', // 👈 important for GitHub Pages
})
