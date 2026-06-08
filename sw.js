/* Service worker for Chat Viewer PWA.
   Caches the app shell so it loads offline and installs to the home screen.
   The user's chat .txt is read locally via FileReader and is NEVER fetched,
   cached, or stored by this worker. */

const CACHE = 'chat-viewer-v2';

// App shell — relative paths so it works at root OR /repo-name/ on GitHub Pages.
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // only handle same-origin GET requests
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req)
        .then(resp => {
          // cache newly fetched same-origin resources for next time
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => caches.match('./index.html')); // offline fallback to the app
    })
  );
});
