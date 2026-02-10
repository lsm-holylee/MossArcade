import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, User } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  className?: string;
  showTitle?: boolean;
  badge?: string;
  badgeColor?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  className = '',
  showTitle = true,
}) => {
  // Mock random stats for demo
  const rating = (85 + Math.random() * 14).toFixed(0);
  const ccu = (Math.random() * 50 + 1).toFixed(1) + 'k';

  return (
    <Link
      to={`/game/${game.id}`}
      className={`group flex flex-col gap-1.5 cursor-pointer ${className}`}
    >
      {/* Thumbnail Container 16:9 */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#1e1e20] shadow-sm group-hover:shadow-md transition-all">
        <img
          src={game.icon}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Game Info */}
      <div className="px-1">
        <h4 className="font-bold text-white text-[15px] leading-tight truncate group-hover:underline decoration-white/50">
          {game.title}
        </h4>

        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <div className="flex items-center gap-1">
            <ThumbsUp size={12} className="text-gray-400" />
            <span>{rating}%</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={12} className="text-gray-400" />
            <span>{ccu}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
