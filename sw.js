/* Service worker de l'app Receptes
   - La pàgina (index.html) i els fitxers bàsics es guarden en memòria cau en instal·lar-se.
   - La pàgina es serveix de la memòria cau i s'actualitza en segon pla (s'hi veuen els canvis a la visita següent).
   - Les fotos (carpeta img/) es guarden a mesura que es veuen (o totes, amb el botó del peu de pàgina).
   Quan canviïs index.html o el manifest, puja el número de VERSION perquè tothom rebi la versió nova.
   Si canvies fotos mantenint el mateix nom de fitxer, puja també IMG_CACHE. */
const VERSION = 'v1';
const CORE_CACHE = 'receptes-core-' + VERSION;
const IMG_CACHE = 'receptes-img-v1';
const CORE_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CORE_CACHE).then(c => c.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k.startsWith('receptes-core-') && k !== CORE_CACHE)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Fotos: primer la memòria cau, i si no hi són, xarxa (i es guarden)
  if (url.pathname.includes('/img/')) {
    event.respondWith(
      caches.open(IMG_CACHE).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }))
      )
    );
    return;
  }

  // Pàgina: es mostra la còpia guardada i s'actualitza en segon pla
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.open(CORE_CACHE).then(cache => {
        const key = new URL('./index.html', self.registration.scope).href;
        return cache.match(key).then(hit => {
          const update = fetch(key, { cache: 'no-cache' }).then(res => {
            if (res.ok) cache.put(key, res.clone());
            return res;
          }).catch(() => null);
          return hit || update.then(res => res || new Response('Sense connexió', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
        });
      })
    );
    return;
  }

  // Resta de fitxers de l'app (manifest, icones): memòria cau primer
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req))
  );
});
