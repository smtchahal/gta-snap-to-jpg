/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gta-snap-to-jpg/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'GTA V Snapmatic to JPEG Converter',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        name: 'GTA V Snapmatic to JPEG / JPG Converter',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
    eslint(),
  ],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**.{js,ts,jsx,tsx}',
    ],
    coverage: {
      all: true,
      include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: [
        '**/**.d.ts',
        'src/setupTests.ts',
        'src/index.tsx',
        '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/__tests__/**.{js,ts,jsx,tsx}',
      ],
    },
  },
});
