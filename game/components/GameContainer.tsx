import React from 'react';
import { Gamepad2, AlertTriangle, Loader2 } from 'lucide-react';
import GameRouter from '../../games/GameRouter';

interface GameContainerProps {
    gameId: string;
    status: string;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameId, status }) => {
    return (
        <div className="flex-1 bg-black relative flex flex-col overflow-hidden">
            {/* Background Grid - creates a tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Game Content */}
            <div className="w-full h-full relative z-10">
                <GameRouter />
            </div>
        </div>
    );
};

export default GameContainer;
