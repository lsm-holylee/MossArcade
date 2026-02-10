import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Game } from '../types';
import GameCard from './GameCard';

interface GameCarouselProps {
    title: string;
    games: Game[];
}

const GameCarousel: React.FC<GameCarouselProps> = ({ title, games }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -600 : 600;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="mb-8 relative group">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-xl font-bold text-white font-orbitron tracking-tight">{title}</h2>
                <button className="text-gray-400 text-xs font-bold hover:text-white transition-colors uppercase tracking-wider">
                    See All
                </button>
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                    onClick={() => scroll('left')}
                    className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white p-2 rounded-r-lg backdrop-blur-sm transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                    onClick={() => scroll('right')}
                    className="pointer-events-auto bg-black/50 hover:bg-black/80 text-white p-2 rounded-l-lg backdrop-blur-sm transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1 scroll-smooth snap-x"
            >
                {games.map((game) => (
                    <div key={game.id} className="min-w-[200px] md:min-w-[240px] snap-start">
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GameCarousel;
