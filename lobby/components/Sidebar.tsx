import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, MessageSquare, Settings, Info, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

const NAV_ITEMS = [
  { id: '', label: '홈', icon: Home },
  { id: 'leaderboard', label: '차트', icon: BarChart2 },
  { id: 'messages', label: '메시지', icon: MessageSquare },
  { id: 'settings', label: '설정', icon: Settings },
  { id: 'about', label: '소개', icon: Info },
  { id: 'help', label: '도움말 및 안전', icon: HelpCircle },
  { id: 'logout', label: '로그아웃', icon: LogOut, isAction: true },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
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
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isLogout = item.id === 'logout';

          return (
            <NavLink
              key={item.id}
              to={isLogout ? '#' : `/${item.id}`}
              className={({ isActive }) => `
                                flex items-center h-12 px-6 my-0.5 text-white/70 
                                transition-colors relative group
                                ${isActive && !isLogout
                  ? 'text-white font-bold before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:bg-white'
                  : 'hover:bg-white/10 hover:text-white'
                }
                                ${isLogout ? 'mt-auto text-red-400 hover:text-red-300 hover:bg-red-500/10' : ''}
                            `}
              onClick={(e) => {
                if (isLogout) {
                  e.preventDefault();
                  // Handle logout logic here if needed
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
      </nav>
    </aside>
  );
};

export default Sidebar;
