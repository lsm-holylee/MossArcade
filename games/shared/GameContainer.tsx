import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameContainerProps {
    title: string;
    children: React.ReactNode;
}

const GameContainer: React.FC<GameContainerProps> = ({ title, children }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/arcade');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0a0f',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Game Header */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: 'none',
                        border: '1px solid rgba(212, 175, 55, 0.5)',
                        color: '#d4af37',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '1rem',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    ← 로비로 돌아가기
                </button>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    margin: 0,
                }}>
                    {title}
                </h1>
            </header>

            {/* Game Content */}
            <main style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                {children}
            </main>
        </div>
    );
};

export default GameContainer;
