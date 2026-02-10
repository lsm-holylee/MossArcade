<div align="center">
<img width="1200" height="475" alt="MossArcade Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎮 Moss Arcade

> **AI 기반 온라인 미니게임 아케이드 플랫폼**

친구들과 함께 다양한 미니게임을 즐길 수 있는 웹 기반 게임 플랫폼입니다. Dark & Gold 테마의 프리미엄 UI와 실시간 소셜 기능을 제공합니다.

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Moss Arcade |
| **버전** | 0.0.0 (개발 중) |
| **플랫폼** | Web (React SPA) |
| **대상 유저** | 캐주얼 게임을 즐기는 모든 연령층 |

---

## 🎯 핵심 기능

### 1. 🕹️ 게임 라이브러리 (10종)

| 게임명 | 장르 | 상태 |
|--------|------|------|
| 🎱 당구 (Billiards) | 스포츠 | ✅ 개발 완료 |
| 🏒 하키 퍽 (Hockey) | 스포츠 | 🔲 예정 |
| 🔫 러시안룰렛 (Roulette) | 파티 | 🔲 예정 |
| ✊ 가위바위보 (RPS) | 파티 | 🔲 예정 |
| ♟️ 체스 (Chess) | 전략 | 🔲 예정 |
| ⚽ 패널티킥 (Penalty) | 스포츠 | 🔲 예정 |
| 🃏 포커 (Poker) | 카드 | 🔲 예정 |
| 💜 네온 데스매치 (Neon) | 액션 | ✅ 개발 완료 |
| 🏹 활 (Archery) | 스포츠 | 🔲 예정 |
| 🪖 탱크 (Tank) | 액션 | 🔲 예정 |

### 2. 🏠 로비 시스템

- **Home**: 추천 게임 및 인기 게임 대시보드
- **Arcade**: 전체 게임 목록 (그리드 뷰)
- **Match History**: 경기 기록 및 XP 획득 내역
- **Leaderboard**: 상위 랭커 순위표
- **Friends**: 친구 목록 및 온라인 상태
- **Tournaments**: 토너먼트 이벤트 목록

### 3. 💬 소셜 기능

- 실시간 글로벌 채팅
- 친구 온라인 상태 표시
- 친구와 게임 초대 (예정)
- 경기 결과 공유 (예정)

---

## 🏗️ 기술 스택

```
├── Frontend
│   ├── React 19.2.4
│   ├── TypeScript 5.8.2
│   ├── React Router 7.13.0
│   └── Vite 6.2.0
│
├── UI/UX
│   ├── Tailwind CSS (inline)
│   └── Lucide React Icons
│
└── AI Integration
    └── Gemini API
```

---

## 📁 프로젝트 구조

```
MossArcade/
├── App.tsx                 # 메인 라우터
├── index.tsx               # 엔트리 포인트
│
├── lobby/                  # 🏠 로비 영역 (수정 금지)
│   ├── components/         # 공통 컴포넌트
│   │   ├── Layout.tsx      # 레이아웃 (사이드바 + 헤더)
│   │   ├── Sidebar.tsx     # 네비게이션 사이드바
│   │   ├── Header.tsx      # 상단 헤더 + 유저 정보
│   │   ├── GameCard.tsx    # 게임 카드 UI
│   │   └── LiveChat.tsx    # 실시간 채팅
│   │
│   ├── pages/              # 로비 페이지들
│   │   ├── Home.tsx        # 메인 대시보드
│   │   ├── Arcade.tsx      # 게임 목록
│   │   ├── MatchHistory.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Friends.tsx
│   │   └── Tournaments.tsx
│   │
│   ├── constants.tsx       # 상수 및 목데이터
│   └── types.ts            # 타입 정의
│
├── games/                  # 🎮 게임 영역 (자유롭게 수정)
│   ├── GameRouter.tsx      # 게임 라우터
│   ├── billiards/          # 당구 게임
│   ├── neon/               # 네온 데스매치
│   └── shared/             # 게임 공용 컴포넌트
│
└── public/
    └── assets/images/      # 게임 아이콘 이미지
```

---

## 🎨 디자인 시스템

### 컬러 팔레트

| 용도 | 색상 | HEX |
|------|------|-----|
| 배경 (Primary) | 어두운 네이비 | `#05070A` |
| 배경 (Secondary) | 다크 블루 | `#111622` |
| 테두리 | 다크 그레이 | `#1E2330` |
| 액센트 (Primary) | 골드 | `#FFD700` |
| 액센트 (Secondary) | 다크 골드 | `#D4AF37` |
| 텍스트 (Primary) | 화이트 | `#FFFFFF` |
| 텍스트 (Secondary) | 슬레이트 | `#94A3B8` |

### UI 특징

- ✨ Dark & Gold 프리미엄 테마
- 🌟 Radial Glow 배경 효과
- 🖱️ 부드러운 호버 인터랙션
- 📱 반응형 그리드 레이아웃 (2/3/5 컬럼)

---

## 🚀 시작하기

### 요구 사항

- Node.js 18+
- Gemini API Key

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
# .env.local 파일에 GEMINI_API_KEY 추가

# 3. 개발 서버 실행
npm run dev
# 접속 주소: http://localhost:3000 (또는 3001, 5173)
```

### 빌드

```bash
npm run build
npm run preview
```

---

## 🗺️ 로드맵

### Phase 1: Core (현재)
- [x] 로비 UI 및 네비게이션
- [x] 당구 게임 구현
- [x] 네온 데스매치 게임 구현
- [ ] 가위바위보 게임 구현

### Phase 2: Social
- [ ] 사용자 인증 시스템
- [ ] 친구 추가/관리 기능
- [ ] 실시간 채팅 구현

### Phase 3: Multiplayer
- [ ] 멀티플레이어 매칭 시스템
- [ ] 리더보드 실시간 업데이트
- [ ] 토너먼트 시스템

### Phase 4: Polish
- [ ] 나머지 게임 개발 (8종)
- [ ] 유저 프로필 커스터마이징
- [ ] 업적 및 보상 시스템

---

## 📄 라이선스

© 2024 Moss Arcade. All rights reserved.

---

<div align="center">

**🎮 Play. Compete. Have Fun!**

[AI Studio에서 보기](https://ai.studio/apps/drive/18KYxyK2CMQr2hGmzx30t46o02AU6Xtam)

</div>
