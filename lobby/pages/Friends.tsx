import React, { useMemo } from 'react';
import { Users, MoreVertical, MessageCircle, Gamepad2 } from 'lucide-react';
import { ALL_CARDS } from '../constants';
import { SocialCard } from '../types';

const Friends: React.FC = () => {
    // constants에서 소셜 카드 데이터 가져오기 (접속 중인 친구)
    // 원래는 별도의 친구 목록 API가 있어야 하지만, 현재는 카드의 데이터를 활용
    const socialData = useMemo(() => {
        const card = ALL_CARDS.find(c => c.type === 'social') as SocialCard | undefined;
        return card ? card.friends : [];
    }, []);

    // 기존 더미 데이터 + 소셜 카드 데이터 병합 (데모용)
    const allFriends = [
        ...socialData.map((f, idx) => ({
            id: `social-${idx}`,
            name: f.nickname,
            status: f.status,
            game: f.game || (f.status === 'in-game' ? 'Playing a game' : undefined),
            avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${f.nickname}`,
            lastSeen: f.status === 'offline' ? '10m ago' : undefined
        })),
        { id: 1, name: 'Sarah Connor', status: 'online', game: 'Playing Billiards', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Sarah' },
        { id: 2, name: 'John Doe', status: 'offline', lastSeen: '2h ago', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=John' },
        { id: 3, name: 'Alex Smith', status: 'online', game: 'In Lobby', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex' },
        { id: 4, name: 'Kate Wilson', status: 'online', game: 'Playing Puzzle Mix', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Kate' },
    ];

    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 relative z-10">
                <Users className="text-[#FFD700]" size={24} />
                <h1 className="text-2xl font-bold text-white">Friends</h1>
                <span className="bg-[#111622] text-[#64748B] text-xs px-2 py-0.5 rounded border border-[#1E2330] ml-2">
                    {allFriends.length}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {allFriends.map((friend) => (
                    <div key={friend.id} className="bg-[#111622] border border-[#1E2330] p-4 rounded-xl flex items-center justify-between group hover:border-[#FFD70044] transition-all">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full bg-[#1E2330]" />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#111622] ${friend.status === 'online' || friend.status === 'in-game' ? 'bg-green-500' : 'bg-gray-500'}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">{friend.name}</h3>
                                <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                                    {friend.status === 'in-game' ? (
                                        <>
                                            <Gamepad2 size={12} className="text-[#FFD700]" />
                                            <span className="text-[#FFD700]">{friend.game}</span>
                                        </>
                                    ) : friend.status === 'online' ? (
                                        <span className="text-green-400">Online</span>
                                    ) : (
                                        <span>Last seen {friend.lastSeen}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => alert(`${friend.name}님에게 메시지 보내기 기능은 준비 중입니다. 💬`)}
                                className="p-2 hover:bg-white/5 rounded-lg text-[#94A3B8] hover:text-white transition-colors"
                            >
                                <MessageCircle size={16} />
                            </button>
                            <button
                                onClick={() => alert(`${friend.name}님의 프로필 보기, 차단, 삭제 등의 옵션은 준비 중입니다.`)}
                                className="p-2 hover:bg-white/5 rounded-lg text-[#94A3B8] hover:text-white transition-colors"
                            >
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;
