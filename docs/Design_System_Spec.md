# 디자인 시스템 명세서 (Design System Spec)
**프로젝트:** 국립중앙박물관 글로벌 Zero-Error 서비스 리디자인

PRD의 요구사항인 '신뢰받는 글로벌 공공 서비스 이미지'와 '오류 없는 명확한 정보 전달'을 시각적으로 구현하기 위해 유추한 디자인 시스템입니다. 한국의 전통미와 현대적인 사용성을 결합한 **프리미엄 다크/글래스모피즘(Premium Dark & Glassmorphism)** 테마를 기반으로 합니다.

---

## 1. 색상 (Color Palette)
문화재의 고풍스러움(금빛, 청자빛)과 공공기관의 신뢰감(네이비)을 상징하는 색상들로 구성합니다. 프론트엔드 적용을 위해 CSS 변수 형태로 정리했습니다.

```css
:root {
  /* 🔵 Brand Colors */
  --color-primary: #0A192F;       /* 심해의 네이비 (주색): 신뢰감, 차분함, 배경의 깊이감 */
  --color-secondary: #172A45;     /* 짙은 슬레이트 (보조색): 카드 배경, 섹션 구분 */
  --color-accent: #C5A059;        /* 은은한 골드 (강조색): 반가사유상, 금동불상 등 주요 문화재 상징 및 액션 버튼 */

  /* ⚪️ Neutral Colors */
  --color-bg-base: #020C1B;       /* 최하단 배경색 */
  --color-text-title: #E6F1FF;    /* 최상위 텍스트 (완전한 흰색보다 눈이 편안한 오프화이트) */
  --color-text-body: #8892B0;     /* 본문 텍스트 (가독성 높은 뮤트톤) */

  /* 🟢🔴 Semantic & Status Colors (Zero-Error 핵심) */
  --color-status-open: #00FF88;   /* 성공/개관: 명확한 인지를 위한 네온 그린 */
  --color-status-closed: #FF4E4E; /* 에러/휴관/마감: 주의를 끄는 부드러운 레드 */
  
  /* 🪟 Glassmorphism Colors */
  --color-glass-bg: rgba(255, 255, 255, 0.03);    /* 유리 질감 배경 */
  --color-glass-border: rgba(255, 255, 255, 0.08);/* 유리 질감 테두리 */
}
```

---

## 2. 타이포그래피 (Typography)
외국인 방문객의 가독성을 최우선으로 하되, 박물관 특유의 권위와 우아함을 잃지 않도록 두 가지 폰트를 혼용합니다.

*   **제목용 폰트:** `Playfair Display` (Serif - 전통적, 우아함)
*   **본문/UI용 폰트:** `Inter` (Sans-serif - 현대적, 높은 가독성)

### 텍스트 계층 구조 (Text Hierarchy)

| 계층 (Level) | 용도 (Usage) | CSS 속성 제안 |
| :--- | :--- | :--- |
| **Display (H1)** | 메인 히어로 타이틀 (National Museum of Korea) | `font-family: 'Playfair Display'; font-size: 3.5rem; font-weight: 700; line-height: 1.2;` |
| **Heading (H2)** | 섹션 제목 (Featured Exhibitions) | `font-family: 'Playfair Display'; font-size: 2.25rem; font-weight: 600; line-height: 1.3;` |
| **Title (H3)** | 카드 제목, 유물 이름 (Pensive Bodhisattva) | `font-family: 'Inter'; font-size: 1.25rem; font-weight: 600; line-height: 1.4;` |
| **Body (p)** | 일반 본문, 상세 설명 | `font-family: 'Inter'; font-size: 1rem; font-weight: 400; line-height: 1.6; color: var(--color-text-body);` |
| **Label / Caption** | 툴팁, 대시보드 뱃지, 예약 달력의 요일 | `font-family: 'Inter'; font-size: 0.875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;` |

---

## 3. Radius & Effect (모서리 곡률 및 효과)
딱딱한 공공기관의 느낌을 탈피하고, 모바일 친화적이며 부드러운 사용자 경험을 제공하기 위한 규칙입니다.

### Radius (모서리 곡률)
*   **`--radius-sm: 4px;`** : 툴팁, 작은 뱃지 (단단하고 명확한 정보 전달 요소)
*   **`--radius-md: 8px;`** : 검색창, 버튼, 입력 폼 (손가락으로 탭하기 편안한 형태)
*   **`--radius-lg: 16px;`** : 메인 유물 카드, 달력 컨테이너 (부드럽고 둥근 현대적 모바일 UI 느낌)
*   **`--radius-full: 9999px;`** : 상태 표시 점(Dot), 원형 버튼

### Effect (시각적 효과)
PRD의 '정보 집중'과 '오류 방지'를 돕기 위한 깊이감 및 피드백 규칙입니다.

1.  **Glassmorphism (공간감 확보)**
    *   **방식:** 뒷배경(유물 이미지 등)이 은은하게 비치도록 하여 깊이감을 만듭니다.
    *   **CSS:** `background: var(--color-glass-bg); backdrop-filter: blur(12px); border: 1px solid var(--color-glass-border);`
2.  **Elevation (그림자를 통한 계층 분리)**
    *   **방식:** 카드가 배경과 명확히 구분되도록 매우 부드럽고 넓은 그림자를 사용합니다.
    *   **CSS:** `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);`
3.  **Interaction (조작 피드백 방지)**
    *   **Hover (데스크탑):** 버튼이나 카드에 마우스를 올렸을 때 살짝 떠오르는 느낌 부여 (`transform: translateY(-4px)`).
    *   **Disabled / Gray-out (오류 방지 핵심):** 휴관일이나 마감된 회차는 시각적으로 완전히 비활성화합니다. (`opacity: 0.3; cursor: not-allowed; filter: grayscale(100%);`)

---
*참고: 이 문서는 향후 개발 단계에서 스타일 가이드(Style Guide)로 활용되며, `docs` 폴더 내에 안전하게 보관됩니다.*
