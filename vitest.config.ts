import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.js'],
    deps: {
      inline: [/\.scss$/, /\.css$/],
    },
    css: false,
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // Add Jest compatibility
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
  resolve: {
    alias: {
      // Mock style imports
      '.+\\.(css|scss|sass)$': resolve(__dirname, './__mocks__/styleMock.js'),
    },
  },
});