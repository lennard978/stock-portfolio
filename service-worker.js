const CACHE_NAME = 'sp-cache-v1'
const ASSETS = [
  '/',
  '/index.html'
]


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})


self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})


self.addEventListener('fetch', event => {
  // network first for API calls and cache first for navigation/static
  const req = event.request
  if (req.method !== 'GET') return


  event.respondWith(
    fetch(req).then(res => {
      // optionally cache successful GET responses for same-origin
      if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
        const copy = res.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy))
      }
      return res
    }).catch(() => caches.match(req))
  )
})