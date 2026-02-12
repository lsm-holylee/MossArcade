import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AnyCard, GameCard, NoticeCard, EventCard,
    ShopCard, RankingCard, SocialCard
} from '../types';

// ===== 카드 유형별 태그 뱃지 색상 =====
const TYPE_BADGES: Record<string, { label: string; color: string; bg: string }> = {
    game: { label: '🎮 게임', color: '#00ff99', bg: 'rgba(0,255,153,0.15)' },
    notice: { label: '📢 공지', color: '#ffaa00', bg: 'rgba(255,170,0,0.15)' },
    event: { label: '🎉 이벤트', color: '#ff0066', bg: 'rgba(255,0,102,0.15)' },
    shop: { label: '🛒 상점', color: '#aa66ff', bg: 'rgba(170,102,255,0.15)' },
    ranking: { label: '🏆 랭킹', color: '#ffff00', bg: 'rgba(255,255,0,0.15)' },
    social: { label: '👥 소셜', color: '#00ccff', bg: 'rgba(0,204,255,0.15)' },
};

// ===== 카운트다운 계산 헬퍼 =====
function getCountdown(endsAt: string): string {
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return '종료';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}일 ${hours}시간 남음`;
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}시간 ${mins}분 남음`;
}

interface MasonryCardProps {
    card: AnyCard;
}

// ===== 메인 MasonryCard 컴포넌트 =====
const MasonryCard: React.FC<MasonryCardProps> = ({ card }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    // 카드 크기별 CSS Grid span
    const getSizeClass = () => {
        switch (card.size) {
            case 'large': return 'masonry-large';
            case 'medium': return 'masonry-medium';
            default: return 'masonry-small';
        }
    };

    const badge = TYPE_BADGES[card.type];

    // 카드 클릭 핸들러
    const handleClick = () => {
        if (card.type === 'game') {
            const gameId = card.id.replace('game-', '');
            navigate(`/game/${gameId}`);
        }
        // TODO: 다른 카드 타입별 네비게이션 처리
    };

    return (
        <div
            className={`masonry-card ${getSizeClass()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isHovered
                    ? `0 0 20px ${badge.color}40, 0 8px 32px rgba(0,0,0,0.4)`
                    : '0 2px 8px rgba(0,0,0,0.3)',
                borderColor: isHovered ? badge.color : 'rgba(255,255,255,0.08)',
            }}
        >
            {/* 유형 태그 뱃지 */}
            <div className="card-badge" style={{ color: badge.color, background: badge.bg }}>
                {badge.label}
            </div>

            {/* 핀 표시 */}
            {card.pinned && <div className="card-pin">📌</div>}

            {/* 유형별 내용 렌더링 */}
            {card.type === 'game' && <GameContent card={card} isHovered={isHovered} />}
            {card.type === 'notice' && <NoticeContent card={card} />}
            {card.type === 'event' && <EventContent card={card} />}
            {card.type === 'shop' && <ShopContent card={card} />}
            {card.type === 'ranking' && <RankingContent card={card} />}
            {card.type === 'social' && <SocialContent card={card} />}
        </div>
    );
};

// ===== 게임 카드 내용 =====
const GameContent: React.FC<{ card: GameCard; isHovered: boolean }> = ({ card, isHovered }) => (
    <div className="card-game">
        <div className="card-thumbnail" style={{ backgroundImage: `url(${card.thumbnail})` }}>
            {/* 호버 시 플레이 버튼 오버레이 */}
            {isHovered && (
                <div className="card-overlay">
                    <button className="play-btn">▶ PLAY</button>
                </div>
            )}
        </div>
        <div className="card-info">
            <h3 className="card-title">{card.title}</h3>
            <div className="card-meta">
                <span className="card-ccu">👥 {card.players}</span>
                <span className="card-like">👍 {card.likeRatio}%</span>
            </div>
        </div>
    </div>
);

// ===== 공지 카드 내용 =====
const NoticeContent: React.FC<{ card: NoticeCard }> = ({ card }) => (
    <div className="card-notice">
        <div className="notice-icon">{card.icon}</div>
        <h3 className="card-title">{card.title}</h3>
        <p className="card-summary">{card.summary}</p>
        <span className="card-date">{card.date}</span>
    </div>
);

// ===== 이벤트 카드 내용 =====
const EventContent: React.FC<{ card: EventCard }> = ({ card }) => {
    const [countdown, setCountdown] = useState(getCountdown(card.endsAt));

    // 1분마다 카운트다운 업데이트
    useEffect(() => {
        const timer = setInterval(() => setCountdown(getCountdown(card.endsAt)), 60000);
        return () => clearInterval(timer);
    }, [card.endsAt]);

    return (
        <div className="card-event">
            <div className="card-thumbnail" style={{ backgroundImage: `url(${card.thumbnail})` }}>
                <div className="countdown-badge">⏰ {countdown}</div>
            </div>
            <div className="card-info">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.description}</p>
                {card.reward && <span className="reward-badge">🎁 {card.reward}</span>}
            </div>
        </div>
    );
};

// ===== 상점 카드 내용 =====
const ShopContent: React.FC<{ card: ShopCard }> = ({ card }) => (
    <div className="card-shop">
        <div className="card-thumbnail" style={{ backgroundImage: `url(${card.thumbnail})` }}>
            {card.tag && <div className={`shop-tag tag-${card.tag.toLowerCase()}`}>{card.tag}</div>}
        </div>
        <div className="card-info">
            <h3 className="card-title">{card.title}</h3>
            <div className="price-row">
                <span className="price-current">{card.price.toLocaleString()} MMOC</span>
                {card.originalPrice && (
                    <span className="price-original">{card.originalPrice.toLocaleString()}</span>
                )}
            </div>
        </div>
    </div>
);

// ===== 랭킹 카드 내용 =====
const RankingContent: React.FC<{ card: RankingCard }> = ({ card }) => (
    <div className="card-ranking">
        <h3 className="card-title">{card.title}</h3>
        <div className="ranking-list">
            {card.entries.map(e => (
                <div key={e.rank} className="ranking-entry">
                    <span className={`rank-medal rank-${e.rank}`}>
                        {e.rank === 1 ? '🥇' : e.rank === 2 ? '🥈' : '🥉'}
                    </span>
                    <span className="rank-name">{e.nickname}</span>
                    <span className="rank-value">{e.value}</span>
                </div>
            ))}
        </div>
    </div>
);

// ===== 소셜 카드 내용 =====
const SocialContent: React.FC<{ card: SocialCard }> = ({ card }) => {
    const statusColors: Record<string, string> = {
        'online': '#00ff99',
        'in-game': '#ffaa00',
        'offline': '#666',
    };
    const statusLabels: Record<string, string> = {
        'online': '접속 중',
        'in-game': '게임 중',
        'offline': '오프라인',
    };

    return (
        <div className="card-social">
            <h3 className="card-title">{card.title}</h3>
            <div className="friends-list">
                {card.friends.map(f => (
                    <div key={f.nickname} className="friend-entry">
                        <span className="friend-dot" style={{ background: statusColors[f.status] }} />
                        <span className="friend-name">{f.nickname}</span>
                        <span className="friend-status" style={{ color: statusColors[f.status] }}>
                            {f.game ? `${statusLabels[f.status]} - ${f.game}` : statusLabels[f.status]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasonryCard;
