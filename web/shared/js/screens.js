/* Spliit 공통 화면 마크업 — web·app이 같은 화면과 기능을 제공하도록 한 곳에서 관리 */
window.SPLIIT_SCREENS = `
<div class="screen active" id="screen-home" style="padding-bottom:0;">
  <div class="home-topbar">
    <span class="home-logo">Spliit</span>
    <div class="location-pill" onclick="alert('위치 변경')">
      📍 마포구 망원동 <span style="font-size:.7rem;opacity:.6">▾</span>
    </div>
  </div>

  <div class="search-bar">
    <div class="search-input-wrap">
      <span class="search-icon">🔍</span>
      <input class="search-input" placeholder="품목·모임 검색" readonly>
    </div>
  </div>

  <div class="category-row">
    <button class="cat-chip active">전체</button>
    <button class="cat-chip" onclick="this.closest('.category-row').querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')">🥩 신선식품</button>
    <button class="cat-chip" onclick="this.closest('.category-row').querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')">🍕 배달</button>
    <button class="cat-chip" onclick="this.closest('.category-row').querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')">🧴 생필품</button>

  </div>

  <div class="scroll-body">
    <!-- 긴급 배너 -->
    <div class="urgent-banner" onclick="goTo('screen-detail')">
      <div class="urgent-banner-icon">🔥</div>
      <div class="urgent-banner-text">
        <p class="urgent-banner-title">지금 1자리 남았어요</p>
        <p class="urgent-banner-sub">엽기떡볶이 같이 시킬 사람 · 도보 3분</p>
      </div>
      <span class="badge badge-red">마감임박</span>
    </div>

    <div class="section-label">내 근처 모임</div>

    <!-- 카드 1 -->
    <div class="meeting-card" onclick="goTo('screen-detail')">
      <div class="meeting-card-body">
        <div class="meeting-card-top">
          <div class="meeting-card-left">
            <span class="meeting-card-emoji">🍓</span>
            <div>
              <p class="meeting-card-title">딸기 1판 반반 나눠요</p>
              <p class="meeting-card-sub">코스트코 딸기 2kg · 1인당 약 9,000원</p>
            </div>
          </div>
          <span class="badge badge-green">모집중</span>
        </div>
        <div class="meeting-card-meta">
          <div class="meeting-card-info">
            <div class="meta-item-sm"><span>👩</span><span>여성만</span></div>
            <div class="meta-item-sm"><span>📍</span><span>도보 5분</span></div>
            <div class="meta-item-sm"><span>⭐</span><span>신뢰 95</span></div>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:50%"></div></div>
            <span class="progress-text">1/2명</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 카드 2 -->
    <div class="meeting-card" onclick="goTo('screen-detail')">
      <div class="meeting-card-body">
        <div class="meeting-card-top">
          <div class="meeting-card-left">
            <span class="meeting-card-emoji">🍗</span>
            <div>
              <p class="meeting-card-title">치킨 오늘 저녁 같이 시켜요</p>
              <p class="meeting-card-sub">교촌 반반치킨 · 배달팁 1/3 · 도보 7분</p>
            </div>
          </div>
          <span class="badge badge-amber">1자리 남음</span>
        </div>
        <div class="meeting-card-meta">
          <div class="meeting-card-info">
            <div class="meta-item-sm"><span>🤝</span><span>상관없음</span></div>
            <div class="meta-item-sm"><span>📍</span><span>도보 7분</span></div>
            <div class="meta-item-sm"><span>⭐</span><span>신뢰 88</span></div>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:67%"></div></div>
            <span class="progress-text">2/3명</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 카드 3 -->
    <div class="meeting-card" onclick="goTo('screen-detail')">
      <div class="meeting-card-body">
        <div class="meeting-card-top">
          <div class="meeting-card-left">
            <span class="meeting-card-emoji">🧻</span>
            <div>
              <p class="meeting-card-title">화장지 24롤 2명이서 반반</p>
              <p class="meeting-card-sub">크리넥스 대용량 · 1인당 약 8,500원</p>
            </div>
          </div>
          <span class="badge badge-green">모집중</span>
        </div>
        <div class="meeting-card-meta">
          <div class="meeting-card-info">
            <div class="meta-item-sm"><span>👩</span><span>여성만</span></div>
            <div class="meta-item-sm"><span>📍</span><span>도보 2분</span></div>
            <div class="meta-item-sm"><span>⭐</span><span>신뢰 100</span></div>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:50%"></div></div>
            <span class="progress-text">1/2명</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 카드 4 -->
    <div class="meeting-card">
      <div class="meeting-card-body">
        <div class="meeting-card-top">
          <div class="meeting-card-left">
            <span class="meeting-card-emoji">🥚</span>
            <div>
              <p class="meeting-card-title">계란 한 판 반반 나눠요</p>
              <p class="meeting-card-sub">30구 특란 · 1인당 약 4,500원</p>
            </div>
          </div>
          <span class="badge badge-green">모집중</span>
        </div>
        <div class="meeting-card-meta">
          <div class="meeting-card-info">
            <div class="meta-item-sm"><span>🤝</span><span>상관없음</span></div>
            <div class="meta-item-sm"><span>📍</span><span>도보 4분</span></div>
            <div class="meta-item-sm"><span>⭐</span><span>신뢰 97</span></div>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar"><div class="progress-fill" style="width:50%"></div></div>
            <span class="progress-text">1/2명</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height:1.5rem"></div>
  </div>

  <!-- FAB -->
  <button class="fab" onclick="goTo('screen-create')" title="모임 개설">＋</button>

  <!-- 탭바 -->
  <div class="tab-bar">
    <button class="tab-item" data-nav="screen-home" onclick="goTo('screen-home')"><span class="tab-icon">🏠</span><span class="tab-label">홈</span></button>
    <button class="tab-item" data-nav="screen-sale" onclick="goTo('screen-sale')"><span class="tab-icon">🏷️</span><span class="tab-label">동네할인</span></button>
    <button class="tab-item" data-nav="screen-chat" onclick="goTo('screen-chat')"><span class="tab-icon">💬</span><span class="tab-label">채팅</span></button>
    <button class="tab-item" data-nav="screen-my" onclick="goTo('screen-my')"><span class="tab-icon">👤</span><span class="tab-label">내 정보</span></button>
  </div>
</div>

<!-- ════════════ 화면 2: 모임 상세 ════════════ -->
<div class="screen" id="screen-detail">
  <div class="app-header">
    <button class="back-btn" onclick="goTo('screen-home')">←</button>
    <span class="app-header-title">모임 상세</span>
    <button class="icon-btn">⋯</button>
  </div>

  <div class="scroll-body">
    <div class="detail-hero">
      <div class="detail-emoji">🍓</div>
      <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;">
        <span class="badge badge-green">모집중</span>
        <span class="badge badge-amber">🔒 에스크로 결제</span>
      </div>
      <p class="detail-title">딸기 1판 반반 나눠요<br><span style="font-size:.88rem;font-weight:400;color:var(--gray)">코스트코 딸기 2kg 한 판</span></p>
      <div class="detail-host">
        <div class="host-avatar">민</div>
        <span class="host-name">민○○님이 개설</span>
        <span class="badge badge-green" style="font-size:.68rem;padding:.18rem .5rem;">👩 여성만 모집</span>
        <div class="host-trust">★ 95 <span style="font-size:.7rem;font-weight:400;color:var(--gray)">(거래 12회)</span></div>
      </div>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">모임 정보</p>
      <div class="detail-info-row"><span class="detail-info-icon">🛒</span><span class="detail-info-label">품목</span><span class="detail-info-val">딸기 2kg (코스트코 망원점)</span></div>
      <div class="detail-info-row"><span class="detail-info-icon">💰</span><span class="detail-info-label">총액</span><span class="detail-info-val">18,000원 (1인당 9,000원)</span></div>
      <div class="detail-info-row"><span class="detail-info-icon">📍</span><span class="detail-info-label">픽업</span><span class="detail-info-val">망원동 편의점 앞 (도보 5분)</span></div>
      <div class="detail-info-row"><span class="detail-info-icon">🕐</span><span class="detail-info-label">시간</span><span class="detail-info-val">오늘 오후 7시 (약 2시간 후)</span></div>
      <div class="detail-info-row"><span class="detail-info-icon">⚠️</span><span class="detail-info-label">규칙</span><span class="detail-info-val">30분 전 취소 시 수수료 발생</span></div>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">참여 현황 · 1/2명</p>
      <div class="participants-row">
        <div class="participant-chip">
          <div class="participant-avatar" style="background:var(--green)">민</div>
          민○○ (주최)
        </div>
        <div class="add-slot" onclick="document.getElementById('join-btn').click()">
          + 나도 참여하기
        </div>
      </div>
    </div>

    <div class="detail-section" style="border-bottom:none;">
      <div class="per-person-box">
        <span class="per-person-label">1인당 금액</span>
        <span class="per-person-price">9,000원</span>
      </div>
      <p style="font-size:.72rem;color:var(--gray);margin-top:.6rem;line-height:1.5">🔒 참여 시 에스크로 결제 — 모임이 취소되면 전액 자동 환불됩니다. <span style="color:var(--green);font-weight:600;cursor:pointer;text-decoration:underline" onclick="goTo('screen-policy')">파기 정책 보기 →</span></p>
    </div>
  </div>

  <div class="detail-cta">
    <button class="chat-btn" onclick="goTo('screen-chat')">💬</button>
    <button class="btn-primary" id="join-btn" onclick="joinMeeting(this)">9,000원 내고 참여하기</button>
  </div>
</div>

<!-- ════════════ 화면 3: 개설 ════════════ -->
<div class="screen" id="screen-create">
  <div class="app-header">
    <button class="back-btn" onclick="goTo('screen-home')">←</button>
    <span class="app-header-title">모임 개설</span>
    <div style="width:28px"></div>
  </div>

  <div class="scroll-body">
    <div class="create-body">

      <div class="form-group">
        <span class="input-label">품목 아이콘</span>
        <div class="emoji-selector">
          <button class="emoji-opt selected" onclick="selectEmoji(this)">🍓</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🍗</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🧻</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🥩</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🍕</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🧴</button>
          <button class="emoji-opt" onclick="selectEmoji(this)">🥚</button>
        </div>
      </div>

      <div class="form-group">
        <span class="input-label">모임 제목</span>
        <input class="input-field" placeholder="예: 딸기 1판 반반 나눠요" value="딸기 1판 반반 나눠요">
      </div>

      <div class="form-group">
        <span class="input-label">총 금액</span>
        <input class="input-field" id="total-price" placeholder="예: 18000" value="18000" type="number" oninput="calcPerPerson()">
      </div>

      <div class="form-group">
        <span class="input-label">모집 성별</span>
        <div class="people-selector">
          <button class="people-opt selected" onclick="selectPeople(this)">👩 여성만</button>
          <button class="people-opt" onclick="selectPeople(this)">👨 남성만</button>
          <button class="people-opt" onclick="selectPeople(this)">🤝 상관없음</button>
        </div>
      </div>

      <div class="form-group">
        <span class="input-label">모집 인원</span>
        <div class="people-selector" id="people-selector">
          <button class="people-opt" onclick="selectPeopleCount(this, 2)">2명</button>
          <button class="people-opt selected" onclick="selectPeopleCount(this, 3)">3명</button>
          <button class="people-opt" onclick="selectPeopleCount(this, 4)">4명</button>
          <button class="people-opt" onclick="selectPeopleCount(this, 5)">5명+</button>
        </div>
      </div>

      <!-- 1인당 예상금액 박스 -->
      <div id="per-person-preview" style="background:var(--green-bg);border:1.5px solid rgba(43,110,78,.2);border-radius:12px;padding:1rem 1.1rem;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <p style="font-size:.75rem;color:var(--green);font-weight:600;margin-bottom:.25rem">1인당 예상 금액</p>
          <p style="font-size:.78rem;color:var(--gray);line-height:1.5">총 금액 ÷ 모집 인원 (주최자 포함)</p>
        </div>
        <p id="per-person-amount" style="font-size:1.6rem;font-weight:700;color:var(--green)">6,000원</p>
      </div>

      <div class="form-group">
        <span class="input-label">픽업 장소</span>
        <input class="input-field" placeholder="예: 망원동 GS25 앞" value="망원동 GS25 앞">
      </div>

      <div class="form-group">
        <span class="input-label">픽업 날짜 · 시간</span>
        <div class="time-row">
          <input class="input-field" type="date" value="2026-11-05">
          <input class="input-field" type="time" value="19:00">
        </div>
      </div>

      <div class="form-group">
        <span class="input-label">한마디</span>
        <input class="input-field" placeholder="참여자에게 전할 말 (선택)" value="신선하게 나눠요 😊">
      </div>

      <div style="background:var(--amber-bg);border-radius:10px;padding:.85rem 1rem;font-size:.8rem;color:#8A6010;line-height:1.6">
        🔒 개설 후 참여자가 에스크로 결제를 완료해야 모임이 확정됩니다. 약속 파기 시 패널티가 부과될 수 있습니다.
      </div>

      <button class="btn-primary" onclick="goTo('screen-home');alert('모임이 개설됐어요! 근처 이웃에게 알림이 갑니다.')">모임 개설하기</button>
      <div style="height:.5rem"></div>
    </div>
  </div>
</div>

<!-- ════════════ 화면 4: 채팅 ════════════ -->
<div class="screen" id="screen-chat">
  <div class="app-header">
    <button class="back-btn" onclick="goTo('screen-detail')">←</button>
    <div>
      <p style="font-size:.92rem;font-weight:700;color:var(--black)">딸기 1판 반반</p>
      <p style="font-size:.72rem;color:var(--gray)">2명 참여중</p>
    </div>
    <button class="icon-btn">⋯</button>
  </div>

  <div class="chat-info-bar">
    <span class="chat-info-text">🕐 오늘 오후 7시 · 망원동 GS25 앞</span>
    <span class="chat-info-action">지도 보기</span>
  </div>

  <div class="chat-messages" id="chat-messages">
    <div class="chat-date">오늘</div>
    <div class="system-msg">🔒 에스크로 결제가 완료됐어요. 약속을 지켜주세요!</div>

    <div class="chat-row">
      <div class="chat-avatar" style="background:var(--green)">민</div>
      <div>
        <div class="chat-time">오후 5:12</div>
        <div class="chat-bubble other">안녕하세요! 오늘 7시에 딸기 가지러 오시면 돼요 😊</div>
      </div>
    </div>

    <div class="chat-row mine">
      <div>
        <div class="chat-time" style="text-align:right">오후 5:14</div>
        <div class="chat-bubble mine">네! 7시에 갈게요. 딸기 1kg씩 나누는 거 맞죠?</div>
      </div>
    </div>

    <div class="chat-row">
      <div class="chat-avatar" style="background:var(--green)">민</div>
      <div>
        <div class="chat-time">오후 5:15</div>
        <div class="chat-bubble other">맞아요! 각자 용기 가져오시면 더 좋아요 🫙</div>
      </div>
    </div>

    <div class="chat-row mine">
      <div>
        <div class="chat-time" style="text-align:right">오후 5:18</div>
        <div class="chat-bubble mine">알겠어요! 7시에 뵐게요 👋</div>
      </div>
    </div>

    <div class="system-msg">픽업 1시간 전입니다. 준비해 주세요!</div>
  </div>

  <div class="chat-input-row">
    <textarea class="chat-input" placeholder="메시지 입력" rows="1" id="chat-input-field"></textarea>
    <button class="chat-send" onclick="sendMsg()">↑</button>
  </div>
</div>

<!-- ════════════ 화면 할인: 동네 할인 ════════════ -->
<div class="screen" id="screen-sale">
  <div class="sale-topbar">
    <span class="sale-logo">🏷️ 동네 할인</span>
    <div class="location-pill" style="font-size:.75rem">📍 망원동 ▾</div>
  </div>

  <div class="store-filter-row">
    <button class="store-chip active" onclick="filterStore(this)">전체</button>
    <button class="store-chip" onclick="filterStore(this)">🏪 마트</button>
    <button class="store-chip" onclick="filterStore(this)">🧃 편의점</button>
    <button class="store-chip" onclick="filterStore(this)">🥩 정육·수산</button>
    <button class="store-chip" onclick="filterStore(this)">🥦 청과</button>
  </div>

  <div class="scroll-body">
    <!-- 배너 -->
    <div class="sale-banner">
      <div class="sale-banner-emoji">📢</div>
      <div>
        <p class="sale-banner-title">이번 주 망원동 할인 7건</p>
        <p class="sale-banner-sub">전단지 없이 앱에서 바로 확인하세요</p>
      </div>
    </div>

    <div class="sale-section-label">내 근처 마트 · 편의점</div>

    <!-- 마트 1 -->
    <div class="store-card">
      <div class="store-card-header">
        <div class="store-icon" style="background:#FFF3CD">🏪</div>
        <div>
          <p class="store-name">망원 한마음마트</p>
          <p class="store-meta">마트 · 망원동 123</p>
        </div>
        <span class="store-distance">도보 3분</span>
      </div>
      <div class="sale-items">
        <div class="sale-item">
          <span class="sale-item-emoji">🍎</span>
          <span class="sale-item-name">사과 10개입 (부사)</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">19,900원</span>
            <span class="sale-price-new">12,900원</span>
            <span class="sale-discount-pct">35%↓</span>
          </div>
        </div>
        <div class="sale-item">
          <span class="sale-item-emoji">🥚</span>
          <span class="sale-item-name">계란 30구 특란</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">10,900원</span>
            <span class="sale-price-new">7,900원</span>
            <span class="sale-discount-pct">27%↓</span>
          </div>
        </div>
        <div class="sale-item">
          <span class="sale-item-emoji">🧻</span>
          <span class="sale-item-name">화장지 24롤 (크리넥스)</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">22,000원</span>
            <span class="sale-price-new">15,900원</span>
            <span class="sale-discount-pct">27%↓</span>
          </div>
        </div>
      </div>
      <div class="store-card-footer">
        <span class="store-card-period">📅 11/05(수) ~ 11/09(일)</span>
        <span class="store-card-cta">지도 보기 →</span>
      </div>
    </div>

    <!-- 편의점 1 -->
    <div class="store-card">
      <div class="store-card-header">
        <div class="store-icon" style="background:#E8F5E9">🧃</div>
        <div>
          <p class="store-name">GS25 망원점</p>
          <p class="store-meta">편의점 · 망원동 456</p>
        </div>
        <span class="store-distance">도보 1분</span>
      </div>
      <div class="sale-items">
        <div class="sale-item">
          <span class="sale-item-emoji">🍺</span>
          <span class="sale-item-name">맥주 4캔 묶음 (테라·카스)</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">9,200원</span>
            <span class="sale-price-new">7,200원</span>
            <span class="sale-discount-pct">22%↓</span>
          </div>
        </div>
        <div class="sale-item">
          <span class="sale-item-emoji">🥛</span>
          <span class="sale-item-name">서울우유 1L (1+1)</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">3,200원</span>
            <span class="sale-price-new">3,200원</span>
            <span class="sale-discount-pct">1+1</span>
          </div>
        </div>
      </div>
      <div class="store-card-footer">
        <span class="store-card-period">📅 11/04(화) ~ 11/10(월)</span>
        <span class="store-card-cta">지도 보기 →</span>
      </div>
    </div>

    <!-- 정육점 -->
    <div class="store-card">
      <div class="store-card-header">
        <div class="store-icon" style="background:#FFEBEE">🥩</div>
        <div>
          <p class="store-name">망원 한우정육점</p>
          <p class="store-meta">정육·수산 · 망원동 789</p>
        </div>
        <span class="store-distance">도보 6분</span>
      </div>
      <div class="sale-items">
        <div class="sale-item">
          <span class="sale-item-emoji">🥩</span>
          <span class="sale-item-name">돼지 삼겹살 100g</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">2,500원</span>
            <span class="sale-price-new">1,800원</span>
            <span class="sale-discount-pct">28%↓</span>
          </div>
        </div>
        <div class="sale-item">
          <span class="sale-item-emoji">🍗</span>
          <span class="sale-item-name">닭다리살 500g</span>
          <div class="sale-item-price">
            <span class="sale-price-orig">7,900원</span>
            <span class="sale-price-new">5,500원</span>
            <span class="sale-discount-pct">30%↓</span>
          </div>
        </div>
      </div>
      <div class="store-card-footer">
        <span class="store-card-period">📅 11/05(수) 하루만</span>
        <span class="store-card-cta">지도 보기 →</span>
      </div>
    </div>

    <!-- 사업자 등록 버튼 -->
    <div class="sale-section-label">우리 가게 할인 올리기</div>
    <button class="register-store-btn" onclick="alert('사업자 등록 후 할인 정보를 올릴 수 있어요!\\n전단지 없이 근처 1인가구 고객에게 바로 알림이 갑니다.')">
      <span class="register-icon">➕</span>
      <div>
        <p class="register-title">우리 가게 할인 등록하기</p>
        <p class="register-sub">전단지 없이 근처 1인가구에게 무료로 홍보</p>
      </div>
    </button>

  </div>

  <!-- 탭바 -->
  <div class="tab-bar">
    <button class="tab-item" data-nav="screen-home" onclick="goTo('screen-home')"><span class="tab-icon">🏠</span><span class="tab-label">홈</span></button>
    <button class="tab-item" data-nav="screen-sale" onclick="goTo('screen-sale')"><span class="tab-icon">🏷️</span><span class="tab-label">동네할인</span></button>
    <button class="tab-item" data-nav="screen-chat" onclick="goTo('screen-chat')"><span class="tab-icon">💬</span><span class="tab-label">채팅</span></button>
    <button class="tab-item" data-nav="screen-my" onclick="goTo('screen-my')"><span class="tab-icon">👤</span><span class="tab-label">내 정보</span></button>
  </div>
</div>

<!-- ════════════ 화면: 파기 정책 ════════════ -->
<div class="screen" id="screen-policy">
  <div class="app-header">
    <button class="back-btn" onclick="goBack()">←</button>
    <span class="app-header-title">파기 정책</span>
    <div style="width:28px"></div>
  </div>

  <div class="scroll-body">

    <!-- 히어로 -->
    <div class="policy-hero">
      <div class="policy-hero-icon">🔒</div>
      <p class="policy-hero-title">에스크로로 보호받습니다</p>
      <p class="policy-hero-desc">참여자가 결제한 금액은 픽업 완료 전까지 Spliit이 보관합니다. 주최자가 약속을 어기면 전액이 자동으로 돌아와요.</p>
    </div>

    <!-- 에스크로 흐름 -->
    <div class="policy-section">
      <p class="policy-section-title">결제 흐름</p>
      <div class="policy-escrow-box">
        <p class="policy-escrow-title">🔒 에스크로 결제 구조</p>
        <div class="policy-escrow-flow">
          <div class="flow-node">참여자 결제</div>
          <span class="flow-arrow">→</span>
          <div class="flow-node highlight">Spliit 보관</div>
          <span class="flow-arrow">→</span>
          <div class="flow-node">픽업 완료 확인</div>
          <span class="flow-arrow">→</span>
          <div class="flow-node">주최자 수령</div>
        </div>
        <p style="font-size:.75rem;color:var(--green);margin-top:.75rem;line-height:1.5">픽업 완료 버튼을 누르기 전까지 주최자는 돈을 받지 못합니다. 파기되면 보관 중인 금액이 참여자에게 전액 환불됩니다.</p>
      </div>
    </div>

    <!-- 주최자 파기 타임라인 -->
    <div class="policy-section">
      <p class="policy-section-title">주최자가 취소·파기할 경우</p>
      <div class="policy-timeline">

        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:var(--green);background:var(--green-bg)"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:var(--green)">픽업 24시간 전 이상 취소</p>
            <p class="policy-step-what">참여자 전액 자동 환불.<br>불가피한 사정으로 인정되며 패널티 없음.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-warn">⚠ 경고 1회 누적</span>
              <span class="badge badge-green">전액 환불</span>
            </div>
          </div>
        </div>

        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:var(--amber);background:var(--amber-bg)"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:#9A6F00">픽업 2시간 전 ~ 24시간 전 취소</p>
            <p class="policy-step-what">참여자 전액 자동 환불.<br>참여자가 이미 이동 준비를 했을 수 있어 신뢰 점수가 차감됩니다.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-minus">신뢰 점수 −10</span>
              <span class="badge badge-green">전액 환불</span>
            </div>
          </div>
        </div>

        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:var(--red);background:var(--red-bg)"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:var(--red)">픽업 2시간 전 이내 취소</p>
            <p class="policy-step-what">참여자 전액 자동 환불.<br>직전 취소는 참여자에게 큰 불편을 주므로 신뢰 점수가 더 크게 차감됩니다.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-minus">신뢰 점수 −20</span>
              <span class="badge badge-green">전액 환불</span>
            </div>
          </div>
        </div>

        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:#1C1C1A;background:#1C1C1A"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:#1C1C1A">노쇼 (연락 두절·미나타남)</p>
            <p class="policy-step-what">참여자 전액 자동 환불.<br>가장 심각한 위반으로 신뢰 점수가 대폭 차감됩니다. 3회 누적 시 계정이 정지됩니다.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-minus">신뢰 점수 −30</span>
              <span class="score-change score-block">3회 누적 시 계정 정지</span>
              <span class="badge badge-green">전액 환불</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 신뢰 점수 영향 -->
    <div class="policy-section">
      <p class="policy-section-title">신뢰 점수가 낮아지면</p>
      <table class="policy-score-table">
        <thead>
          <tr><th>신뢰 점수</th><th>영향</th></tr>
        </thead>
        <tbody>
          <tr><td>100 ~ 80점</td><td>✅ 모임 검색 상단 노출, 뱃지 표시</td></tr>
          <tr><td>79 ~ 60점</td><td>⚠️ 검색 중간 노출, 뱃지 없음</td></tr>
          <tr><td>59 ~ 40점</td><td>🔽 검색 하단으로 밀림, 참여자 경고 문구 표시</td></tr>
          <tr><td>39점 이하</td><td>🚫 모임 개설 제한, 참여만 가능</td></tr>
          <tr><td>누적 3회 노쇼</td><td>❌ 계정 영구 정지</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 참여자가 파기할 경우 -->
    <div class="policy-section">
      <p class="policy-section-title">참여자가 취소할 경우</p>
      <div class="policy-timeline">
        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:var(--green);background:var(--green-bg)"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:var(--green)">픽업 24시간 전 이상 취소</p>
            <p class="policy-step-what">전액 환불. 패널티 없음.</p>
          </div>
        </div>
        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:var(--amber);background:var(--amber-bg)"></div>
            <div class="policy-step-line"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:#9A6F00">픽업 24시간 이내 취소</p>
            <p class="policy-step-what">환불 불가. 주최자는 대체 참여자를 모집할 수 있습니다.<br>신뢰 점수 −5.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-minus">신뢰 점수 −5</span>
              <span class="badge badge-red">환불 불가</span>
            </div>
          </div>
        </div>
        <div class="policy-step">
          <div class="policy-step-line-wrap">
            <div class="policy-step-dot" style="border-color:#1C1C1A;background:#1C1C1A"></div>
          </div>
          <div class="policy-step-content">
            <p class="policy-step-when" style="color:#1C1C1A">노쇼</p>
            <p class="policy-step-what">환불 불가. 신뢰 점수 −15.</p>
            <div class="policy-step-penalty">
              <span class="score-change score-minus">신뢰 점수 −15</span>
              <span class="badge badge-red">환불 불가</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 분쟁 신고 -->
    <div class="policy-section" style="border-bottom:none">
      <p class="policy-section-title">분쟁 신고</p>
      <p style="font-size:.84rem;color:var(--black);line-height:1.7;margin-bottom:1rem">파기 여부가 불분명하거나 상대방과 연락이 안 될 경우, 채팅 내역을 첨부해 신고하면 Spliit이 중재합니다. 중재 결과에 따라 환불 여부가 결정됩니다.</p>
      <button class="btn-secondary" onclick="alert('채팅 내역을 선택해 신고 접수를 시작합니다.')">📋 분쟁 신고하기</button>
    </div>

    <div class="policy-notice">
      💡 모든 결제는 에스크로로 보호됩니다. 주최자에게 직접 송금하지 마세요. 앱 외부 거래는 보호받을 수 없습니다.
    </div>

  </div>
</div>

<!-- ════════════ 화면 5: 마이페이지 ════════════ -->
<div class="screen" id="screen-my">
  <div class="app-header">
    <div style="width:28px"></div>
    <span class="app-header-title">내 정보</span>
    <button class="icon-btn">⚙️</button>
  </div>

  <div class="scroll-body">
    <div class="my-profile-card">
      <div class="my-avatar">나</div>
      <div>
        <p class="my-name">나○○</p>
        <div class="my-trust">
          <div class="trust-score">
            <div class="trust-dot"></div>
            <div class="trust-dot"></div>
            <div class="trust-dot"></div>
            <div class="trust-dot"></div>
            <div class="trust-dot empty"></div>
          </div>
          <span class="trust-label">신뢰 점수 88 · 거래 7회</span>
        </div>
        <p style="font-size:.75rem;color:var(--gray);margin-top:.35rem">📍 마포구 망원동 인증 완료</p>
      </div>
    </div>

    <div class="my-stats">
      <div class="my-stat-item">
        <p class="my-stat-num">7</p>
        <p class="my-stat-label">총 거래</p>
      </div>
      <div class="my-stat-item">
        <p class="my-stat-num">3</p>
        <p class="my-stat-label">주최한 모임</p>
      </div>
      <div class="my-stat-item">
        <p class="my-stat-num">42,500</p>
        <p class="my-stat-label">절약한 금액</p>
      </div>
    </div>

    <div class="my-menu-section">
      <p class="my-menu-title">참여 내역</p>
      <div class="my-menu-item" onclick="goTo('screen-detail')">
        <div class="my-menu-left"><span class="my-menu-icon">🍓</span>딸기 1판 반반 나눠요</div>
        <div style="display:flex;align-items:center;gap:.5rem;"><span class="badge badge-green">진행중</span><span class="my-menu-arrow">›</span></div>
      </div>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">🍗</span>교촌 치킨 같이시키기</div>
        <div style="display:flex;align-items:center;gap:.5rem;"><span class="badge badge-gray">완료</span><span class="my-menu-arrow">›</span></div>
      </div>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">🧻</span>화장지 24롤 반반</div>
        <div style="display:flex;align-items:center;gap:.5rem;"><span class="badge badge-gray">완료</span><span class="my-menu-arrow">›</span></div>
      </div>
    </div>

    <div class="my-menu-section">
      <p class="my-menu-title">설정</p>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">📍</span>동네 인증</div>
        <div style="display:flex;align-items:center;gap:.5rem;"><span class="badge badge-green">완료</span><span class="my-menu-arrow">›</span></div>
      </div>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">💳</span>결제 수단</div>
        <span class="my-menu-arrow">›</span>
      </div>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">🔔</span>알림 설정</div>
        <span class="my-menu-arrow">›</span>
      </div>
      <div class="my-menu-item">
        <div class="my-menu-left"><span class="my-menu-icon">🛡️</span>신뢰 점수란?</div>
        <span class="my-menu-arrow">›</span>
      </div>
      <div class="my-menu-item" onclick="goTo('screen-policy')">
        <div class="my-menu-left"><span class="my-menu-icon">📋</span>파기 정책</div>
        <span class="my-menu-arrow">›</span>
      </div>
    </div>
    <div style="height:1.5rem"></div>
  </div>

  <div class="tab-bar">
    <button class="tab-item" data-nav="screen-home" onclick="goTo('screen-home')"><span class="tab-icon">🏠</span><span class="tab-label">홈</span></button>
    <button class="tab-item" data-nav="screen-sale" onclick="goTo('screen-sale')"><span class="tab-icon">🏷️</span><span class="tab-label">동네할인</span></button>
    <button class="tab-item" data-nav="screen-chat" onclick="goTo('screen-chat')"><span class="tab-icon">💬</span><span class="tab-label">채팅</span></button>
    <button class="tab-item" data-nav="screen-my" onclick="goTo('screen-my')"><span class="tab-icon">👤</span><span class="tab-label">내 정보</span></button>
  </div>
</div>
`;
