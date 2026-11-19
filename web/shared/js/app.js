/* Spliit 공통 기능 — web·app이 함께 사용
   화면 이동, 모임 개설 계산, 참여, 채팅 등 서비스 로직은 이 파일 하나에서만 관리한다. */
(function () {
  'use strict';

  let prevScreen = 'screen-home';
  let selectedPeopleCount = 3;

  // 상단 내비(web)·하단 탭바(app) 등 data-nav 속성을 가진 버튼의 활성 상태를 맞춘다.
  function syncNav(id) {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.classList.toggle('active', el.dataset.nav === id);
    });
  }

  function goTo(id) {
    const cur = document.querySelector('.screen.active');
    if (cur && cur.id !== id) {
      prevScreen = cur.id;
      cur.classList.remove('active');
      cur.classList.add('exit');
      setTimeout(() => cur.classList.remove('exit'), 350);
    }
    const next = document.getElementById(id);
    if (next) {
      next.classList.remove('exit');
      next.classList.add('active');
    }
    syncNav(id);
  }

  function goBack() {
    goTo(prevScreen || 'screen-home');
  }

  function setTab(btn, screenId) {
    goTo(screenId);
  }

  function selectEmoji(el) {
    el.closest('.emoji-selector').querySelectorAll('.emoji-opt').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
  }

  function selectPeople(el) {
    el.closest('.people-selector').querySelectorAll('.people-opt').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
  }

  function selectPeopleCount(el, count) {
    selectPeople(el);
    selectedPeopleCount = count;
    calcPerPerson();
  }

  function calcPerPerson() {
    const input = document.getElementById('total-price');
    const el = document.getElementById('per-person-amount');
    if (!input || !el) return;
    const total = parseInt(input.value, 10) || 0;
    const per = selectedPeopleCount > 0 ? Math.ceil(total / selectedPeopleCount) : 0;
    el.textContent = total === 0 ? '—' : per.toLocaleString('ko-KR') + '원';
  }

  function joinMeeting(btn) {
    btn.textContent = '✅ 참여 완료! (에스크로 결제됨)';
    btn.style.background = '#4A9A70';
    btn.disabled = true;
    setTimeout(() => goTo('screen-chat'), 800);
  }

  function filterStore(el) {
    el.closest('.store-filter-row').querySelectorAll('.store-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }

  function sendMsg() {
    const input = document.getElementById('chat-input-field');
    const text = input.value.trim();
    if (!text) return;
    const msgs = document.getElementById('chat-messages');
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const time = `${h >= 12 ? '오후' : '오전'} ${h > 12 ? h - 12 : h}:${m}`;

    // 사용자가 입력한 글은 textContent로만 넣는다 (innerHTML 사용 시 XSS 발생).
    const row = document.createElement('div');
    row.className = 'chat-row mine';
    const wrap = document.createElement('div');
    const timeEl = document.createElement('div');
    timeEl.className = 'chat-time';
    timeEl.style.textAlign = 'right';
    timeEl.textContent = time;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble mine';
    bubble.textContent = text;
    wrap.append(timeEl, bubble);
    row.appendChild(wrap);
    msgs.appendChild(row);

    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
  }

  // 공통 화면을 #spliit-root에 그리고 이벤트를 연결한다.
  function mount() {
    const root = document.getElementById('spliit-root');
    if (!root) throw new Error('#spliit-root 요소가 없습니다.');
    root.innerHTML = window.SPLIIT_SCREENS;
    calcPerPerson();
    const chatInput = document.getElementById('chat-input-field');
    if (chatInput) {
      chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
      });
    }
    syncNav('screen-home');
  }

  // 화면 마크업의 onclick 속성에서 호출하는 함수들
  Object.assign(window, {
    goTo, goBack, setTab, selectEmoji, selectPeople, selectPeopleCount,
    calcPerPerson, joinMeeting, filterStore, sendMsg,
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
