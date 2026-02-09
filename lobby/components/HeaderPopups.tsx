import React, { useState } from 'react';
import { X, Search, UserPlus, Share2, Settings, MessageSquare, Bell, Heart, LogOut, Globe, ChevronRight, User, Mail, Youtube, Instagram, Twitter, Facebook } from 'lucide-react';
import { ALL_GAMES } from '../constants';

// --- Shared Components ---
const PopupHeader: React.FC<{ title: string; onClose: () => void; icon?: React.ReactNode }> = ({ title, onClose, icon }) => (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
            {icon}
            <span className="font-bold text-white text-lg">{title}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
        </button>
    </div>
);

// --- 1. Friends Popup ---
export const FriendsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="w-80 bg-[#1C1E26] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <PopupHeader title="친구" onClose={onClose} />

            <div className="p-4 flex-1 flex flex-col">
                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="신규 또는 기존 친구 검색"
                        className="w-full bg-[#111319] border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#00ff99]"
                    />
                </div>

                {/* Actions */}
                <div className="space-y-2 mb-8">
                    <button className="w-full bg-[#00ff99] hover:bg-[#00cc7a] text-black font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors text-sm">
                        <UserPlus size={16} />
                        친구와 함께 플레이하기
                    </button>
                    <button className="w-full bg-[#3B3E4F] hover:bg-[#4B4E6F] text-white font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors text-sm">
                        <Share2 size={16} />
                        프로필 공유
                    </button>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-80">
                    <h3 className="text-white font-bold text-lg mb-2">여긴 조용해요 ...</h3>
                    <p className="text-gray-400 text-xs px-4 leading-relaxed">
                        친구의 사용자 아이디 또는 <span className="text-[#8B5CF6]">QR코드 공유/초대 링크</span>를 검색하여 친구를 초대합니다.
                    </p>
                    {/* Placeholder Illustration */}
                    <div className="mt-6 w-full h-32 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg flex items-end justify-center pb-2">
                        <span className="text-4xl">👾👾</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. Notifications Popup ---
export const NotificationsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="w-80 bg-[#1C1E26] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Settings size={18} className="text-gray-400 cursor-pointer hover:text-white" />
                <span className="font-bold text-white text-lg">알림</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            <div className="p-4">
                <div className="bg-[#2D2254] rounded-lg p-4 relative group hover:bg-[#352865] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">👀</span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold leading-tight mb-1">
                                출시되었습니다! 크레이지게임즈 모바일 앱의 재미를 놓치지 마세요!
                            </p>
                            <button className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold px-4 py-2 rounded-full mt-2 w-full">
                                앱에서 플레이하기
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2 text-gray-400">
                        <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-white rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. My Games Popup ---
export const MyGamesPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<'recent' | 'favorites' | 'likes'>('recent');

    return (
        <div className="w-80 bg-[#1C1E26] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <PopupHeader title="내 게임" onClose={onClose} />

            {/* Tabs */}
            <div className="flex border-b border-white/10">
                {(['recent', 'favorites', 'likes'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab === 'recent' ? '최근' : tab === 'favorites' ? '즐겨찾기' : '좋아요'}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6D28D9]"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-2 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-2">
                    {ALL_GAMES.slice(0, 4).map((game) => (
                        <div key={game.id} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10">
                            <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{game.title}</span>
                            </div>
                            <button className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={12} />
                            </button>
                            {/* New Badge for demo */}
                            {game.id === '2' && (
                                <span className="absolute top-1 left-1 bg-[#8B5CF6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                    <span className="w-2 h-2">✨</span> New
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 4. Profile Popup ---
export const ProfilePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="w-80 bg-[#1C1E26] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] overflow-y-auto custom-scrollbar">
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-col items-center px-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 rounded-full border-4 border-[#1C1E26] shadow-xl overflow-hidden mb-3 relative">
                    <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Moss" className="w-full h-full object-cover bg-gray-800" />
                </div>
                <h2 className="text-white font-bold text-lg">@leecman</h2>
                <p className="text-gray-500 text-xs mt-1">leesangmin7997@gmail.com</p>

                <div className="mt-4 flex gap-2 w-full">
                    <button className="flex-1 bg-[#6D28D9] hover:bg-[#5B21B6] text-white py-2 rounded-full font-bold text-sm flex items-center justify-center gap-2">
                        <User size={16} />
                        프로필
                    </button>
                    <button className="w-10 h-10 bg-[#2D303E] hover:bg-[#3D4152] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <span className="text-sm">✏️</span>
                    </button>
                    <button className="w-10 h-10 bg-[#2D303E] hover:bg-[#3D4152] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            <div className="py-2 border-b border-white/10">
                {[
                    { icon: <Bell size={18} />, label: "알림 기본 설정" },
                    { icon: <User size={18} />, label: "개인정보 기본 설정" },
                    { icon: <Settings size={18} />, label: "계정 설정" },
                    { icon: <LogOut size={18} />, label: "로그아웃" },
                ].map((item, idx) => (
                    <button key={idx} className="w-full px-6 py-3 flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="py-2 border-b border-white/10">
                <button className="w-full px-6 py-3 flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                    <Mail size={18} />
                    문의하기
                </button>
            </div>

            <div className="p-6">
                <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-6 group">
                    <div className="w-8 h-8 rounded-full bg-[#2D303E] flex items-center justify-center group-hover:bg-[#3D4152]">
                        <Globe size={16} />
                    </div>
                    <span className="text-sm font-bold">한국어</span>
                </button>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-gray-600 mb-6">
                    <a href="#" className="hover:text-gray-400">회사 정보</a>
                    <a href="#" className="hover:text-gray-400">어린이 사이트</a>
                    <a href="#" className="hover:text-gray-400">이용약관</a>
                    <a href="#" className="hover:text-gray-400">채용 정보</a>
                    <a href="#" className="hover:text-gray-400">개인정보 보호</a>
                    <a href="#" className="hover:text-gray-400">개발자 페이지</a>
                    <a href="#" className="hover:text-gray-400">모든 게임</a>
                </div>

                <div className="flex gap-4 text-gray-600">
                    <button className="hover:text-white transition-colors"><MessageSquare size={16} /></button>
                    <button className="hover:text-white transition-colors"><Youtube size={16} /></button>
                    <button className="hover:text-white transition-colors"><Instagram size={16} /></button>
                    <button className="hover:text-white transition-colors"><Twitter size={16} /></button>
                    <button className="hover:text-white transition-colors"><Facebook size={16} /></button>
                </div>
            </div>
        </div>
    );
};
