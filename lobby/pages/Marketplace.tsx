import React, { useState } from 'react';
import { useEconomy } from '../context/EconomyContext';

// ===== 기획서 Phase 6: UGC 마켓플레이스 + 기프티콘 교환소 =====

// 임시 UGC 스킨 데이터
const UGC_SKINS = [
    { id: 'skin-1', title: '네온 블레이드 스킨', creator: 'ArtistMoss', price: 500, thumbnail: '/assets/images/neon.png', game: '네온 데스매치' },
    { id: 'skin-2', title: '골드 큐 스킨', creator: 'PoolMaster', price: 300, thumbnail: '/assets/images/billiards.png', game: '당구' },
    { id: 'skin-3', title: '로얄 카드 백', creator: 'DesignKing', price: 800, thumbnail: '/assets/images/poker.png', game: '포커' },
    { id: 'skin-4', title: '캔디 테마 보드', creator: 'SweetGamer', price: 200, thumbnail: '/assets/images/chess.png', game: '체스' },
    { id: 'skin-5', title: '파이어 킥 이펙트', creator: 'GoalHunter', price: 450, thumbnail: '/assets/images/penalty.png', game: '패널티킥' },
    { id: 'skin-6', title: '아이스 퍽 트레일', creator: 'IceBreaker', price: 350, thumbnail: '/assets/images/hockey.png', game: '하키 퍽' },
];

// 임시 기프티콘 데이터
const GIFTICONS = [
    { id: 'gift-1', title: '☕ 스타벅스 아메리카노', price: 3000, thumbnail: '☕', brand: 'Starbucks' },
    { id: 'gift-2', title: '🍦 베스킨라빈스 싱글', price: 2500, thumbnail: '🍦', brand: 'BR' },
    { id: 'gift-3', title: '🍔 맥도날드 빅맥 세트', price: 5000, thumbnail: '🍔', brand: 'McDonalds' },
    { id: 'gift-4', title: '🎬 CGV 영화 관람권', price: 8000, thumbnail: '🎬', brand: 'CGV' },
    { id: 'gift-5', title: '🏪 CU 5000원권', price: 5000, thumbnail: '🏪', brand: 'CU' },
];

type Tab = 'skins' | 'gifticons';

const Marketplace: React.FC = () => {
    const { mmocBalance, spendCoin } = useEconomy();
    const [activeTab, setActiveTab] = useState<Tab>('skins');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    // 스킨 구매
    const handleBuySkin = (skinId: string, title: string, price: number) => {
        if (spendCoin(price)) {
            showMessage(`"${title}" 구매 완료! (-${price.toLocaleString()} MMOC)`, 'success');
        } else {
            showMessage(`잔고가 부족합니다. (필요: ${price.toLocaleString()} MMOC)`, 'error');
        }
    };

    // 기프티콘 교환
    const handleBuyGifticon = (id: string, title: string, price: number) => {
        if (spendCoin(price)) {
            showMessage(`"${title}" 교환 완료! 쿠폰이 발급되었습니다.`, 'success');
        } else {
            showMessage(`잔고가 부족합니다. (필요: ${price.toLocaleString()} MMOC)`, 'error');
        }
    };

    return (
        <div className="marketplace-page">
            {/* 메시지 토스트 */}
            {message && (
                <div style={{
                    position: 'fixed', top: 72, left: '50%', transform: 'translateX(-50%)',
                    padding: '12px 24px', borderRadius: 10, zIndex: 100,
                    background: message.type === 'success' ? 'rgba(0,255,153,0.9)' : 'rgba(255,0,102,0.9)',
                    color: message.type === 'success' ? '#000' : '#fff',
                    fontWeight: 600, fontSize: 14,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}>
                    {message.text}
                </div>
            )}

            {/* 헤더 */}
            <div className="marketplace-header">
                <h2>🛍️ 마켓플레이스</h2>
                <p style={{ color: '#888', fontSize: 13 }}>
                    보유 잔고: <span style={{ color: '#ffff00', fontWeight: 700 }}>{mmocBalance.toLocaleString()} MMOC</span>
                </p>
            </div>

            {/* 탭 */}
            <div className="marketplace-tabs">
                <button
                    className={`marketplace-tab ${activeTab === 'skins' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skins')}
                >
                    🎨 UGC 스킨
                </button>
                <button
                    className={`marketplace-tab ${activeTab === 'gifticons' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gifticons')}
                >
                    🎁 기프티콘 교환
                </button>
            </div>

            {/* UGC 스킨 탭 */}
            {activeTab === 'skins' && (
                <div className="marketplace-grid">
                    {UGC_SKINS.map(skin => (
                        <div key={skin.id} className="mp-card" onClick={() => handleBuySkin(skin.id, skin.title, skin.price)}>
                            <div className="mp-thumbnail" style={{ backgroundImage: `url(${skin.thumbnail})` }}>
                                <div className="mp-creator">by {skin.creator}</div>
                            </div>
                            <div className="mp-info">
                                <div className="mp-title">{skin.title}</div>
                                <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{skin.game}</div>
                                <div className="mp-price">{skin.price.toLocaleString()} MMOC</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 기프티콘 교환 탭 */}
            {activeTab === 'gifticons' && (
                <div className="marketplace-grid">
                    {GIFTICONS.map(gift => (
                        <div key={gift.id} className="mp-card" onClick={() => handleBuyGifticon(gift.id, gift.title, gift.price)}>
                            <div className="mp-thumbnail" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 64, background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                            }}>
                                {gift.thumbnail}
                            </div>
                            <div className="mp-info">
                                <div className="mp-title">{gift.title}</div>
                                <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{gift.brand}</div>
                                <div className="mp-price">{gift.price.toLocaleString()} MMOC</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marketplace;
