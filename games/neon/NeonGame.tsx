import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 게임 설정
const CONFIG = {
    playerCount: 8,
    entryFee: 10,
    colors: ['#00ff99', '#ff0066', '#00ccff', '#ffff00', '#ff9900', '#cc00ff', '#ffffff', '#00ff00'],
    arenaPadding: 60,
    gravity: 0.1,
    friction: 0.98,
    dashPower: 12,
    dashCooldown: 80,
};

interface Player {
    id: number;
    isUser: boolean;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    dashCooldown: number;
    isDead: boolean;
    mass: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
}

interface AmbientDot {
    x: number;
    y: number;
    s: number;
    v: number;
}

type GameState = 'START' | 'PLAYING' | 'ENDED';

const NeonGame: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<GameState>('START');
    const [aliveCount, setAliveCount] = useState(0);
    const [prizePool, setPrizePool] = useState(0);
    const [isUserWinner, setIsUserWinner] = useState(false);

    const gameRef = useRef<{
        players: Player[];
        particles: Particle[];
        ambientDots: AmbientDot[];
        arenaRadius: number;
        centerX: number;
        centerY: number;
        keys: Record<string, boolean>;
        animationId: number | null;
    }>({
        players: [],
        particles: [],
        ambientDots: [],
        arenaRadius: 0,
        centerX: 0,
        centerY: 0,
        keys: {},
        animationId: null,
    });

    const createAmbientDots = useCallback(() => {
        const dots: AmbientDot[] = [];
        for (let i = 0; i < 40; i++) {
            dots.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                s: Math.random() * 2,
                v: Math.random() * 0.5 + 0.2,
            });
        }
        gameRef.current.ambientDots = dots;
    }, []);

    const createParticles = useCallback((x: number, y: number, color: string, count = 15) => {
        for (let i = 0; i < count; i++) {
            gameRef.current.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                size: Math.random() * 4 + 2,
                color,
                alpha: 1,
            });
        }
    }, []);

    const resolveCollision = useCallback((p1: Player, p2: Player) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < p1.radius + p2.radius) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const overlap = (p1.radius + p2.radius - distance) / 2;
            p1.x -= cos * overlap;
            p1.y -= sin * overlap;
            p2.x += cos * overlap;
            p2.y += sin * overlap;

            const v1 = p1.vx * cos + p1.vy * sin;
            const v2 = p2.vx * cos + p2.vy * sin;

            const v1Final = ((p1.mass - p2.mass) * v1 + 2 * p2.mass * v2) / (p1.mass + p2.mass);
            const v2Final = ((p2.mass - p1.mass) * v2 + 2 * p1.mass * v1) / (p1.mass + p2.mass);

            p1.vx = p1.vx + (v1Final - v1) * cos;
            p1.vy = p1.vy + (v1Final - v1) * sin;
            p2.vx = p2.vx + (v2Final - v2) * cos;
            p2.vy = p2.vy + (v2Final - v2) * sin;

            createParticles((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, '#fff', 5);
        }
    }, [createParticles]);

    const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, p: Player) => {
        // 그림자
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + 12, p.radius * 0.8, p.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fill();

        // 플레이어 원
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 이름 라벨
        ctx.fillStyle = '#fff';
        ctx.font = '700 11px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.isUser ? 'YOU' : `BOT ${p.id}`, p.x, p.y - p.radius - 12);
    }, []);

    const startGame = useCallback(() => {
        const game = gameRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;

        game.centerX = canvas.width / 2;
        game.centerY = canvas.height / 2;
        game.arenaRadius = Math.min(game.centerX, game.centerY) - CONFIG.arenaPadding;
        game.particles = [];
        game.players = [];

        setPrizePool(CONFIG.playerCount * CONFIG.entryFee);

        // 플레이어 생성
        for (let i = 0; i < CONFIG.playerCount; i++) {
            const angle = (Math.PI * 2 / CONFIG.playerCount) * i;
            const r = game.arenaRadius * 0.7;
            game.players.push({
                id: i,
                isUser: i === 0,
                x: game.centerX + Math.cos(angle) * r,
                y: game.centerY + Math.sin(angle) * r,
                vx: 0,
                vy: 0,
                radius: 20,
                color: CONFIG.colors[i],
                dashCooldown: 0,
                isDead: false,
                mass: 1,
            });
        }

        setAliveCount(CONFIG.playerCount);
        setGameState('PLAYING');
    }, []);

    const resetToLobby = useCallback(() => {
        const game = gameRef.current;
        game.players = [];
        game.particles = [];
        setGameState('START');
        setAliveCount(0);
        setPrizePool(0);
    }, []);

    // 게임 루프
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const game = gameRef.current;

        const resize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                canvas.width = canvasRef.current.parentElement.clientWidth;
                canvas.height = canvasRef.current.parentElement.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            game.centerX = canvas.width / 2;
            game.centerY = canvas.height / 2;
            if (gameState === 'START') {
                game.arenaRadius = Math.min(game.centerX, game.centerY) - CONFIG.arenaPadding;
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => { game.keys[e.code] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { game.keys[e.code] = false; };

        resize();
        createAmbientDots();
        window.addEventListener('resize', resize);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 앰비언트 파티클
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            game.ambientDots.forEach(d => {
                d.y -= d.v;
                if (d.y < 0) d.y = canvas.height;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
                ctx.fill();
            });

            if (gameState === 'PLAYING' || gameState === 'ENDED') {
                if (game.arenaRadius > 120 && gameState === 'PLAYING') {
                    game.arenaRadius -= 0.08;
                }

                // 아레나 링
                ctx.beginPath();
                ctx.arc(game.centerX, game.centerY, game.arenaRadius, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 255, 153, 0.3)';
                ctx.lineWidth = 4;
                ctx.stroke();

                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00ff99';
                ctx.stroke();
                ctx.shadowBlur = 0;

                let aliveNow = 0;

                game.players.forEach(p => {
                    if (p.isDead) return;
                    aliveNow++;

                    if (p.isUser) {
                        if (game.keys['ArrowUp'] || game.keys['KeyW']) p.vy -= 0.5;
                        if (game.keys['ArrowDown'] || game.keys['KeyS']) p.vy += 0.5;
                        if (game.keys['ArrowLeft'] || game.keys['KeyA']) p.vx -= 0.5;
                        if (game.keys['ArrowRight'] || game.keys['KeyD']) p.vx += 0.5;

                        if (game.keys['Space'] && p.dashCooldown === 0) {
                            p.vx *= 2.5;
                            p.vy *= 2.5;
                            p.dashCooldown = CONFIG.dashCooldown;
                            createParticles(p.x, p.y, p.color);
                        }
                    } else {
                        // AI 로직
                        const dToCenter = Math.sqrt((game.centerX - p.x) ** 2 + (game.centerY - p.y) ** 2);
                        if (dToCenter > game.arenaRadius * 0.4) {
                            p.vx += (game.centerX - p.x) * 0.001;
                            p.vy += (game.centerY - p.y) * 0.001;
                        }
                        p.vx += (Math.random() - 0.5) * 0.25;
                        p.vy += (Math.random() - 0.5) * 0.25;
                    }

                    p.vx *= CONFIG.friction;
                    p.vy *= CONFIG.friction;
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.dashCooldown > 0) p.dashCooldown--;

                    game.players.forEach(other => {
                        if (p !== other && !other.isDead) resolveCollision(p, other);
                    });

                    const dist = Math.sqrt((p.x - game.centerX) ** 2 + (p.y - game.centerY) ** 2);
                    if (dist > game.arenaRadius + p.radius) {
                        p.isDead = true;
                        createParticles(p.x, p.y, p.color, 30);
                    }

                    drawPlayer(ctx, p);
                });

                setAliveCount(aliveNow);

                if (aliveNow <= 1 && gameState === 'PLAYING') {
                    const winner = game.players.find(p => !p.isDead);
                    setIsUserWinner(winner?.isUser ?? false);
                    setGameState('ENDED');
                }

                // 파티클 업데이트
                game.particles = game.particles.filter(p => p.alpha > 0);
                game.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= 0.02;
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
            }

            game.animationId = requestAnimationFrame(update);
        };

        game.animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (game.animationId) cancelAnimationFrame(game.animationId);
        };
    }, [gameState, createAmbientDots, createParticles, resolveCollision, drawPlayer]);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#050505',
            fontFamily: "'Noto Sans KR', sans-serif",
        }}>
            {/* Back Button */}
            {/* Back Button - Removed as we have Sidebar now
            <button
                onClick={() => navigate('/arcade')}
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    zIndex: 200,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.75rem',
                }}
            >
                ← 로비
            </button>
            */}

            {/* HUD */}
            {gameState !== 'START' && (
                <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '2rem',
                    zIndex: 10,
                    fontFamily: 'Orbitron, sans-serif',
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center',
                    }}>
                        <span style={{ color: '#9ca3af', fontSize: '10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Prize Pool</span>
                        <span style={{ fontSize: '1.25rem', color: '#4ade80' }}>{prizePool} MOC</span>
                    </div>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center',
                    }}>
                        <span style={{ color: '#9ca3af', fontSize: '10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Alive</span>
                        <span style={{ fontSize: '1.25rem', color: '#ec4899' }}>{aliveCount}/{CONFIG.playerCount}</span>
                    </div>
                </div>
            )}

            {/* Canvas */}
            <canvas ref={canvasRef} style={{ display: 'block' }} />

            {/* Start Overlay */}
            {gameState === 'START' && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 100,
                }}>
                    <div style={{
                        background: '#111',
                        border: '2px solid #00ff99',
                        boxShadow: '0 0 20px rgba(0, 255, 153, 0.2)',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        textAlign: 'center',
                        maxWidth: '420px',
                        width: '90%',
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            fontFamily: 'Orbitron, sans-serif',
                            color: '#00ff99',
                            textShadow: '0 0 10px #00ff99, 0 0 20px rgba(0, 255, 153, 0.5)',
                            marginBottom: '0.5rem',
                        }}>MOSS DEATHMATCH</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                            상대방을 밀쳐내고 최후의 1인이 되어<br />베팅된 코인을 획득하세요.
                        </p>

                        <div style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: '1.5rem',
                        }}>
                            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Entry Fee</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4ade80', fontFamily: 'Orbitron, sans-serif' }}>10 MOC</span>
                        </div>

                        <button
                            onClick={startGame}
                            style={{
                                background: '#00ff99',
                                color: '#000',
                                padding: '1rem 2rem',
                                borderRadius: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                border: 'none',
                                width: '100%',
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            Join Match
                        </button>

                        <p style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '1rem' }}>
                            WASD: 이동 | Space: 대시
                        </p>
                    </div>
                </div>
            )}

            {/* Result Overlay */}
            {gameState === 'ENDED' && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 100,
                }}>
                    <div style={{
                        background: '#111',
                        border: '2px solid #00ff99',
                        boxShadow: '0 0 20px rgba(0, 255, 153, 0.2)',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        textAlign: 'center',
                        maxWidth: '420px',
                        width: '90%',
                    }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            fontFamily: 'Orbitron, sans-serif',
                            color: isUserWinner ? '#00ff99' : '#ff0066',
                            marginBottom: '0.5rem',
                        }}>
                            {isUserWinner ? 'VICTORY' : 'GAME OVER'}
                        </h2>

                        <div style={{ margin: '2rem 0' }}>
                            <p style={{ color: '#9ca3af', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Earned Rewards</p>
                            <p style={{ fontSize: '3rem', fontWeight: 700, color: '#4ade80', fontFamily: 'Orbitron, sans-serif' }}>
                                {isUserWinner ? `${Math.floor(CONFIG.playerCount * CONFIG.entryFee * 0.95)} MOC` : '0 MOC'}
                            </p>
                        </div>

                        <button
                            onClick={resetToLobby}
                            style={{
                                background: '#00ff99',
                                color: '#000',
                                padding: '1rem 2rem',
                                borderRadius: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                border: 'none',
                                width: '100%',
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '1rem',
                            }}
                        >
                            Restart Game
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NeonGame;
