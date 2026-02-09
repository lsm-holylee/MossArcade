import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, History, Zap, TrendingUp, Swords, Car, Brain, Target, Wallet } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'match-history', label: '최근 플레이한 게임', icon: History },
  { id: 'arcade', label: '신규 게임', icon: Zap },
  { id: 'leaderboard', label: '현재 인기있는 게임', icon: TrendingUp },
];

const CATEGORIES = [
  { id: 'action', label: '액션', icon: Swords },
  { id: 'racing', label: '레이싱', icon: Car },
  { id: 'puzzle', label: '퍼즐', icon: Brain },
  { id: 'shooting', label: '슈팅', icon: Target },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className="sidebar-fixed fixed left-0 top-16 h-[calc(100vh-64px)] bg-[#0d0d12] border-r border-white/5 flex flex-col z-40"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                  ? 'bg-white/5 text-white'
                  : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                }
                            `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-[#00ff99]' : 'group-hover:text-[#00ff99]'} />
                  <span className="font-medium text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* Category Section */}
        <div className="pt-6 pb-2 px-4">
          <span className="text-[11px] text-gray-500 uppercase font-bold tracking-widest">
            장르별 카테고리
          </span>
        </div>

        {CATEGORIES.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={`/category/${item.id}`}
              className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                  ? 'bg-white/5 text-white'
                  : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                }
                            `}
            >
              <Icon size={20} className="group-hover:text-[#00ff99]" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Wallet Section */}
      <div className="px-4 py-6 border-t border-white/5 mx-2">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>WALLET</span>
          <Wallet size={12} />
        </div>
        <span className="font-orbitron font-bold text-lg text-[#00ff99]">0 MOC</span>
      </div>
    </aside>
  );
};

export default Sidebar;
