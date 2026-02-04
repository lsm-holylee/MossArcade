
import React from 'react';
import { User } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group bg-[#151B26] border border-[#1E2330] rounded-xl p-3 flex flex-col gap-3 hover:border-[#FFD70055] hover:bg-[#1A202E] transition-all cursor-pointer shadow-lg hover:-translate-y-1">
      <div className="aspect-[4/5] bg-[#0A0F18] rounded-lg relative overflow-hidden">
        <img 
          src={game.icon} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F18] via-transparent to-transparent opacity-60" />
        
        {/* Subtle decorative overlay for active-like feeling */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFD70022] rounded-lg transition-colors pointer-events-none" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-center font-bold text-sm group-hover:text-[#FFD700] transition-colors truncate">
          {game.title}
        </h3>
        
        <div className="flex items-center justify-center gap-1 text-[#64748B] font-bold text-[10px]">
          <User size={10} strokeWidth={3} />
          {game.players} Active
        </div>
      </div>
      
      <button className="bg-[#FFD700] text-[#05070A] py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#FFE033] active:scale-95 transition-all shadow-[0_4px_10px_rgba(255,215,0,0.1)]">
        Quick Join
      </button>
    </div>
  );
};

export default GameCard;
