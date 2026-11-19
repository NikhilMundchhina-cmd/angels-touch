/* Angels Touch — offline support.
   The app's own files are kept on the device so it opens without internet.
   Your music is never uploaded or cached here: it is read straight from your device. */
const VERSION = 'angels-touch-v6';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/favicon-64.png', './icons/intro-angel.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Online lyrics lookups always go to the network (the app saves results itself).
  if (url.hostname === 'lrclib.net') return;

  // Fonts: keep a copy after the first online visit so the app looks the same offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch (err) { return hit || Response.error(); }
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  // Other pages (e.g. privacy.html): always try the network first.
  const scopePath = new URL(self.registration.scope).pathname;
  const isAppPage = url.pathname === scopePath || url.pathname === scopePath + 'index.html';
  if (req.mode === 'navigate' && !isAppPage) {
    e.respondWith(fetch(req).catch(() => caches.match(req).then(r => r || Response.error())));
    return;
  }

  // The app page: open instantly from the device, refresh the stored copy in the background.
  if (req.mode === 'navigate') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const cached = await c.match('./index.html');
      const fresh = fetch(req).then(res => { if (res.ok) c.put('./index.html', res.clone()); return res; }).catch(() => null);
      return cached || (await fresh) || new Response('Angels Touch is offline and has not been saved yet. Open it once while online.', { headers: { 'Content-Type': 'text/plain' } });
    }));
    return;
  }

  e.respondWith(caches.open(VERSION).then(async c => {
    const cached = await c.match(req);
    const fresh = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
    return cached || (await fresh) || Response.error();
  }));
});
