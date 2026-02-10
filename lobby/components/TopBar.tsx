import React, { useState } from 'react';
import { Menu, Search, Users, Bell, Heart, Ghost, Settings } from 'lucide-react';
import { FriendsPopup, NotificationsPopup, MyGamesPopup, ProfilePopup } from './HeaderPopups';

interface TopBarProps {
    onToggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [activePopup, setActivePopup] = useState<'friends' | 'notifications' | 'mygames' | 'profile' | null>(null);

    const togglePopup = (popup: 'friends' | 'notifications' | 'mygames' | 'profile') => {
        setActivePopup(prev => prev === popup ? null : popup);
    };

    const closePopups = () => setActivePopup(null);

    return (
        <>
            <header className="h-14 bg-[#1a1a1c] border-b border-white/5 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
                {/* Left: Logo & Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Ghost className="text-white w-6 h-6 hover:animate-bounce" />
                        </div>
                        <span className="font-orbitron font-bold text-xl tracking-tighter text-white hidden sm:block">
                            MOSS
                        </span>
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-gray-400 w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="검색"
                            className="w-full bg-[#2a2a2c] text-white border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-white/20 placeholder-gray-500 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Right: User Actions */}
                <div className="flex items-center gap-2">
                    {/* Gold Pill */}
                    <div className="hidden sm:flex items-center bg-[#2a2a2c] rounded-full px-3 py-1 mr-2 cursor-pointer hover:bg-[#3a3a3c] transition-colors border border-white/5">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold text-black">G</div>
                        <span className="text-sm font-bold text-white pr-2">3.0M</span>
                    </div>

                    <button
                        onClick={() => togglePopup('notifications')}
                        className={`p-2 rounded-full transition-colors relative ${activePopup === 'notifications' ? 'bg-white/10 text-white' : 'text-white hover:bg-white/10'}`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1a1a1c]"></span>
                    </button>

                    <button
                        className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                    >
                        <Settings size={20} />
                    </button>

                    {/* Profile */}
                    <div className="relative ml-1">
                        <button
                            onClick={() => togglePopup('profile')}
                            className={`flex items-center gap-2 rounded-full p-1 transition-all ${activePopup === 'profile' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 ring-2 ring-transparent hover:ring-white/20 transition-all">
                                <img
                                    src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Moss"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Popups */}
            {activePopup && (
                <>
                    <div className="fixed inset-0 z-40 bg-transparent" onClick={closePopups} />
                    <div className="fixed top-14 right-4 z-50">
                        {activePopup === 'notifications' && <NotificationsPopup onClose={closePopups} />}
                        {activePopup === 'profile' && <ProfilePopup onClose={closePopups} />}
                    </div>
                </>
            )}
        </>
    );
};

export default TopBar;
