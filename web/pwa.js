/* Spliit PWA 등록 (web 전용) — 기존 화면·기능 코드(shared/)는 건드리지 않는다. */
(function () {
  'use strict';

  // 서비스 워커 등록: HTTPS(또는 localhost)에서만 동작한다.
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (err) {
        console.warn('Service worker 등록 실패:', err);
      });
    });
  }

  // 홈 화면 바로가기(#create)로 열면 모임 개설 화면으로 이동
  window.addEventListener('load', function () {
    if (location.hash === '#create' && typeof window.goTo === 'function') {
      window.goTo('screen-create');
    }
  });

  // 설치 버튼: 브라우저가 설치 가능하다고 알려줄 때만 보인다.
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = document.getElementById('pwa-install');
    if (btn) btn.hidden = false;
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    var btn = document.getElementById('pwa-install');
    if (btn) btn.hidden = true;
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('#pwa-install');
    if (!btn || !deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () {
      deferredPrompt = null;
      btn.hidden = true;
    });
  });
})();
