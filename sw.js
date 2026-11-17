// Service worker: the app works offline and commander images stay cached.
const VERSION = 'cn-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
const IMG_CACHE = VERSION + '-img', API_CACHE = VERSION + '-api';
const IMG_MAX = 300, API_MAX = 50;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION + '-shell').then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

// Saves a response and drops the oldest entries beyond `max` (cache.keys() is in insertion order).
async function putCapped(name, req, res, max) {
  const c = await caches.open(name);
  await c.put(req, res);
  const keys = await c.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map(k => c.delete(k)));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Card images: only art_crop (commanders, decks, history) goes in our cache.
  // Thumbnails from searches (small/normal) are left to the browser's HTTP cache.
  if (url.hostname === 'cards.scryfall.io') {
    if (!url.pathname.startsWith('/art_crop/')) return;
    e.respondWith((async () => {
      const c = await caches.open(IMG_CACHE);
      const hit = await c.match(req, {ignoreVary: true});
      if (hit) return hit;
      let res;
      // CORS request (Scryfall sends Access-Control-Allow-Origin: *): a non-opaque response
      // counts for its real size in the storage quota instead of several padded MB.
      try { res = await fetch(new Request(req.url, {mode: 'cors', credentials: 'omit'})); }
      catch (err) { return fetch(req); }
      if (res.ok) e.waitUntil(putCapped(IMG_CACHE, req.url, res.clone(), IMG_MAX).catch(() => {}));
      return res;
    })());
    return;
  }

  // Scryfall API: network first. Only rulings are kept for offline use; searches are not cached.
  if (url.hostname === 'api.scryfall.com') {
    if (!/^\/cards\/[^/]+\/rulings$/.test(url.pathname)) return;
    e.respondWith(fetch(req).then(res => {
      if (res.ok) e.waitUntil(putCapped(API_CACHE, req, res.clone(), API_MAX).catch(() => {}));
      return res;
    }).catch(() => caches.match(req).then(r => r || Response.error())));
    return;
  }

  // App: network first (to pick up updates), cache when offline
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION + '-shell').then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  }
});
