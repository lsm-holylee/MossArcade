import React from 'react';
import { Home, Gamepad2, History, Trophy, Users, LayoutGrid, Wallet, ShoppingBag, Package } from 'lucide-react';
import { NavItem, Game, ChatMessage, AnyCard } from './types';

// ===== 사이드바 네비게이션 (기획서 5.1 반영) =====
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'Home', active: true },
  { id: 'wallet', label: 'Wallet', icon: 'Wallet' },
  { id: 'marketplace', label: 'Marketplace', icon: 'ShoppingBag' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'LayoutGrid' },
  { id: 'friends', label: 'Friends', icon: 'Users' },
  { id: 'tournaments', label: 'Tournaments', icon: 'Trophy' },
  { id: 'match-history', label: 'Match History', icon: 'History' },
];

// ===== 기존 게임 목록 (호환용) =====
export const ALL_GAMES: Game[] = [
  { id: '1', title: '당구', players: 328, icon: '/assets/images/billiards.png', category: 'sports' },
  { id: '2', title: '하키 퍽', players: 84, icon: '/assets/images/hockey.png', category: 'sports' },
  { id: '3', title: '러시안룰렛', players: 12, icon: '/assets/images/roulette.png', category: 'casual' },
  { id: '4', title: '가위바위보', players: 156, icon: '/assets/images/rps.png', category: 'casual' },
  { id: '5', title: '체스', players: 49, icon: '/assets/images/chess.png', category: 'board' },
  { id: '6', title: '패널티킥', players: 201, icon: '/assets/images/penalty.png', category: 'sports' },
  { id: '7', title: '포커', players: 550, icon: '/assets/images/poker.png', category: 'board' },
  { id: '8', title: '네온 데스매치', players: 76, icon: '/assets/images/neon.png', category: 'action' },
  { id: '9', title: '활', players: 112, icon: '/assets/images/archery.png', category: 'shooting' },
  { id: '10', title: '탱크', players: 98, icon: '/assets/images/tank.png', category: 'action' },
];

