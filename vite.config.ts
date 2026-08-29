/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // Cho phep deploy duoi sub-path (vi du GitHub Pages) ma khong sua code.
    base: env.APP_BASE ?? '/',
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'HSA365 — Luyen thi Danh gia nang luc HSA',
          short_name: 'HSA365',
          description:
            'Luyen thi HSA (DHQGHN) theo lo trinh ca nhan hoa: de thi thu chuan cau truc, phan tich nang luc, on tap ngat quang.',
          lang: 'vi',
          start_url: '.',
          scope: '.',
          display: 'standalone',
          background_color: '#0b1120',
          theme_color: '#0b1120',
          icons: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          // Bai thi keo dai 195 phut — khong bao gio duoc mat bai vi mat mang.
          navigateFallback: 'index.html',
          cleanupOutdatedCaches: true,
        },
      }),
    ],
    define: {
      // Khoa AI la TUY CHON. App chay day du khi khong co khoa.
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY ?? ''),
    },
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    build: {
      target: 'es2022',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react')) return 'react';
            if (id.includes('node_modules/@google/genai')) return 'genai';
            // Ngan hang cau hoi va ngu lieu gan nhu khong doi khi sua ma nguon.
            // Tach rieng thi nguoi hoc quay lai chi phai tai lai phan ma da doi,
            // con ~300 KB noi dung van nam trong bo nho dem.
            if (id.includes('/src/data/questions/') || id.includes('/src/data/passages')) {
              return 'noi-dung';
            }
            return undefined;
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.{ts,tsx}'],
      coverage: { provider: 'v8', reportsDirectory: 'coverage' },
    },
  };
});
