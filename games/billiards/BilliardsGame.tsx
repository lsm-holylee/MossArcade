import React from 'react';
import GameContainer from '../shared/GameContainer';

const BilliardsGame: React.FC = () => {
    return (
        <GameContainer title="당구">
            <div style={{
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '16/9',
                backgroundColor: '#1a472a',
                borderRadius: '16px',
                border: '8px solid #8b4513',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.3)',
            }}>
                <div style={{ textAlign: 'center', color: '#fff' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎱</div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>당구 게임</h2>
                    <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                        게임 로직을 여기에 구현하세요
                    </p>
                    <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1rem' }}>
                        이 파일을 자유롭게 수정해도 로비에는 영향이 없습니다!
                    </p>
                </div>
            </div>
        </GameContainer>
    );
};

export default BilliardsGame;
