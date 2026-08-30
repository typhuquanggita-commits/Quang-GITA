import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  server: { port: 3000, host: '0.0.0.0' },
  preview: { port: 3000, host: '0.0.0.0' },
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    /*
     * The application is built into dist/app/ so that dist/ itself can hold
     * the static, crawlable pages. A hash-routed app cannot be indexed —
     * everything after the # never reaches a server — so the site's most
     * valuable URL, the root, must be a document rather than an app shell.
     * `base: './'` keeps the asset paths relative, so the bundle works from
     * /app/ without knowing it is there.
     */
    outDir: 'dist/app',
    target: 'es2022',
    sourcemap: true,
    // Chunking is split three ways so a first paint does not wait on the
    // item bank, and so a bank update does not invalidate the vendor cache.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/data/')) return 'bank';
          return undefined;
        },
      },
    },
  },
});
