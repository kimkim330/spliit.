# Spliit

1인 가구를 위한 동네 소분·공동구매 서비스입니다. 대용량 식재료와 생필품, 배달 음식을 근처 이웃과 안전하게 나눠 살 수 있도록 설계했습니다.

web 버전과 app 버전을 한 저장소에서 관리합니다. 기능과 화면은 `shared/`에 한 번만 작성하고, `web/`과 `app/`은 각자의 레이아웃만 담당합니다.

## 폴더 구조

```
spliit./
├── shared/                 # web·app 공통 (기능은 여기서만 수정)
│   ├── css/tokens.css      # 색상 등 디자인 토큰
│   ├── css/components.css  # 카드, 버튼, 채팅 등 공통 컴포넌트 스타일
│   ├── js/screens.js       # 공통 화면 마크업 (홈, 상세, 개설, 채팅, 동네할인, 파기 정책, 내 정보)
│   └── js/app.js           # 공통 기능 (화면 이동, 1인당 금액 계산, 참여, 채팅 등)
├── web/                    # 웹 버전 (배포 대상)
│   ├── index.html
│   ├── css/web.css         # PC 상단 내비 + 반응형 레이아웃
│   └── package.json        # build 스크립트
├── app/                    # 앱 버전
│   ├── index.html
│   ├── css/app.css         # 모바일 전체 화면 + 안전 영역 레이아웃
│   ├── manifest.webmanifest
│   └── package.json
└── scripts/build.mjs       # <target> + shared 를 <target>/dist 로 묶는 빌드 스크립트
```

## 실행 (개발)

`web/index.html` 또는 `app/index.html`을 브라우저로 열면 바로 실행됩니다. 설치할 패키지는 없습니다.

## 빌드

Node.js 18 이상이 필요합니다.

```bash
npm run build:web   # → web/dist
npm run build:app   # → app/dist
npm run build       # 둘 다
```

`dist/` 폴더에는 `shared/`가 함께 복사되므로, 그 폴더 하나만으로 배포할 수 있습니다.

## web 배포 (프로젝트/web 기준)

Vercel·Netlify 등에서 다음과 같이 설정합니다.

| 항목 | 값 |
|---|---|
| Root Directory | `web` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

app 버전도 같은 방식으로 Root Directory만 `app`으로 바꾸면 따로 배포할 수 있습니다.

## 기능 추가 규칙

- 새 기능·화면 → `shared/js/app.js`, `shared/js/screens.js`
- 공통 스타일 → `shared/css/`
- web에서만 다른 배치 → `web/css/web.css`
- app에서만 다른 배치 → `app/css/app.css`

## 상태

UI 프로토타입이며 결제, 위치 인증, 채팅 서버는 연결되어 있지 않습니다.
