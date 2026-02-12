
// ===== 카드 시스템 타입 (Poki 스타일 Masonry Grid) =====

// 카드 크기: Masonry Grid에서 각 카드의 차지 영역
export type CardSize = 'large' | 'medium' | 'small';

// 카드 유형: 6종 혼합 카드
export type CardType = 'game' | 'event' | 'notice' | 'shop' | 'ranking' | 'social';

// 기본 카드 인터페이스
export interface BaseCard {
  id: string;
  type: CardType;
  size: CardSize;
  pinned?: boolean; // 상단 고정 여부 (이벤트/공지)
}

// 🎮 게임 카드
export interface GameCard extends BaseCard {
  type: 'game';
  title: string;
  thumbnail: string;
  players: number;       // 현재 접속자 수 (CCU)
  likeRatio: number;     // 좋아요 비율 (0~100%)
  category: GameCategory;
}

// 📢 공지 카드
export interface NoticeCard extends BaseCard {
  type: 'notice';
  title: string;
  summary: string;
  date: string;
  icon: string;
}

// 🎉 이벤트 카드
export interface EventCard extends BaseCard {
  type: 'event';
  title: string;
  description: string;
  thumbnail: string;
  endsAt: string;        // 종료 시각 (카운트다운 뱃지용)
  reward?: string;
}

// 🛒 상점 카드
export interface ShopCard extends BaseCard {
  type: 'shop';
  title: string;
  thumbnail: string;
  price: number;         // MMOC 가격
  originalPrice?: number; // 할인 전 가격 (프로모션)
  tag?: string;          // "NEW" / "HOT" / "SALE"
}

// 🏆 랭킹 카드
export interface RankingCard extends BaseCard {
  type: 'ranking';
  title: string;
  entries: { rank: number; nickname: string; value: string }[];
}

// 👥 소셜 카드
export interface SocialCard extends BaseCard {
  type: 'social';
  title: string;
  friends: { nickname: string; status: 'online' | 'in-game' | 'offline'; game?: string }[];
}

// 모든 카드의 유니온 타입
export type AnyCard = GameCard | NoticeCard | EventCard | ShopCard | RankingCard | SocialCard;

// ===== 게임 카테고리 =====
export type GameCategory = 'recommended' | 'popular' | 'action' | 'sports' | 'puzzle' |
  'shooting' | 'arcade' | 'board' | 'multi' | 'casual' | 'simulation';

// ===== 기존 호환 타입 =====
export interface Game {
  id: string;
  title: string;
  players: number;
  icon: string;
  category: GameCategory;
}

export interface ChatMessage {
  id: string;
  user: string;
  userId: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

// ===== 유저 프로필 =====
export type RankTier = 'beginner' | 'regular' | 'skilled' | 'master' | 'legend';

export interface UserProfile {
  uuid: string;
  walletAddress: string | null; // null이면 게스트 모드
  nickname: string;
  avatarUrl: string;
  mmocBalance: number;
  cumulativeBet: number;
  rankTier: RankTier;
  totalWins: number;
  totalGames: number;
  isGuest: boolean;
}
