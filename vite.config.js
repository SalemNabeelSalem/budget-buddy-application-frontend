import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
let process = process.env.VITE_BASE_PATH = undefined;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  base: process.env.VITE_BASE_PATH || "/budget-buddy-application-frontend",
})
