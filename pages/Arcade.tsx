import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { RECOMMENDED_GAMES, POPULAR_GAMES } from '../constants';
import GameCard from '../components/GameCard';

const Arcade: React.FC = () => {
    const allGames = [...RECOMMENDED_GAMES, ...POPULAR_GAMES];

    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 relative z-10">
                <Gamepad2 className="text-[#FFD700]" size={24} />
                <h1 className="text-2xl font-bold text-white">Arcade</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
                {allGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default Arcade;
