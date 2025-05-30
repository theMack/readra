
import { defineConfig } from 'vitest/config';
// @ts-ignore
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
});
