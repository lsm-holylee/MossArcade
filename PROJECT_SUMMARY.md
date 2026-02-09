# 🚀 Moss Arcade: Project Implementation Summary

이 문서는 Moss Arcade 프로젝트의 현재 구현 상태, 주요 기능, 컴포넌트 구조 및 데이터 설계를 요약한 문서입니다.

## 1. 🎨 UI/UX & Theme
*   **Theme**: Dark Mode (`bg-[#05070a]`) + Neon Green Accents (`text-[#00ff99]`). - [x]
*   **Font**: 'Orbitron' (Headers/Logo), 'Inter' (Body).
*   **Style**: CrazyGames 스타일의 모던하고 밀도 높은 그리드 레이아웃.
*   **Grid System**: 모든 게임 카드에 일관된 **정사각형 (1:1 Aspect Ratio)** 비율 적용.
*   **Utilities**: `scrollbar-hide` 커스텀 유틸리티 사용.

## 2. 🏠 Pages & Features

### 2.1 Home Page
*   **Header**:
    *   Toggle Sidebar, Search Bar, Auth Button.
    *   **Popups**: 친구, 알림, 내 게임, 프로필 (상세 구현 완료).
*   **Sections**:
    1.  **계속 플레이하기**: 최근 플레이한 게임 (가로 스크롤, 원형 아이콘).
    2.  **당신을 위한 최고의 추천**: 8-Column 모자이크 그리드 (2x2 대형 카드 + 1x1 카드 혼합, 모두 정사각형 비율).
    3.  **추천 게임**: 정사각형 그리드 카드 (New 뱃지).
    4.  **브랜드에서 플레이**: 정사각형 그리드 카드 (Play on 🎮 뱃지).
    5.  **카테고리**: 장르별 바로가기 버튼.

### 2.2 Sidebar Pages
모두 메인 화면과 일관된 **정사각형 카드 그리드** 디자인을 사용합니다.
*   **🕹️ Arcade**: 전체 게임 목록 (신규/인기).
*   **📜 Match History**: 최근 플레이 기록 (카드 + 'x시간 전' 뱃지).
*   **🏆 Leaderboard**: 인기 게임 랭킹 (카드 + 순위 뱃지/트로피).
*   **👥 Friends / ⚔️ Tournaments**: (기본 틀 구현 완료).

### 2.3 Header Popups (`HeaderPopups.tsx`)
우측 상단 아이콘 클릭 시 나타나는 오버레이 팝업들입니다.
*   **👥 Friends**: 친구 검색, 친구 초대/공유 버튼, 빈 상태 일러스트.
*   **🔔 Notifications**: 앱 출시 알림, 읽음 상태 표시.
*   **💖 My Games**: 3개 탭(최근/즐겨찾기/좋아요)으로 구성된 내 게임 목록.
*   **👤 Profile**: 사용자 정보, 프로필/설정/로그아웃 메뉴, 언어 설정(한국어), 소셜 링크.

## 3. 📂 Component Structure
```
/lobby
  ├── /components
  │   ├── Header.tsx        // 상단바 (팝업 로직 포함)
  │   ├── HeaderPopups.tsx  // 4가지 팝업 컴포넌트 모음
  │   ├── Sidebar.tsx       // 좌측 네비게이션
  │   ├── Layout.tsx        // 전체 레이아웃 (Sidebar + Outlet)
  │   ├── GameCard.tsx      // 공통 게임 카드 (뱃지, 호버 효과)
  │   └── ParticleBackground.tsx // 배경 효과 (선택적)
  ├── /pages
  │   ├── Home.tsx          // 메인 홈
  │   ├── Arcade.tsx        // 아케이드
  │   ├── MatchHistory.tsx  // 전적 (플레이 기록)
  │   └── Leaderboard.tsx   // 랭킹 (인기 게임)
  └── constants.tsx         // 데이터 통합 관리
```

## 4. 💾 Data Structure
### Game Data (`constants.tsx`)
*   **`ALL_GAMES`**: 총 10개의 고유 게임 데이터로 관리.
*   **Assets**: `public/assets/images/` 폴더의 로컬 이미지 사용.
*   **Mock Data**: 더미 생성 로직 제거, 정적 데이터 10개로 고정.

```typescript
// Game Interface
interface Game {
  id: string;
  title: string;
  players: number;
  icon: string;     // '/assets/images/game.png'
  category: string;
}
```

## 5. ✅ Recent Changes (Log)
*   **10개 게임 한정 렌더링**: 외부 URL 및 더미 생성 로직 제거, 로컬 에셋 10종 리소스 연결 완료.
*   **전면적인 그리드 개편**: 직사각형, 세로형 등 제각각이던 카드 비율을 모두 **정사각형(Square)**으로 통일.
*   **헤더 팝업 구현**: 친구, 알림, 내 게임, 프로필 팝업의 상세 UI 구현 완료.

---
**Last Updated**: 2026-02-09
