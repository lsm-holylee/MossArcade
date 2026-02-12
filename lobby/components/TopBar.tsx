import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Ghost, Settings } from 'lucide-react';
import { NotificationsPopup, ProfilePopup } from './HeaderPopups';
import { useEconomy } from '../context/EconomyContext';

interface TopBarProps {
    onToggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
    const { mossCoin } = useEconomy();
    const navigate = useNavigate();
    const [activePopup, setActivePopup] = useState<'notifications' | 'profile' | null>(null);

    const togglePopup = (popup: 'notifications' | 'profile') => {
        setActivePopup(prev => prev === popup ? null : popup);
    };
    const closePopups = () => setActivePopup(null);

    // 코인 포맷팅
    const formatCoin = (amount: number) => {
        if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
        return amount.toLocaleString();
    };

    return (
        <>
            <header className="h-14 bg-[#1a1a1c] border-b border-white/5 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
                {/* Left: 메뉴 + 로고 (클릭 시 홈) */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="topbar-icon-btn"
                        title="메뉴 열기/닫기"
                    >
                        <Menu size={20} />
                    </button>

                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate('/home')}
                        title="홈으로 이동"
                    >
                        <Ghost className="text-[#FF8C00] w-6 h-6" />
                        <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
                            Moss Arcade
                        </span>
                    </div>
                </div>

                {/* Center: 검색 */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-gray-400 w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="게임 검색..."
                            className="w-full bg-[#2a2a2c] text-white border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-[#FF8C00]/50 focus:outline-none placeholder-gray-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Right: 코인 + 버튼들 */}
                <div className="flex items-center gap-1">
                    {/* MMOC 잔고 (클릭 → /wallet) */}
                    <button
                        onClick={() => navigate('/wallet')}
                        className="topbar-coin-btn"
                        title="지갑 열기"
                    >
                        <span className="coin-icon">M</span>
                        <span className="coin-amount">{formatCoin(mossCoin)}</span>
                    </button>

                    {/* 알림 */}
                    <button
                        onClick={() => togglePopup('notifications')}
                        className={`topbar-icon-btn ${activePopup === 'notifications' ? 'active' : ''}`}
                        title="알림"
                    >
                        <Bell size={18} />
                        <span className="notif-dot" />
                    </button>

                    {/* 설정 → /settings */}
                    <button
                        onClick={() => navigate('/settings')}
                        className="topbar-icon-btn"
                        title="설정"
                    >
                        <Settings size={18} />
                    </button>

                    {/* 프로필 */}
                    <button
                        onClick={() => togglePopup('profile')}
                        className={`topbar-profile-btn ${activePopup === 'profile' ? 'active' : ''}`}
                        title="프로필"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Moss"
                            alt="Profile"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                    </button>
                </div>
            </header>

            {/* 팝업 */}
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
