import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Wallet, ShoppingBag, LayoutGrid,
  Users, Trophy, History, Settings, LogOut, HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

// 기획서 5.1 사이드바 메뉴: Home, Wallet, Marketplace, Leaderboard, Friends, Tournaments, Match History
const NAV_ITEMS = [
  { id: '', label: '홈', icon: Home },
  { id: 'wallet', label: '지갑', icon: Wallet },
  { id: 'marketplace', label: '마켓', icon: ShoppingBag },
  { id: 'leaderboard', label: '리더보드', icon: LayoutGrid },
  { id: 'friends', label: '친구', icon: Users },
  { id: 'tournaments', label: '토너먼트', icon: Trophy },
  { id: 'match-history', label: '전적', icon: History },
  // 하단 메뉴
  { id: 'settings', label: '설정', icon: Settings, isBottom: true },
  { id: 'help', label: '도움말', icon: HelpCircle, isBottom: true },
  { id: 'logout', label: '로그아웃', icon: LogOut, isAction: true },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const topItems = NAV_ITEMS.filter(i => !i.isBottom && !i.isAction);
  const bottomItems = NAV_ITEMS.filter(i => i.isBottom || i.isAction);

  return (
    <aside
      className={`
        fixed top-14 left-0 h-[calc(100vh-56px)] bg-[#1a1a1c]
        border-r border-white/5 z-40 overflow-y-auto custom-scrollbar
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-60' : 'w-0 md:w-[72px]'}
      `}
    >
      <nav className="flex flex-col py-2 h-full">
        {/* 상단 메뉴 */}
        {topItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={({ isActive }) => `
                flex items-center h-12 px-6 my-0.5 text-white/70 
                transition-colors relative group
                ${isActive
                  ? 'text-white font-bold before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:bg-[#FF8C00]'
                  : 'hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <div className="flex items-center justify-center w-6 h-6 min-w-[24px]">
                <Icon size={22} strokeWidth={2.5} />
              </div>
              <span
                className={`
                  ml-4 text-[15px] whitespace-nowrap transition-opacity duration-200
                  ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
                `}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* 구분선 + 하단 메뉴 */}
        <div className="mt-auto border-t border-white/5 pt-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.isAction;
            return (
              <NavLink
                key={item.id}
                to={isLogout ? '#' : `/${item.id}`}
                className={`
                  flex items-center h-12 px-6 my-0.5 text-white/70
                  transition-colors relative group
                  ${isLogout ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'hover:bg-white/10 hover:text-white'}
                `}
                onClick={(e) => {
                  if (isLogout) {
                    e.preventDefault();
                    console.log('Logout clicked');
                  }
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 min-w-[24px]">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <span
                  className={`
                    ml-4 text-[15px] whitespace-nowrap transition-opacity duration-200
                    ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
                  `}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
