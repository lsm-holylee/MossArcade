
export interface Game {
  id: string;
  title: string;
  players: number;
  icon: string;
  category: 'recommended' | 'popular';
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
