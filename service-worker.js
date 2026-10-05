const CACHE_NAME = 'ekk-hub-v3';
const APP_SHELL = ['./', './index.html', './style.css', './app.js', './manifest.json', './icon-192.png', './icon-512.png', './icon-180.png', './infinity-logo.png'];

// Pre-cache the shell for offline use. 'reload' skips the browser's HTTP cache so we never store a stale copy.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) =>
        fetch(new Request(url, { cache: 'reload' }))
          .then((res) => (res.ok ? cache.put(url, res) : null))
          .catch(() => null)
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first, and genuinely fresh: 'no-store' bypasses the browser HTTP cache
// (GitHub Pages tells browsers to cache for 10 minutes, which made updates look like they never arrived).
// The cached copy is only used when offline.
function freshFetch(req) {
  return fetch(req, { cache: 'no-store' }).catch(() => fetch(req));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    freshFetch(req)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return response;
      })
      .catch(() => caches.match(req))
  );
});
