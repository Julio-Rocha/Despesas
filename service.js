const HOST='https://julio-rocha.github.io/Despesas'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${HOST}/service.js`)
    .then(function () { console.log('Service Worker Registered'); });
}

var cacheName = 'despesa';
var filesToCache = [
  `${HOST}/imagens/icons/icon-128x128.png`,
  `${HOST}/imagens/icons/icon-144x144.png`,
  `${HOST}/imagens/icons/icon-152x152.png`,
  `${HOST}/imagens/icons/icon-192x192.png`,
  `${HOST}/imagens/icons/icon-256x256.png`,
  `${HOST}/lib/bootstrap-3.3.7-dist/css/bootstrap.min.css`,
  `${HOST}/lib/jquery-3.3.1.min.js`,
  `${HOST}/app.css`,
  `${HOST}/index.html`,
  `${HOST}/store.js`,
  `${HOST}/despesa.js`,
  `${HOST}/service.js`,
  `${HOST}/manifest.json`
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
