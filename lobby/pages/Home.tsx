import React, { useMemo } from 'react';
import { ALL_CARDS } from '../constants';
import MasonryCard from '../components/MasonryCard';
import { AnyCard } from '../types';

// ===== Poki 스타일 Masonry Grid 홈 화면 =====
// 기획서 5.1: 카로셀 없이 다양한 크기의 카드를 타일처럼 빈틈없이 배치
const Home: React.FC = () => {
    // 카드 정렬: 이벤트(핀) → 공지(핀) → 최근 플레이 → 추천 → 인기 → 상점 → 랭킹 → 소셜
    const sortedCards = useMemo(() => {
        const pinned = ALL_CARDS.filter(c => c.pinned);
        const unpinned = ALL_CARDS.filter(c => !c.pinned);
        return [...pinned, ...unpinned];
    }, []);

    return (
        <div className="masonry-home">
            <div className="masonry-grid">
                {sortedCards.map((card: AnyCard) => (
                    <MasonryCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Home;
