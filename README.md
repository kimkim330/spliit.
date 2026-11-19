# Spliit

1인 가구를 위한 동네 소분·공동구매 서비스입니다. 대용량 식재료와 생필품, 배달 음식을 근처 이웃과 안전하게 나눠 살 수 있도록 설계했습니다.

하나의 저장소에서 **web**(Cloudflare Pages 배포)과 **app**(Android APK)을 함께 운영합니다. 화면과 기능은 `web/shared/`에 한 번만 작성하고, app은 빌드할 때 이 코드를 그대로 가져와 같은 기능을 제공합니다.

## 폴더 구조

```
spliit./
├── web/                          # 웹 버전 (Cloudflare Pages 배포 폴더)
│   ├── index.html
│   ├── css/web.css               # 웹 전용 레이아웃 (PC 상단 메뉴 + 반응형)
│   └── shared/                   # ★ web·app 공통 화면·기능 — 기능은 여기서만 수정
│       ├── css/tokens.css        # 색상 등 디자인 값
│       ├── css/components.css    # 공통 컴포넌트 스타일
│       ├── js/screens.js         # 화면 마크업 (홈, 상세, 개설, 채팅, 동네할인, 파기 정책, 내 정보)
│       └── js/app.js             # 기능 (화면 이동, 1인당 금액 계산, 참여, 채팅 등)
│
└── app/                          # 앱 버전 (Android Studio 프로젝트: android_app)
    ├── settings.gradle.kts
    ├── build.gradle.kts
    ├── gradlew, gradlew.bat, gradle/wrapper/
    ├── www/                      # 앱 전용 레이아웃 (전체 화면, 안전 영역)
    │   ├── index.html
    │   └── css/app.css
    └── android_app/              # Android 모듈
        ├── build.gradle.kts      # 빌드 시 app/www + web/shared → assets/www 자동 복사
        └── src/main/
            ├── AndroidManifest.xml
            ├── java/com/spliit/app/MainActivity.kt   # WebView로 assets/www 실행
            └── res/
```

## web — GitHub + Cloudflare Pages 배포

Cloudflare 대시보드에서 이 저장소를 Git으로 연결해 배포합니다. `main`에 푸시하면 자동으로 다시 배포됩니다.

Workers & Pages → Create → Pages → **Connect to Git** → 이 저장소 선택 후:

| 항목 | 값 |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | (비워 둠) |
| Build output directory | `web` |

Workers 화면에서 만들어 Deploy command가 필수로 나오는 경우:
`npx wrangler deploy --assets=./web --name=spliit --compatibility-date=2025-01-01`

`web/_headers`에 보안 헤더와 캐시 설정이 들어 있습니다.

로컬 확인: `web/index.html`을 브라우저로 열면 됩니다.

### PWA (web 전용)

web 버전은 설치형 웹앱(PWA)을 지원합니다. 기존 화면·기능 코드(`web/shared/`)는 수정하지 않았습니다.

| 파일 | 역할 |
|---|---|
| `web/manifest.webmanifest` | 앱 이름, 아이콘, 색상, 홈 화면 바로가기(모임 개설) |
| `web/sw.js` | 서비스 워커: 앱 파일 미리 저장 → 오프라인에서도 실행. HTML은 네트워크 우선이라 새 배포가 바로 반영됨 |
| `web/pwa.js` | 서비스 워커 등록, PC 상단의 "앱 설치" 버튼(설치 가능할 때만 표시) |
| `web/offline.html` | 저장된 화면도 없을 때 보이는 오프라인 안내 |
| `web/icons/` | 앱 아이콘 (SVG 원본 + PNG) |

- 서비스 워커는 HTTPS(배포 주소)나 `localhost`에서만 동작합니다. `index.html`을 파일로 직접 열면 PWA 기능 없이 기존처럼 실행됩니다.
- 앱 파일 목록을 바꾸거나 캐시를 새로 만들어야 할 때는 `web/sw.js`의 `VERSION`을 올리세요.
- 로컬 테스트: `cd web && python3 -m http.server 8080` 후 `http://localhost:8080` 접속

## app — Android Studio로 APK 만들기

요구 사항: Android Studio (JDK 17 이상 포함), Android SDK 35

1. Android Studio → **Open** → 저장소의 `app` 폴더 선택
2. Gradle Sync가 끝날 때까지 대기
3. 메뉴 **Build → Build App Bundle(s) / APK(s) → Build APK(s)**
4. 결과물: `app/android_app/build/outputs/apk/debug/android_app-debug.apk`

명령줄로 빌드할 때:

```bash
cd app
./gradlew :android_app:assembleDebug
```

배포용 서명 APK는 **Build → Generate Signed App Bundle / APK** 에서 키스토어를 만들어 생성합니다. 키스토어 파일(`*.jks`)은 저장소에 올리지 마세요 (`.gitignore`에 포함됨).

### app이 web과 같은 기능을 제공하는 방식

- APK를 빌드할 때마다 Gradle의 `syncWebAssets` 작업이 `app/www`와 `web/shared`를 `assets/www`로 복사합니다.
- `MainActivity`가 WebView로 `https://appassets.androidplatform.net/assets/www/index.html`을 엽니다 (WebViewAssetLoader 사용, 오프라인에서도 동작).
- Android 뒤로가기 버튼: 홈 화면이면 앱 종료, 그 외에는 이전 화면으로 이동합니다.
- 따라서 `web/shared`를 수정하면 웹은 다음 배포에, 앱은 다음 APK 빌드에 같은 변경이 반영됩니다.

앱 레이아웃 미리보기: `app/www/index.html`을 브라우저로 열면 됩니다.

## 수정 규칙

| 바꾸려는 것 | 수정할 파일 |
|---|---|
| 기능·화면 (web·app 공통) | `web/shared/js/`, `web/shared/css/` |
| 웹에서만 다른 배치 | `web/css/web.css` |
| 앱에서만 다른 배치 | `app/www/css/app.css` |
| 안드로이드 동작 (뒤로가기, 권한 등) | `app/android_app/src/main/` |

## 상태

UI 프로토타입이며 결제, 위치 인증, 채팅 서버는 연결되어 있지 않습니다.
