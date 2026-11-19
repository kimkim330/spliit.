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
      // 동네 설정 화면은 뒤로가기 기록에 남기지 않는다.
      if (cur.id !== 'screen-location') prevScreen = cur.id;
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
    // 동네 설정 화면에서는 단계(읍·면·동 → 시·군·구 → 시·도)를 먼저 되돌린다.
    if (isActive('screen-location') && locationStepBack()) return;
    goTo(prevScreen || 'screen-home');
  }

  function isActive(id) {
    const cur = document.querySelector('.screen.active');
    return !!cur && cur.id === id;
  }

  /* ───────── 동네 설정 (전국 시·도 > 시·군·구 > 읍·면·동) ───────── */
  const LOC_KEY = 'spliit.location';
  const DEFAULT_LOC = { sido: '서울특별시', sigungu: '마포구', dong: '망원동' };
  const regions = () => window.SPLIIT_REGIONS || [];
  let currentLoc = DEFAULT_LOC;
  const picker = { sido: null, sigungu: null, query: '' };
  let searchIndex = null;

  function findSido(name) { return regions().find(r => r[0] === name); }
  function findSigungu(sido, name) {
    const r = findSido(sido);
    return r ? r[1].find(g => g[0] === name) : undefined;
  }
  function isValidLoc(loc) {
    if (!loc || typeof loc !== 'object') return false;
    const g = findSigungu(loc.sido, loc.sigungu);
    return !!g && g[1].includes(loc.dong);
  }

  function loadLocation() {
    try {
      const saved = JSON.parse(localStorage.getItem(LOC_KEY) || 'null');
      if (isValidLoc(saved)) return { sido: saved.sido, sigungu: saved.sigungu, dong: saved.dong };
    } catch (e) { /* 저장소를 쓸 수 없으면 기본값 사용 */ }
    return DEFAULT_LOC;
  }
  function saveLocation(loc) {
    try { localStorage.setItem(LOC_KEY, JSON.stringify(loc)); } catch (e) { /* 무시 */ }
  }

  function shortSido(name) {
    return name.replace(/(특별자치시|특별자치도|특별시|광역시)$/, '').replace(/^(충청|전라|경상)(북|남)도$/, (m, a, b) => a[0] + b).replace(/도$/, '');
  }
  function locLabels(loc) {
    const area = loc.sigungu ? loc.sigungu.split(' ').pop() : shortSido(loc.sido);
    return {
      short: area + ' ' + loc.dong,
      dong: loc.dong,
      full: [loc.sido, loc.sigungu, loc.dong].filter(Boolean).join(' '),
    };
  }
  function renderLocation() {
    const labels = locLabels(currentLoc);
    document.querySelectorAll('[data-loc]').forEach(el => {
      const text = labels[el.dataset.loc];
      if (text) el.textContent = text;
    });
  }

  function getLocation() { return Object.assign({}, currentLoc); }
  function setLocation(sido, sigungu, dong) {
    const loc = { sido, sigungu, dong };
    if (!isValidLoc(loc)) return false;
    currentLoc = loc;
    saveLocation(loc);
    renderLocation();
    document.dispatchEvent(new CustomEvent('spliit:locationchange', { detail: getLocation() }));
    return true;
  }

  function openLocation() {
    picker.sido = null;
    picker.sigungu = null;
    picker.query = '';
    const input = document.getElementById('loc-search');
    if (input) input.value = '';
    renderPicker();
    goTo('screen-location');
  }

  // 한 단계 뒤로. 더 돌아갈 단계가 없으면 false.
  function locationStepBack() {
    if (picker.query) {
      picker.query = '';
      const input = document.getElementById('loc-search');
      if (input) input.value = '';
    } else if (picker.sigungu !== null) {
      picker.sigungu = null;
      if (findSido(picker.sido)[1].length === 1 && findSido(picker.sido)[1][0][0] === '') picker.sido = null;
    } else if (picker.sido !== null) {
      picker.sido = null;
    } else {
      return false;
    }
    renderPicker();
    return true;
  }

  function pickSido(name) {
    picker.sido = name;
    const gs = findSido(name)[1];
    // 세종처럼 시·군·구가 없는 곳은 바로 읍·면·동 단계로
    picker.sigungu = gs.length === 1 && gs[0][0] === '' ? '' : null;
    renderPicker();
  }
  function pickSigungu(name) {
    picker.sigungu = name;
    renderPicker();
  }
  function pickDong(sido, sigungu, dong) {
    if (setLocation(sido, sigungu, dong)) goTo(prevScreen || 'screen-home');
  }

  function searchLocation(value) {
    picker.query = (value || '').trim();
    renderPicker();
  }

  function buildSearchIndex() {
    const list = [];
    regions().forEach(([sido, gs]) => gs.forEach(([sigungu, dongs]) => dongs.forEach(dong => {
      list.push({ sido, sigungu, dong, key: (sido + sigungu + dong).replace(/\s/g, '') });
    })));
    return list;
  }

  function locItem(text, sub, onClick, selected) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'loc-item' + (selected ? ' selected' : '');
    const main = document.createElement('span');
    main.className = 'loc-item-name';
    main.textContent = text;
    btn.appendChild(main);
    if (sub) {
      const subEl = document.createElement('span');
      subEl.className = 'loc-item-sub';
      subEl.textContent = sub;
      btn.appendChild(subEl);
    }
    btn.addEventListener('click', onClick);
    li.appendChild(btn);
    return li;
  }

  function renderPath() {
    const path = document.getElementById('loc-path');
    if (!path) return;
    path.textContent = '';
    const crumbs = [['전국', () => { picker.sido = null; picker.sigungu = null; renderPicker(); }]];
    if (picker.sido) crumbs.push([picker.sido, () => pickSido(picker.sido)]);
    if (picker.sigungu) crumbs.push([picker.sigungu, null]);
    crumbs.forEach(([label, fn], i) => {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'loc-path-sep';
        sep.textContent = '›';
        path.appendChild(sep);
      }
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'loc-path-item' + (i === crumbs.length - 1 ? ' current' : '');
      b.textContent = label;
      if (fn && i < crumbs.length - 1) b.addEventListener('click', fn); else b.disabled = true;
      path.appendChild(b);
    });
    path.hidden = !!picker.query;
  }

  function renderPicker() {
    const list = document.getElementById('loc-list');
    if (!list) return;
    list.textContent = '';
    renderPath();
    const cur = currentLoc;

    if (picker.query) {
      if (!searchIndex) searchIndex = buildSearchIndex();
      // 띄어쓰기로 나눈 단어가 모두 포함된 동네 (예: "세종 보람", "부산 우동")
      const words = picker.query.split(/\s+/).filter(Boolean);
      const q = words[words.length - 1];
      const hits = searchIndex.filter(r => words.every(w => r.key.includes(w)));
      // 동 이름이 검색어로 시작하는 결과를 먼저
      hits.sort((a, b) => (b.dong.startsWith(q) - a.dong.startsWith(q)));
      hits.slice(0, 100).forEach(r => {
        const sel = r.sido === cur.sido && r.sigungu === cur.sigungu && r.dong === cur.dong;
        list.appendChild(locItem(r.dong, [r.sido, r.sigungu].filter(Boolean).join(' '),
          () => pickDong(r.sido, r.sigungu, r.dong), sel));
      });
      if (hits.length === 0) {
        const li = document.createElement('li');
        li.className = 'loc-empty';
        li.textContent = '검색 결과가 없어요. 읍·면·동 이름으로 검색해 보세요.';
        list.appendChild(li);
      } else if (hits.length > 100) {
        const li = document.createElement('li');
        li.className = 'loc-empty';
        li.textContent = `결과가 많아요 (${hits.length.toLocaleString('ko-KR')}건). 검색어를 더 입력해 주세요.`;
        list.appendChild(li);
      }
      return;
    }

    if (picker.sido === null) {
      regions().forEach(([sido, gs]) => {
        list.appendChild(locItem(sido, gs[0][0] === '' ? '' : `${gs.length}개 시·군·구`, () => pickSido(sido), sido === cur.sido));
      });
    } else if (picker.sigungu === null) {
      findSido(picker.sido)[1].forEach(([sigungu, dongs]) => {
        list.appendChild(locItem(sigungu, `${dongs.length}개 읍·면·동`, () => pickSigungu(sigungu),
          picker.sido === cur.sido && sigungu === cur.sigungu));
      });
    } else {
      findSigungu(picker.sido, picker.sigungu)[1].forEach(dong => {
        list.appendChild(locItem(dong, '', () => pickDong(picker.sido, picker.sigungu, dong),
          picker.sido === cur.sido && picker.sigungu === cur.sigungu && dong === cur.dong));
      });
    }
    const body = list.closest('.scroll-body');
    if (body) body.scrollTop = 0;
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
    currentLoc = loadLocation();
    renderLocation();
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
    openLocation, searchLocation, getLocation, setLocation,
    locationBack: goBack,
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
