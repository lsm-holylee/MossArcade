import React from 'react';
import { History, Trophy } from 'lucide-react';

const MatchHistory: React.FC = () => {
    const matches = [
        { id: 1, game: 'Billiards', result: 'Victory', score: '3 - 1', date: '2 hours ago', xp: '+120' },
        { id: 2, game: 'Poker Night', result: 'Defeat', score: '$0', date: '5 hours ago', xp: '+20' },
        { id: 3, game: 'Space Shoot', result: 'Victory', score: 'Level 15', date: '1 day ago', xp: '+350' },
        { id: 4, game: 'Card Battle', result: 'Victory', score: 'Rank Up', date: '2 days ago', xp: '+500' },
    ];

    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 relative z-10">
                <History className="text-[#FFD700]" size={24} />
                <h1 className="text-2xl font-bold text-white">Match History</h1>
            </div>

            <div className="space-y-4 relative z-10 max-w-4xl">
                {matches.map((match) => (
                    <div key={match.id} className="bg-[#111622] border border-[#1E2330] rounded-xl p-4 flex items-center justify-between hover:border-[#FFD70044] transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${match.result === 'Victory' ? 'bg-[#FFD7001A] text-[#FFD700]' : 'bg-red-500/10 text-red-500'}`}>
                                <Trophy size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">{match.game}</h3>
                                <p className="text-xs text-[#64748B]">{match.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Score</p>
                                <p className="font-mono text-white text-sm">{match.score}</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${match.result === 'Victory' ? 'text-[#FFD700]' : 'text-red-500'}`}>
                                    {match.result}
                                </p>
                                <p className="text-[10px] font-bold text-[#64748B]">{match.xp} XP</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchHistory;
