/* Spliit PWA 서비스 워커 (web 전용)
   - 앱 셸을 미리 저장해 오프라인에서도 열리게 한다.
   - HTML은 네트워크 우선(새 배포가 바로 반영), 정적 파일은 캐시 후 백그라운드 갱신.
   - 파일 목록이나 동작을 바꾸면 VERSION을 올린다. */
const VERSION = 'v1';
const SHELL_CACHE = `spliit-shell-${VERSION}`;
const RUNTIME_CACHE = `spliit-runtime-${VERSION}`;

const SHELL_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/css/web.css',
  '/pwa.js',
  '/shared/css/tokens.css',
  '/shared/css/components.css',
  '/shared/js/screens.js',
  '/shared/js/app.js',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
];

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith('spliit-') && k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put('/index.html', response.clone());
    return response;
  } catch (err) {
    return (await cache.match('/index.html')) ||
           (await cache.match('/offline.html')) ||
           Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(response => {
      // 글꼴 응답(opaque 포함)과 정상 응답만 저장
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // 페이지 이동(HTML): 네트워크 우선, 실패하면 저장된 화면
  if (request.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 같은 출처의 정적 파일
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
    return;
  }

  // Google Fonts
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
