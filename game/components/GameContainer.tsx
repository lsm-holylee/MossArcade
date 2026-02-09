import React from 'react';
import { Gamepad2, AlertTriangle, Loader2 } from 'lucide-react';

interface GameContainerProps {
    gameId: string;
    status: string;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameId, status }) => {
    return (
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
            {/* Background Grid - creates a tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Game Content Placeholder */}
            <div className="text-center z-10 glass rounded-2xl p-12 border border-white/10 shadow-2xl relative">
                {/* Status Indicator */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d0d12] px-4 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    {status === 'playing' ? (
                        <>
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">LIVE</span>
                        </>
                    ) : (
                        <>
                            <Loader2 size={12} className="text-[#00ff99] animate-spin" />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">CONNECTING</span>
                        </>
                    )}
                </div>

                <div className="w-24 h-24 bg-[#00ff99]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#00ff99]/30 shadow-[0_0_30px_rgba(0,255,153,0.1)]">
                    <Gamepad2 size={48} className="text-[#00ff99]" />
                </div>

                <h1 className="text-3xl font-orbitron font-bold text-white mb-2">GAME #{gameId}</h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
                    게임 화면이 이곳에 렌더링됩니다.<br />
                    Unity WebGL, Phaser, 또는 Iframe 컨텐츠를 로드할 수 있습니다.
                </p>

                {status !== 'playing' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center gap-3 text-left max-w-sm mx-auto">
                        <AlertTriangle className="text-yellow-500 flex-shrink-0" size={20} />
                        <div>
                            <p className="text-yellow-200 text-xs font-bold mb-1">WAITING FOR PLAYERS</p>
                            <p className="text-yellow-500/70 text-[10px]">모든 플레이어가 준비 완료 상태가 되면 게임이 자동으로 시작됩니다.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameContainer;
