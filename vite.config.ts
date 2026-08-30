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
        /*
         * The rule used to be "anything under /src/data/ is the bank", which
         * was right when that directory held only items. It now also holds the
         * vocabulary deck, the expert solutions, the must-know reference, the
         * syllabus and the fee table — none of which the store needs, all of
         * which were being downloaded before a learner could open Settings.
         *
         * The store imports QUESTION_BY_ID, so the item bank is genuinely
         * eager and stays a named chunk. Everything else is left to Rollup,
         * which splits it into the lazily-loaded route that actually imports
         * it. Content a learner never opens is content they never download.
         */
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (/\/src\/data\/(bank|generator|blueprint)/.test(id)) return 'bank';
          return undefined;
        },
      },
    },
  },
});
