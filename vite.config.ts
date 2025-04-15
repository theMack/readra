import { defineConfig } from 'vite'
import * as reactPlugin from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})
