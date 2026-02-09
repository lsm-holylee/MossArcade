import React from 'react';
import { History } from 'lucide-react';
import { ALL_GAMES } from '../constants';
import GameCard from '../components/GameCard';

const MatchHistory: React.FC = () => {
    // Simulate match history with a subset of games
    // Use games that look best in landscape (recommended style)
    const historyGames = [
        ...ALL_GAMES.slice(0, 5),
        ...ALL_GAMES.slice(0, 3),
    ];

    return (
        <div className="h-full bg-transparent overflow-y-auto px-6 py-6 pt-20 scrollbar-hide">
            <div className="flex items-center gap-2 mb-6">
                <History className="text-[#00ff99]" size={20} />
                <h1 className="text-lg font-bold text-gray-200">최근 플레이한 게임</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {historyGames.map((game, idx) => (
                    // Match the aspect ratio of 'Recommended Games' in Home.tsx for consistency
                    <div key={`${game.id}-${idx}`} className="aspect-square relative group">
                        <GameCard
                            game={game}
                            className="h-full"
                            badge={`${idx + 1}시간 전`}
                            badgeColor="bg-gray-800 text-gray-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchHistory;
