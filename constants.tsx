
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

export const RECOMMENDED_GAMES: Game[] = [
  { id: '1', title: 'Billiards', players: 328, icon: '/assets/images/billiards.png', category: 'recommended' },
  { id: '2', title: 'Card Battle', players: 84, icon: '/assets/images/card-battle.png', category: 'recommended' },
  { id: '3', title: 'Rochambeau', players: 12, icon: '/assets/images/rochambeau.png', category: 'recommended' },
  { id: '4', title: 'Puzzle Mix', players: 156, icon: '/assets/images/puzzle-mix.png', category: 'recommended' },
  { id: '5', title: 'Monster Park', players: 49, icon: '/assets/images/monster-park.png', category: 'recommended' },
];

export const POPULAR_GAMES: Game[] = [
  { id: '6', title: 'Hoops 3D', players: 201, icon: '/assets/images/hoops-3d.png', category: 'popular' },
  { id: '7', title: 'Poker Night', players: 550, icon: '/assets/images/poker-night.png', category: 'popular' },
  { id: '8', title: 'Ancient Ruins', players: 76, icon: '/assets/images/ancient-ruins.png', category: 'popular' },
  { id: '9', title: 'Space Shoot', players: 112, icon: '/assets/images/space-shoot.png', category: 'popular' },
  { id: '10', title: 'Geo Dash', players: 98, icon: '/assets/images/geo-dash.png', category: 'popular' },
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
