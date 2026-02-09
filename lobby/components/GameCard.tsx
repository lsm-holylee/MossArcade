import React from 'react';
import { Link } from 'react-router-dom';
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
  badge,
  badgeColor
}) => {
  return (
    <Link
      to={`/game/${game.id}`}
      className={`group relative rounded-lg overflow-hidden bg-[#16161a] cursor-pointer block border border-white/[0.03] ${className}`}
    >
      {/* Badge */}
      {badge && (
        <span className={`absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold shadow-md ${badgeColor || 'bg-gray-700 text-white'}`}>
          {badge}
        </span>
      )}

      {/* Image */}
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={game.icon}
          alt={game.title}
          className="w-full h-full object-cover bg-[#1a1a20] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          loading="lazy"
        />
      </div>

      {/* Title Overlay */}
      {showTitle && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <h4 className="text-gray-200 font-bold text-[11px] truncate leading-tight drop-shadow-md group-hover:text-[#00ff99] transition-colors font-orbitron uppercase">
              {game.title}
            </h4>
          </div>
        </>
      )}
    </Link>
  );
};

export default GameCard;
