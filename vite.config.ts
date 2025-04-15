import { defineConfig } from 'vite'
import * as reactPlugin from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
