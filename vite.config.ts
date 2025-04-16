
import { defineConfig } from 'vite';
// @ts-ignore
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  }
});
