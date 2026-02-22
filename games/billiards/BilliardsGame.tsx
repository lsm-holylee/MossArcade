import React from 'react';
import GameContainer from '../shared/GameContainer';

const BilliardsGame: React.FC = () => {
    return (
        <GameContainer title="?�구">
            <div className="w-full max-w-[800px] aspect-video bg-[#1a472a] rounded-2xl border-8 border-[#8b4513] flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_0_60px_rgba(0,0,0,0.3)]">
                <div className="text-center text-white">
                    <div className="text-6xl mb-4">?��</div>
                    <h2 className="text-2xl mb-2">?�구 게임</h2>
                    <p className="text-[#aaa] text-sm">
                        게임 로직???�기??구현?�세??
                    </p>
                    <p className="text-[#666] text-xs mt-4">
                        ???�일???�유�?�� ?�정?�도 로비?�는 ?�향???�습?�다!
                    </p>
                </div>
            </div>
        </GameContainer>
    );
};

export default BilliardsGame;
