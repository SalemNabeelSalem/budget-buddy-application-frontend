import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Defaults to root deployment; override with VITE_BASE_PATH when needed.
    base: env.VITE_BASE_PATH || '/budget-buddy-application-frontend',
  }
})