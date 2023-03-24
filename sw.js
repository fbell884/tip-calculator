const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'calc-styles.css',
    'functionality.js',
    './images/icon-dollar.svg',
    './images/icon-person.svg',
    './images/logo.svg'
];

self.addEventListener('install', event => {
    alert("service worker install event");
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            }) 
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});