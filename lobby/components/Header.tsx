import React, { useState } from 'react';
import { Menu, Search, Users, Bell, Heart, Ghost } from 'lucide-react';
import { FriendsPopup, NotificationsPopup, MyGamesPopup, ProfilePopup } from './HeaderPopups';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default true for demo
  const [activePopup, setActivePopup] = useState<'friends' | 'notifications' | 'mygames' | 'profile' | null>(null);

  const togglePopup = (popup: 'friends' | 'notifications' | 'mygames' | 'profile') => {
    setActivePopup(prev => prev === popup ? null : popup);
  };

  const closePopups = () => setActivePopup(null);

  return (
    <>
      <header className="header h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
        {/* Left: Toggle + Logo */}
        <div className="flex items-center gap-5">
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-[#00ff99] transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded flex items-center justify-center shadow-lg">
              <Ghost className="text-black w-5 h-5" />
            </div>
            <span className="font-orbitron font-bold text-xl tracking-tighter text-white">MOSS ARCADE</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="search-bar bg-[#1a1a20] border border-white/10 rounded-lg px-4 py-2.5 flex items-center gap-3 transition-colors">
            <Search className="text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="게임 및 카테고리 검색"
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-600"
            />
          </div>
        </div>

        {/* Right: Icons + Auth */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => togglePopup('friends')}
            className={`header-icon-btn p-2.5 rounded-lg transition-all relative ${activePopup === 'friends' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            title="친구"
          >
            <Users size={20} />
          </button>

          <button
            onClick={() => togglePopup('notifications')}
            className={`header-icon-btn p-2.5 rounded-lg transition-all relative ${activePopup === 'notifications' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            title="알림"
          >
            <Bell size={20} />
            <span className="notification-dot">1</span>
          </button>

          <button
            onClick={() => togglePopup('mygames')}
            className={`header-icon-btn p-2.5 rounded-lg transition-all relative ${activePopup === 'mygames' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            title="내 게임"
          >
            <Heart size={20} />
          </button>

          {/* Auth Button */}
          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg font-bold text-sm ml-2 transition-all hover:shadow-[0_0_15px_rgba(109,40,217,0.4)]"
            >
              로그인
            </button>
          ) : (
            <div className="relative ml-2">
              <button
                onClick={() => togglePopup('profile')}
                className={`flex items-center gap-2 pl-2 rounded-full transition-all border-2 ${activePopup === 'profile' ? 'border-[#00ff99]' : 'border-transparent hover:border-white/20'}`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800">
                  <img
                    src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Moss"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Popups Layer (Fixed positioning relative to window) */}
      {activePopup && (
        <>
          {/* Transparent backdrop to close popup when clicking outside */}
          <div className="fixed inset-0 z-40 bg-transparent" onClick={closePopups} />

          <div className="fixed top-16 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {activePopup === 'friends' && <FriendsPopup onClose={closePopups} />}
            {activePopup === 'notifications' && <NotificationsPopup onClose={closePopups} />}
            {activePopup === 'mygames' && <MyGamesPopup onClose={closePopups} />}
            {activePopup === 'profile' && <ProfilePopup onClose={closePopups} />}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
