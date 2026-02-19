import React, { useMemo } from 'react';
import { ALL_CARDS } from '../constants';
import MasonryCard from '../components/MasonryCard';
import { AnyCard } from '../types';

// ===== Poki 스타일 Masonry Grid 홈 화면 =====
// 기획서 5.1: 카로셀 없이 다양한 크기의 카드를 타일처럼 빈틈없이 배치
const Home: React.FC = () => {
    // 카드 정렬: 게임, 상점만 표시
    // 공지/이벤트/랭킹/소셜은 각각 별도 페이지/팝업으로 이동됨
    const sortedCards = useMemo(() => {
        const filtered = ALL_CARDS.filter(c =>
            c.type !== 'notice' &&
            c.type !== 'event' &&
            c.type !== 'ranking' &&
            c.type !== 'social' &&
            c.type !== 'shop'
        );
        const pinned = filtered.filter(c => c.pinned);
        const unpinned = filtered.filter(c => !c.pinned);
        return [...pinned, ...unpinned];
    }, []);

    return (
        <div className="masonry-home">
            <div className="masonry-grid">
                {sortedCards.map((card: AnyCard) => (
                    <MasonryCard key={card.id} card={{ ...card, size: 'large' }} />
                ))}
            </div>
        </div>
    );
};

export default Home;
