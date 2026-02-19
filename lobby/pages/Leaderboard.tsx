import React, { useMemo } from 'react';
import { TrendingUp, Trophy, Medal, Crown } from 'lucide-react';
import { ALL_GAMES, ALL_CARDS } from '../constants';
import { RankingCard } from '../types';
import GameCard from '../components/GameCard';

const Leaderboard: React.FC = () => {
    // 랭킹 카드 데이터 가져오기 (금주 TOP 3)
    const rankingData = useMemo(() => {
        const card = ALL_CARDS.find(c => c.type === 'ranking') as RankingCard | undefined;
        return card ? card.entries : [];
    }, []);

    // Current Popular Games (Simulated)
    const popularGames = [
        ...ALL_GAMES.slice(0, 3), // Top 3
        ...ALL_GAMES.slice(6, 10),
        ...ALL_GAMES.slice(3, 6),
    ];

    return (
        <div className="h-full bg-transparent overflow-y-auto px-6 py-6 pt-20 scrollbar-hide">
            {/* 1. Weekly Ranking Top 3 Section */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Trophy className="text-[#00ff99]" size={24} />
                    <h1 className="text-xl font-bold text-white">금주 랭킹 TOP 3</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Rank 2 */}
                    {rankingData[1] && (
                        <div className="bg-[#151921] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-end mt-8 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-[#C0C0C0] overflow-hidden bg-gray-800 shadow-[0_0_20px_rgba(192,192,192,0.3)]">
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rankingData[1].nickname}`} alt="Rank 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded absolute top-6 right-1/2 translate-x-1/2 translate-y-2 border border-gray-600">#2</div>

                            <div className="mt-8 text-center">
                                <h3 className="text-lg font-bold text-white mb-1">{rankingData[1].nickname}</h3>
                                <p className="text-[#00ff99] font-mono font-bold">{rankingData[1].value}</p>
                            </div>
                        </div>
                    )}

                    {/* Rank 1 */}
                    {rankingData[0] && (
                        <div className="bg-[#1A1D26] border border-[#FFD700]/30 rounded-xl p-6 flex flex-col items-center justify-end relative shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#FFD700] animate-bounce">
                                <Crown size={32} fill="#FFD700" />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-[#FFD700] overflow-hidden bg-gray-800 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rankingData[0].nickname}`} alt="Rank 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-full absolute top-8 right-1/2 translate-x-1/2 translate-y-1 shadow-lg">#1</div>

                            <div className="mt-10 text-center">
                                <h3 className="text-xl font-bold text-[#FFD700] mb-1">{rankingData[0].nickname}</h3>
                                <p className="text-[#00ff99] font-mono font-bold text-lg">{rankingData[0].value}</p>
                            </div>
                        </div>
                    )}

                    {/* Rank 3 */}
                    {rankingData[2] && (
                        <div className="bg-[#151921] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-end mt-12 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-[#CD7F32] overflow-hidden bg-gray-800 shadow-[0_0_20px_rgba(205,127,50,0.3)]">
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rankingData[2].nickname}`} alt="Rank 3" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[#CD7F32] text-white text-xs font-bold px-2 py-0.5 rounded absolute top-6 right-1/2 translate-x-1/2 translate-y-2 border border-[#8B4513]">#3</div>

                            <div className="mt-8 text-center">
                                <h3 className="text-lg font-bold text-white mb-1">{rankingData[2].nickname}</h3>
                                <p className="text-[#00ff99] font-mono font-bold">{rankingData[2].value}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-8" />

            {/* 2. Popular Games Grid */}
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-[#00ff99]" size={20} />
                <h1 className="text-lg font-bold text-gray-200">현재 인기있는 게임</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {popularGames.map((game, idx) => (
                    <div key={`${game.id}-${idx}`} className="aspect-square relative group">
                        <GameCard
                            game={game}
                            className="h-full"
                            badge={`Rank #${idx + 1}`}
                            badgeColor={idx < 3 ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'}
                        />
                        {/* Optional Trophy Icon for Top 3 */}
                        {idx < 3 && (
                            <div className="absolute -top-1 -right-1 z-20">
                                <Trophy size={16} className={`text-yellow-400 drop-shadow-md`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
