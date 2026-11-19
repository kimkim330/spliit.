/* Spliit PWA 서비스 워커 (web 전용)
   - 같은 출처 파일은 항상 네트워크 우선 → 새로 배포한 내용이 바로 반영된다.
   - 네트워크가 안 될 때만 저장해 둔 파일로 실행한다(오프라인 지원).
   - 파일 목록이나 동작을 바꾸면 VERSION과 index.html의 ?v= 값을 함께 올린다. */
const VERSION = 'v3';
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
  '/shared/js/regions.js',
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
      // cache: 'reload' → 브라우저 HTTP 캐시를 거치지 않고 서버의 최신 파일을 저장
      .then(cache => cache.addAll(SHELL_FILES.map(url => new Request(url, { cache: 'reload' }))))
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

// 네트워크 우선: 성공하면 저장, 실패하면 저장본 사용
async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request, { cache: 'no-cache' });
    if (response.ok) cache.put(fallbackUrl || request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(fallbackUrl || request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const offline = await cache.match('/offline.html');
      if (offline) return offline;
    }
    return Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(response => {
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

  if (url.origin === self.location.origin) {
    // 페이지 이동은 /index.html 로 저장·복구
    event.respondWith(networkFirst(request, request.mode === 'navigate' ? '/index.html' : undefined));
    return;
  }

  // Google Fonts: 바뀌지 않으므로 저장본 우선
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
