import React from 'react';
import { ALL_GAMES } from '../constants';
import GameCarousel from '../components/GameCarousel';

const Home: React.FC = () => {
    // Organize games into categories for demo
    const continuePlaying = ALL_GAMES.slice(0, 4);
    const recommended = [ALL_GAMES[8], ALL_GAMES[9], ALL_GAMES[0], ALL_GAMES[1], ALL_GAMES[5], ALL_GAMES[6]];
    const trending = [ALL_GAMES[2], ALL_GAMES[4], ALL_GAMES[7], ALL_GAMES[3], ALL_GAMES[8], ALL_GAMES[0]];
    const topRated = [ALL_GAMES[7], ALL_GAMES[5], ALL_GAMES[1], ALL_GAMES[9], ALL_GAMES[2], ALL_GAMES[4]];
    const fighting = ALL_GAMES.filter(g => g.category === 'action' || g.category === 'sports');

    return (
        <div className="pb-10 max-w-[1600px] mx-auto text-white">
            {/* 1. Continue Playing */}
            <GameCarousel title="Continue Playing" games={continuePlaying} />

            {/* 2. Recommended */}
            <GameCarousel title="Recommended for You" games={recommended} />

            {/* 3. Trending */}
            <GameCarousel title="Trending Now" games={trending} />

            {/* 4. Top Rated */}
            <GameCarousel title="Top Rated" games={topRated} />

            {/* 5. Specific Genre */}
            <GameCarousel title="Action & Sports" games={fighting} />
        </div>
    );
};

export default Home;
