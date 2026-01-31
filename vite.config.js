import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/altavelocidade/',
  build: {
    outDir: 'docs',
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  plugins: [react()],
})