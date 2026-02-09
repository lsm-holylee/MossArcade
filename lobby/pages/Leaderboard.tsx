import React from 'react';
import { TrendingUp, Trophy } from 'lucide-react';
import { ALL_GAMES } from '../constants';
import GameCard from '../components/GameCard';

const Leaderboard: React.FC = () => {
    // Current Popular Games (Simulated)
    const popularGames = [
        ...ALL_GAMES.slice(0, 3), // Top 3
        ...ALL_GAMES.slice(6, 10),
        ...ALL_GAMES.slice(3, 6),
    ];

    return (
        <div className="h-full bg-transparent overflow-y-auto px-6 py-6 pt-20 scrollbar-hide">
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
