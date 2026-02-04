
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, getIcon } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex flex-col bg-[#111622] border-r border-[#1E2330] h-full overflow-y-auto">
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`} // Assuming routes are /home, /arcade, etc. matching items.id
            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
              ? 'bg-[#FFD7001A] text-[#FFD700] border border-[#FFD70033]'
              : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-[#FFD700]' : 'text-[#94A3B8] group-hover:text-white'}>
                  {getIcon(item.icon)}
                </span>
                <span className="font-semibold text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mb-2">
        <div className="bg-[#151B26] border border-[#1E2330] rounded-xl p-4 shadow-xl">
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3">Current Season</p>
          <div className="w-full bg-[#05070A] h-2 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#EAB308] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.3)]"
              style={{ width: '60%' }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold">
            <span className="text-[#FFD700]">Lvl 12</span>
            <span className="text-[#64748B]">1200 / 2000 XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
