/*
 * Offline cache.
 *
 * Precaching the built assets is not possible from a static file the build
 * does not rewrite, so this uses a stale-while-revalidate strategy over
 * same-origin GET requests instead: the first visit populates the cache, and
 * every later visit serves instantly and refreshes in the background.
 *
 * Study data itself is never cached here — it lives in localStorage, which is
 * already offline by nature.
 */

const CACHE = 'sat365-v1';

self.addEventListener('install', (event) => {
  // Take over as soon as the new worker is ready rather than waiting for
  // every tab to close; a stale shell is worse than a brief reload.
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['./', './index.html'])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      // Serve the cached copy immediately when there is one; otherwise wait.
      return cached || network;
    }),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
