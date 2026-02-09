import React from 'react';
import { Zap } from 'lucide-react';
import { ALL_GAMES } from '../constants';
import GameCard from '../components/GameCard';

const Arcade: React.FC = () => {
    // New Arrival Games (Simulated)
    const newGames = [
        ...ALL_GAMES.slice(5, 10),
        ...ALL_GAMES.slice(0, 5),
    ];

    return (
        <div className="h-full bg-transparent overflow-y-auto px-6 py-6 pt-20 scrollbar-hide">
            <div className="flex items-center gap-2 mb-6">
                <Zap className="text-[#00ff99]" size={20} />
                <h1 className="text-lg font-bold text-gray-200">신규 도착 게임</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {newGames.map((game, idx) => (
                    <div key={`${game.id}-${idx}`} className="aspect-square relative group">
                        <GameCard
                            game={game}
                            className="h-full"
                            badge={idx < 3 ? 'NEW' : undefined}
                            badgeColor="bg-green-500 text-white"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Arcade;
