importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const cacheName = 'Shopping';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/index.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache)
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
/* self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
}); */