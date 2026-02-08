import React from 'react';
import { LayoutGrid, Crown, Medal } from 'lucide-react';

const Leaderboard: React.FC = () => {
    const leaders = [
        { rank: 1, name: 'CyberNinja', xp: '2,450', winRate: '68%', matches: 442, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja' },
        { rank: 2, name: 'PixelMaster', xp: '2,310', winRate: '62%', matches: 398, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelMaster' },
        { rank: 3, name: 'NeonRider', xp: '2,180', winRate: '59%', matches: 412, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonRider' },
        { rank: 4, name: 'GlitchHunter', xp: '1,950', winRate: '54%', matches: 289, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GlitchHunter' },
        { rank: 5, name: 'RetroKing', xp: '1,820', winRate: '51%', matches: 315, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RetroKing' },
    ];

    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 relative z-10">
                <LayoutGrid className="text-[#FFD700]" size={24} />
                <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
            </div>

            <div className="bg-[#111622] border border-[#1E2330] rounded-2xl overflow-hidden relative z-10 max-w-5xl">
                <div className="grid grid-cols-12 px-6 py-4 border-b border-[#1E2330] text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2 text-right">XP</div>
                    <div className="col-span-2 text-right">Win Rate</div>
                    <div className="col-span-2 text-right">Matches</div>
                </div>

                <div className="divide-y divide-[#1E2330]">
                    {leaders.map((leader) => (
                        <div key={leader.rank} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/5 transition-colors group">
                            <div className="col-span-1">
                                {leader.rank <= 3 ? (
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${leader.rank === 1 ? 'bg-[#FFD7001A] text-[#FFD700]' :
                                            leader.rank === 2 ? 'bg-[#94A3B81A] text-[#94A3B8]' :
                                                'bg-[#B453091A] text-[#B45309]'
                                        }`}>
                                        {leader.rank === 1 ? <Crown size={16} /> : <Medal size={16} />}
                                    </div>
                                ) : (
                                    <span className="text-[#64748B] font-mono font-bold pl-2">#{leader.rank}</span>
                                )}
                            </div>
                            <div className="col-span-5 flex items-center gap-3">
                                <img src={leader.avatar} alt={leader.name} className="w-8 h-8 rounded-full bg-[#1E2330]" />
                                <span className="font-bold text-white group-hover:text-[#FFD700] transition-colors">{leader.name}</span>
                            </div>
                            <div className="col-span-2 text-right font-mono text-[#FFD700] font-bold">{leader.xp}</div>
                            <div className="col-span-2 text-right text-sm text-[#94A3B8]">{leader.winRate}</div>
                            <div className="col-span-2 text-right text-sm text-[#94A3B8]">{leader.matches}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
