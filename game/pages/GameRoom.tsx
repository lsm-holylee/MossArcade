import React, { useState } from 'react';
import Sidebar from '../../lobby/components/Sidebar'; // Layout???„ë‹Œ Sidebar ì§ì ‘ ?¬ìš© (Default Import)
import BettingPanel from '../components/BettingPanel';
import GameContainer from '../components/GameContainer';
import GameChat from '../components/GameChat';
import { useParams, useNavigate } from 'react-router-dom';

const GameRoom: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Always open for layout

    // --- Mock State for Demo ---
    const [gameStatus, setGameStatus] = useState<'waiting' | 'ready' | 'playing' | 'finished'>('waiting');
    const [myStatus, setMyStatus] = useState<'ready' | 'revenge_deal' | 'idle'>('idle');
    const [opponentStatus, setOpponentStatus] = useState<'ready' | 'revenge_deal' | 'idle'>('idle');
    const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
    const [betAmount, setBetAmount] = useState(100);

    // ... (ê¸°ì¡´ useEffect ë¡œì§ ? ì?) ...
    // Handlers
    const handleReady = () => {
        setMyStatus('ready');
        setTimeout(() => {
            setOpponentStatus('ready');
            setTimeout(() => startGame(), 1000);
        }, 1500);
    };

    const startGame = () => {
        setGameStatus('playing');
        setTimeout(() => {
            setGameStatus('finished');
            setResult(Math.random() > 0.5 ? 'win' : 'lose');
            setMyStatus('idle');
            setOpponentStatus('idle');
        }, 5000);
    };

    const handleRevenge = () => {
        setMyStatus('revenge_deal');
        setTimeout(() => {
            setOpponentStatus('revenge_deal');
            setTimeout(() => {
                setGameStatus('waiting');
                setResult(null);
                setMyStatus('ready');
                setOpponentStatus('ready');
                setTimeout(() => startGame(), 1000);
            }, 2000);
        }, 2000);
    };

    const handleDouble = () => {
        setMyStatus('revenge_deal');
        setTimeout(() => {
            setOpponentStatus('revenge_deal');
            setBetAmount(prev => prev * 2);
            setTimeout(() => {
                setGameStatus('waiting');
                setResult(null);
                setMyStatus('ready');
                setOpponentStatus('ready');
                setTimeout(() => startGame(), 1000);
            }, 2000);
        }, 2000);
    };

    const handleExit = () => {
        if (window.confirm('?•ë§ ê²Œì„?ì„œ ?˜ê??œê² ?µë‹ˆê¹? ë°°íŒ… ê¸ˆì•¡???ƒì„ ???ˆìŠµ?ˆë‹¤.')) {
            navigate('/');
        }
    };

    return (
        <div className="flex h-screen bg-black overflow-hidden font-inter text-gray-200">
            {/* 1. Sidebar (Fixed, Custom Style for GameRoom) */}
            <Sidebar
                isOpen={isSidebarOpen}
                className="top-0 h-screen w-60"
            />

            {/* Main Content Area (Remaining Width) */}
            <div className={`flex-1 flex transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>

                {/* 2. Left Panel: Betting & Status */}
                <BettingPanel
                    betAmount={betAmount}
                    gameStatus={gameStatus}
                    myStatus={myStatus}
                    opponentStatus={opponentStatus}
                    result={result}
                    onReady={handleReady}
                    onRevenge={handleRevenge}
                    onDouble={handleDouble}
                />

                {/* 3. Center Panel: Game Container */}
                <GameContainer
                    gameId={gameId || 'Unknown'}
                    status={gameStatus}
                />

                {/* 4. Right Panel: Chat */}
                <GameChat
                    onExit={handleExit}
                />
            </div>
        </div>
    );
};

export default GameRoom;
