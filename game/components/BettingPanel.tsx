import React from 'react';
import { User, DollarSign, Swords, RefreshCw, HandCoins, CheckCircle, Loader2 } from 'lucide-react';

interface BettingPanelProps {
    betAmount: number;
    gameStatus: 'waiting' | 'ready' | 'playing' | 'finished';
    myStatus: 'ready' | 'revenge_deal' | 'idle';
    opponentStatus: 'ready' | 'revenge_deal' | 'idle';
    result?: 'win' | 'lose' | 'draw' | null;
    onReady: () => void;
    onRevenge: () => void;
    onDouble: () => void;
}

const BettingPanel: React.FC<BettingPanelProps> = ({
    betAmount, gameStatus, myStatus, opponentStatus, result, onReady, onRevenge, onDouble
}) => {
    return (
        <div className="flex flex-col h-full bg-[#0d0d12] border-r border-white/5 p-5 w-[300px] flex-shrink-0 relative">
            {/* 1. Header: Game Title & Fixed Bet */}
            <div className="mb-8">
                <h2 className="text-xl font-orbitron font-bold text-gray-200 mb-4 tracking-wide">게임 이름</h2>

                <div className="bg-[#151921] rounded-xl p-4 flex items-center justify-between border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff99]"></div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Fixed Bet</span>
                    <div className="flex items-center gap-1 text-[#00ff99] font-bold font-mono text-lg">
                        <DollarSign size={16} />
                        <span>{betAmount}</span>
                    </div>
                </div>
            </div>

            {/* 2. Players Area (VS Layout) */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Me */}
                <PlayerCard
                    isMe
                    name="You"
                    status={myStatus}
                    avatar="https://api.dicebear.com/7.x/pixel-art/svg?seed=Moss"
                    result={result}
                />

                {/* VS Connector */}
                <div className="relative h-8 flex items-center justify-center">
                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <span className="relative bg-[#0d0d12] px-4 font-orbitron font-bold text-gray-600 text-sm italic">VS</span>
                </div>

                {/* Opponent */}
                <PlayerCard
                    name="Opponent"
                    status={opponentStatus}
                    avatar="https://api.dicebear.com/7.x/pixel-art/svg?seed=Opponent"
                    result={result === 'win' ? 'lose' : result === 'lose' ? 'win' : result}
                />
            </div>

            {/* 3. Bottom Action Button (Fixed) */}
            <div className="mt-auto pt-6">
                {gameStatus === 'finished' ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        <div className="text-center mb-2">
                            <span className={`font-orbitron font-bold text-xl ${result === 'win' ? 'text-[#00ff99] drop-shadow-[0_0_10px_rgba(0,255,153,0.5)]' :
                                    result === 'lose' ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-gray-400'
                                }`}>
                                {result === 'win' ? 'VICTORY' : result === 'lose' ? 'DEFEAT' : 'DRAW'}
                            </span>
                        </div>
                        <button
                            onClick={onRevenge}
                            className="w-full bg-[#1a1d26] hover:bg-[#252a36] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm border border-white/10"
                        >
                            <RefreshCw size={16} />
                            재대결 (Revenge)
                        </button>
                        <button
                            onClick={onDouble}
                            className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)]"
                        >
                            <HandCoins size={16} />
                            판돈 두 배 (Double)
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onReady}
                        disabled={myStatus === 'ready'} // Playing 상태에서도 버튼은 보임 (비활성화)
                        className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-lg shadow-lg
                            ${myStatus === 'ready'
                                ? 'bg-[#1a1d26] text-gray-500 cursor-not-allowed border border-white/5'
                                : 'bg-[#00ff99] hover:bg-[#00cc7a] text-black shadow-[0_0_20px_rgba(0,255,153,0.4)] hover:shadow-[0_0_30px_rgba(0,255,153,0.6)] hover:-translate-y-0.5'
                            }
                        `}
                    >
                        {myStatus === 'ready' ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={20} className="animate-spin" />
                                <span>WAITING...</span>
                            </div>
                        ) : 'READY'}
                    </button>
                )}
            </div>
        </div>
    );
};

// Player Card Component
const PlayerCard: React.FC<{
    isMe?: boolean;
    name: string;
    status: string;
    avatar: string;
    result?: 'win' | 'lose' | 'draw' | null;
}> = ({ isMe, name, status, avatar, result }) => (
    <div className={`relative p-4 rounded-2xl border transition-all duration-300 group
        ${isMe ? 'bg-[#151921] border-white/10 hover:border-[#00ff99]/30' : 'bg-[#151921] border-white/5'}
        ${result === 'win' ? 'ring-2 ring-[#00ff99] shadow-[0_0_20px_rgba(0,255,153,0.15)]' :
            result === 'lose' ? 'opacity-50 grayscale' : ''}
    `}>
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full overflow-hidden border-2 p-0.5 ${isMe ? 'border-[#00ff99]' : 'border-gray-700'}`}>
                <img src={avatar} className="w-full h-full object-cover rounded-full bg-gray-800" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold text-sm truncate ${isMe ? 'text-white' : 'text-gray-400'}`}>{name}</span>
                    {isMe && <span className="text-[9px] bg-[#00ff99] text-black px-1.5 py-0.5 rounded font-bold">ME</span>}
                    {status === 'ready' && <CheckCircle size={14} className="text-[#00ff99]" />}
                </div>

                <div className="flex items-center gap-1.5">
                    <DollarSign size={10} className="text-yellow-500" />
                    <span className="text-xs text-gray-500 font-mono font-bold">15,400</span>
                </div>
            </div>
        </div>

        {/* Revenge Status Overlay */}
        {status === 'revenge_deal' && (
            <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold border border-yellow-500/50 flex items-center gap-2">
                    <Loader2 size={10} className="animate-spin" />
                    DECIDING...
                </div>
            </div>
        )}
    </div>
);

export default BettingPanel;
