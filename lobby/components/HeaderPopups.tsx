import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, UserPlus, Share2, Settings, MessageSquare, Bell, Heart, LogOut, Globe, ChevronRight, User, Mail, Youtube, Instagram, Twitter, Facebook } from 'lucide-react';
import { ALL_GAMES, ALL_CARDS } from '../constants';
import { NoticeCard } from '../types';
import { useEconomy } from '../context/EconomyContext';

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
    const [searchQuery, setSearchQuery] = useState('');

    // 친구와 함께 플레이 — 초대 링크를 클립보드에 복사
    const handlePlayTogether = () => {
        const inviteLink = `${window.location.origin}/invite/${Date.now()}`;
        navigator.clipboard.writeText(inviteLink).then(() => {
            alert('초대 링크가 클립보드에 복사되었습니다!\n' + inviteLink);
        }).catch(() => {
            alert('초대 링크: ' + inviteLink);
        });
    };

    // 프로필 공유 — 프로필 URL 복사
    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/profile/@leecman`;
        navigator.clipboard.writeText(profileUrl).then(() => {
            alert('프로필 링크가 클립보드에 복사되었습니다!');
        }).catch(() => {
            alert('프로필 링크: ' + profileUrl);
        });
    };

    // 검색 제출 처리
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            alert(`"${searchQuery}" 검색 결과: 아직 친구 검색 기능이 준비 중입니다.`);
        }
    };

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full bg-[#111319] border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#00ff99]"
                    />
                </div>

                {/* Actions */}
                <div className="space-y-2 mb-8">
                    <button
                        onClick={handlePlayTogether}
                        className="w-full bg-[#00ff99] hover:bg-[#00cc7a] text-black font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                        <UserPlus size={16} />
                        친구와 함께 플레이하기
                    </button>
                    <button
                        onClick={handleShareProfile}
                        className="w-full bg-[#3B3E4F] hover:bg-[#4B4E6F] text-white font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
                    >
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
// 메인에 있던 공지(notice) 카드를 여기서 알림으로 표시
export const NotificationsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const navigate = useNavigate();

    // constants에서 공지 타입 카드를 가져와 알림으로 표시
    const notices = ALL_CARDS.filter(c => c.type === 'notice') as NoticeCard[];

    return (
        <div className="w-80 bg-[#1C1E26] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                {/* 설정 아이콘 → /settings 이동 */}
                <Settings
                    size={18}
                    className="text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => { onClose(); navigate('/settings'); }}
                />
                <span className="font-bold text-white text-lg">알림</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            <div className="p-3 overflow-y-auto flex-1 space-y-2">
                {/* 공지 카드들을 알림 아이템으로 표시 */}
                {notices.map((notice) => (
                    <div
                        key={notice.id}
                        className="bg-[#151921] rounded-lg p-3 cursor-pointer hover:bg-[#1E2330] transition-colors group"
                        onClick={() => alert(`📢 ${notice.title}\n\n${notice.summary}`)}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#FF8C0015] rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                                {notice.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-bold leading-tight mb-1 group-hover:text-[#FF8C00] transition-colors">
                                    {notice.title}
                                </p>
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                    {notice.summary}
                                </p>
                                <span className="text-gray-600 text-[10px] mt-1 block">{notice.date}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 앱 알림 (기존) */}
                <div className="bg-[#2D2254] rounded-lg p-3 relative group hover:bg-[#352865] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">👀</span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold leading-tight mb-1">
                                모바일 앱 출시 예정!
                            </p>
                            <button
                                onClick={() => alert('모바일 앱은 현재 준비 중입니다! 🚀')}
                                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold px-4 py-1.5 rounded-full mt-1.5 w-full"
                            >
                                앱에서 플레이하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. My Games Popup ---
export const MyGamesPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'recent' | 'favorites' | 'likes'>('recent');
    // 로컬 상태로 게임 리스트 관리하여 삭제 기능 지원
    const [gameList, setGameList] = useState(ALL_GAMES.slice(0, 4));

    // 게임 카드 클릭 시 해당 게임으로 이동
    const handleGameClick = (gameId: string) => {
        onClose();
        navigate(`/game/${gameId}`);
    };

    // X 버튼 클릭 시 리스트에서 제거
    const handleRemoveGame = (e: React.MouseEvent, gameId: string) => {
        e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
        setGameList(prev => prev.filter(g => g.id !== gameId));
    };

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
                {gameList.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center h-full text-gray-500 text-sm">
                        게임이 없습니다
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {gameList.map((game) => (
                            <div
                                key={game.id}
                                className="relative group aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                                onClick={() => handleGameClick(game.id)}
                            >
                                <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{game.title}</span>
                                </div>
                                <button
                                    onClick={(e) => handleRemoveGame(e, game.id)}
                                    className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                                {/* New Badge for demo */}
                                {game.id === '2' && (
                                    <span className="absolute top-1 left-1 bg-[#8B5CF6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                        <span className="w-2 h-2">✨</span>New
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 4. Profile Popup ---
export const ProfilePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const navigate = useNavigate();
    const { logout } = useEconomy();

    // 메뉴 아이템 클릭 → 해당 페이지로 이동
    const handleMenuClick = (action: string) => {
        onClose();
        switch (action) {
            case '알림 기본 설정':
            case '개인정보 기본 설정':
            case '계정 설정':
                navigate('/settings');
                break;
            case '로그아웃':
                if (window.confirm('정말 로그아웃 하시겠습니까?')) {
                    logout();
                    navigate('/');
                }
                break;
        }
    };

    // 프로필 공유 → 클립보드 복사
    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/profile/@leecman`;
        navigator.clipboard.writeText(profileUrl).then(() => {
            alert('프로필 링크가 클립보드에 복사되었습니다!');
        }).catch(() => {
            alert('프로필 링크: ' + profileUrl);
        });
    };

    // SNS 링크 열기
    const handleSNS = (platform: string) => {
        const urls: Record<string, string> = {
            discord: 'https://discord.gg/mossarcade',
            youtube: 'https://youtube.com/@mossarcade',
            instagram: 'https://instagram.com/mossarcade',
            twitter: 'https://x.com/mossarcade',
            facebook: 'https://facebook.com/mossarcade',
        };
        window.open(urls[platform] || '#', '_blank');
    };

    // 하단 링크 클릭
    const handleFooterLink = (label: string) => {
        alert(`"${label}" 페이지는 준비 중입니다.`);
    };

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
                    {/* 프로필 버튼 → 설정 페이지로 이동 */}
                    <button
                        onClick={() => { onClose(); navigate('/settings'); }}
                        className="flex-1 bg-[#6D28D9] hover:bg-[#5B21B6] text-white py-2 rounded-full font-bold text-sm flex items-center justify-center gap-2"
                    >
                        <User size={16} />
                        프로필
                    </button>
                    {/* 편집 버튼 */}
                    <button
                        onClick={() => alert('프로필 편집 기능은 준비 중입니다. ✏️')}
                        className="w-10 h-10 bg-[#2D303E] hover:bg-[#3D4152] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="text-sm">✏️</span>
                    </button>
                    {/* 공유 버튼 */}
                    <button
                        onClick={handleShareProfile}
                        className="w-10 h-10 bg-[#2D303E] hover:bg-[#3D4152] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
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
                    <button
                        key={idx}
                        onClick={() => handleMenuClick(item.label)}
                        className="w-full px-6 py-3 flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="py-2 border-b border-white/10">
                <button
                    onClick={() => { onClose(); navigate('/help'); }}
                    className="w-full px-6 py-3 flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                >
                    <Mail size={18} />
                    문의하기
                </button>
            </div>

            <div className="p-6">
                {/* 언어 변경 */}
                <button
                    onClick={() => alert('언어 변경 기능은 준비 중입니다. 🌍')}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-6 group"
                >
                    <div className="w-8 h-8 rounded-full bg-[#2D303E] flex items-center justify-center group-hover:bg-[#3D4152]">
                        <Globe size={16} />
                    </div>
                    <span className="text-sm font-bold">한국어</span>
                </button>

                {/* 하단 링크 — 각각 클릭 가능 */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-gray-600 mb-6">
                    {['회사 정보', '어린이 사이트', '이용약관', '채용 정보', '개인정보 보호', '개발자 페이지', '모든 게임'].map(label => (
                        <button
                            key={label}
                            onClick={() => handleFooterLink(label)}
                            className="hover:text-gray-400 transition-colors"
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* SNS 아이콘 — 각각 외부 링크로 열기 */}
                <div className="flex gap-4 text-gray-600">
                    <button onClick={() => handleSNS('discord')} className="hover:text-white transition-colors"><MessageSquare size={16} /></button>
                    <button onClick={() => handleSNS('youtube')} className="hover:text-white transition-colors"><Youtube size={16} /></button>
                    <button onClick={() => handleSNS('instagram')} className="hover:text-white transition-colors"><Instagram size={16} /></button>
                    <button onClick={() => handleSNS('twitter')} className="hover:text-white transition-colors"><Twitter size={16} /></button>
                    <button onClick={() => handleSNS('facebook')} className="hover:text-white transition-colors"><Facebook size={16} /></button>
                </div>
            </div>
        </div>
    );
};
