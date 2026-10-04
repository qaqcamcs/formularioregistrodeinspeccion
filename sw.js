// Service worker: guarda la app en el dispositivo para abrirla sin internet.
// Si cambias index.html o los iconos, sube el número de versión para forzar la actualización.
const CACHE = 'qaqc-v26';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/amcs-logo.png'];

self.addEventListener('install', e => {
  // Importante: NO se usa cache.addAll() porque si UN SOLO archivo de la lista
  // no existe (404), addAll() cancela toda la instalación y la app queda
  // pegada en la versión anterior para siempre. Con esto, cada archivo se
  // guarda por separado y si alguno falla, no arrastra a los demás.
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.all(
      SHELL.map(url => c.add(url).catch(err => console.warn('No se pudo precachear', url, err)))
    )).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Archivos propios: se sirven desde el caché y se actualizan en segundo plano.
// Las llamadas a Apps Script (otro dominio, POST) no se tocan.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
    const net = fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return net.then(res => res || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()));
  }));
});
