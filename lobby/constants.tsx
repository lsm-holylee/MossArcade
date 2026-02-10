import React from 'react';
import { Home, Gamepad2, History, Trophy, Users, LayoutGrid } from 'lucide-react';
import { NavItem, Game, ChatMessage } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'Home', active: true },
  { id: 'arcade', label: 'Arcade', icon: 'Gamepad2' },
  { id: 'match-history', label: 'Match History', icon: 'History' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'LayoutGrid' },
  { id: 'friends', label: 'Friends', icon: 'Users' },
  { id: 'tournaments', label: 'Tournaments', icon: 'Trophy' },
];

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

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'c1', user: 'ousersnt', userId: 'U1', message: 'Anyone up for a round of pool?' },
  { id: 'c2', user: 'unzoon9', userId: 'U2', message: 'Sure, give me 5 minutes!' },
  { id: 'c3', user: 'kimlong', userId: 'U3', message: 'The new puzzle update is insane.' },
  { id: 'c4', user: 'guest99', userId: 'U4', message: 'Looking for team members for the tournament.' },
  { id: 'c5', user: 'ousersnt', userId: 'U1', message: 'lol really?' },
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Home': return <Home size={20} />;
    case 'Gamepad2': return <Gamepad2 size={20} />;
    case 'History': return <History size={20} />;
    case 'LayoutGrid': return <LayoutGrid size={20} />;
    case 'Users': return <Users size={20} />;
    case 'Trophy': return <Trophy size={20} />;
    default: return <Home size={20} />;
  }
};
