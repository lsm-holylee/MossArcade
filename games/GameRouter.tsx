import React from 'react';
import { useParams } from 'react-router-dom';

// 각 게임별 컴포넌트 import
import BilliardsGame from './billiards/BilliardsGame';
import NeonGame from './neon/NeonGame';
// 새 게임 추가 시 여기에 import 추가

// 게임 ID와 컴포넌트 매핑
const GAME_COMPONENTS: Record<string, React.FC> = {
    '1': BilliardsGame,      // 당구
    // '2': HockeyGame,      // 하키 퍽
    // '3': RouletteGame,    // 러시안룰렛
    // '4': RpsGame,         // 가위바위보
    // '5': ChessGame,       // 체스
    // '6': PenaltyGame,     // 패널티킥
    // '7': PokerGame,       // 포커
    '8': NeonGame,           // 네온 데스매치
    // '9': ArcheryGame,     // 활
    // '10': TankGame,       // 탱크
};

// 게임을 찾을 수 없을 때 표시
const NotFoundGame: React.FC = () => (
    <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }}>
        <h1 style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '1rem' }}>🎮</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>게임 준비 중</h2>
        <p style={{ color: '#888' }}>이 게임은 아직 개발 중입니다.</p>
        <a
            href="/arcade"
            style={{
                marginTop: '2rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                color: '#d4af37',
                textDecoration: 'none',
            }}
        >
            ← 아케이드로 돌아가기
        </a>
    </div>
);

const GameRouter: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();

    const GameComponent = gameId && GAME_COMPONENTS[gameId]
        ? GAME_COMPONENTS[gameId]
        : NotFoundGame;

    return <GameComponent />;
};

export default GameRouter;