// ===== Poki 스타일 Masonry Grid 카드 데이터 =====
// 기획서 5.1: 이벤트(핀) → 공지(핀) → 최근 플레이 → 추천 → 인기 → 상점 → 랭킹 → 소셜
export const ALL_CARDS: AnyCard[] = [
  // 📢 공지 카드 (핀)
  {
    id: 'notice-1', type: 'notice', size: 'small', pinned: true,
    title: '🔧 v1.2 업데이트 안내',
    summary: 'Neon Deathmatch 분배형 보상 시스템 도입! 1등 60%, 2등 25%, 3등 15%',
    date: '2026-02-12', icon: '📢',
  },
  // 🎉 이벤트 카드 (핀)
  {
    id: 'event-1', type: 'event', size: 'large', pinned: true,
    title: '🏆 제1회 Moss Arcade 토너먼트',
    description: '16강 싱글 엘리미네이션! 1등 상금 5,000 MMOC',
    thumbnail: '/assets/images/neon.png',
    endsAt: '2026-02-20T22:00:00',
    reward: '5,000 MMOC',
  },
  {
    id: 'event-2', type: 'event', size: 'medium', pinned: true,
    title: '🎁 첫 입금 보너스 이벤트',
    description: '첫 MOC 입금 시 추가 10% MMOC 보너스!',
    thumbnail: '/assets/images/poker.png',
    endsAt: '2026-03-01T00:00:00',
    reward: '10% 보너스',
  },
  // 🎮 게임 카드
  {
    id: 'game-8', type: 'game', size: 'large',
    title: '네온 데스매치', thumbnail: '/assets/images/neon.png',
    players: 76, likeRatio: 92, category: 'action',
  },
  {
    id: 'game-1', type: 'game', size: 'large',
    title: '당구', thumbnail: '/assets/images/billiards.png',
    players: 328, likeRatio: 88, category: 'sports',
  },
  {
    id: 'game-7', type: 'game', size: 'medium',
    title: '포커', thumbnail: '/assets/images/poker.png',
    players: 550, likeRatio: 95, category: 'board',
  },
  {
    id: 'game-6', type: 'game', size: 'medium',
    title: '패널티킥', thumbnail: '/assets/images/penalty.png',
    players: 201, likeRatio: 85, category: 'sports',
  },
  {
    id: 'game-4', type: 'game', size: 'small',
    title: '가위바위보', thumbnail: '/assets/images/rps.png',
    players: 156, likeRatio: 78, category: 'casual',
  },
  {
    id: 'game-5', type: 'game', size: 'small',
    title: '체스', thumbnail: '/assets/images/chess.png',
    players: 49, likeRatio: 90, category: 'board',
  },
  {
    id: 'game-2', type: 'game', size: 'small',
    title: '하키 퍽', thumbnail: '/assets/images/hockey.png',
    players: 84, likeRatio: 82, category: 'sports',
  },
  {
    id: 'game-3', type: 'game', size: 'small',
    title: '러시안룰렛', thumbnail: '/assets/images/roulette.png',
    players: 12, likeRatio: 70, category: 'casual',
  },
  {
    id: 'game-9', type: 'game', size: 'small',
    title: '활', thumbnail: '/assets/images/archery.png',
    players: 112, likeRatio: 86, category: 'shooting',
  },
  {
    id: 'game-10', type: 'game', size: 'small',
    title: '탱크', thumbnail: '/assets/images/tank.png',
    players: 98, likeRatio: 80, category: 'action',
  },
  // 🛒 상점 카드
  {
    id: 'shop-1', type: 'shop', size: 'medium',
    title: '🔥 네온 스킨 팩', thumbnail: '/assets/images/neon.png',
    price: 500, originalPrice: 800, tag: 'SALE',
  },
  {
    id: 'shop-2', type: 'shop', size: 'small',
    title: '☕ 스타벅스 기프티콘', thumbnail: '/assets/images/billiards.png',
    price: 3000, tag: 'HOT',
  },
  // 🏆 랭킹 카드
  {
    id: 'ranking-1', type: 'ranking', size: 'small',
    title: '🏆 금주 TOP 3',
    entries: [
      { rank: 1, nickname: 'MossKing', value: '12,500 MMOC' },
      { rank: 2, nickname: 'NeonSlayer', value: '9,800 MMOC' },
      { rank: 3, nickname: 'PokerFace', value: '7,200 MMOC' },
    ],
  },
  // 👥 소셜 카드
  {
    id: 'social-1', type: 'social', size: 'small',
    title: '👥 접속 중인 친구',
    friends: [
      { nickname: 'ousersnt', status: 'in-game', game: '당구' },
      { nickname: 'unzoon9', status: 'online' },
      { nickname: 'kimlong', status: 'offline' },
    ],
  },
];

// ===== 채팅 메시지 =====
export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'c1', user: 'ousersnt', userId: 'U1', message: 'Anyone up for a round of pool?' },
  { id: 'c2', user: 'unzoon9', userId: 'U2', message: 'Sure, give me 5 minutes!' },
  { id: 'c3', user: 'kimlong', userId: 'U3', message: 'The new puzzle update is insane.' },
  { id: 'c4', user: 'guest99', userId: 'U4', message: 'Looking for team members for the tournament.' },
  { id: 'c5', user: 'ousersnt', userId: 'U1', message: 'lol really?' },
];

// ===== 아이콘 헬퍼 =====
export const getIcon = (name: string) => {
  switch (name) {
    case 'Home': return <Home size={20} />;
    case 'Gamepad2': return <Gamepad2 size={20} />;
    case 'History': return <History size={20} />;
    case 'LayoutGrid': return <LayoutGrid size={20} />;
    case 'Users': return <Users size={20} />;
    case 'Trophy': return <Trophy size={20} />;
    case 'Wallet': return <Wallet size={20} />;
    case 'ShoppingBag': return <ShoppingBag size={20} />;
    case 'Package': return <Package size={20} />;
    default: return <Home size={20} />;
  }
};
