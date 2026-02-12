import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, MessageCircle } from 'lucide-react';

// ===== 도움말 페이지 — 프리미엄 디자인 =====
const HelpPage: React.FC = () => {
    const navigate = useNavigate();

    const FAQ = [
        { q: 'MMOC란 무엇인가요?', a: 'MMOC는 Moss Arcade의 인게임 포인트입니다. MOC 토큰을 1:1로 전환하여 사용합니다.' },
        { q: 'MOC를 어떻게 충전하나요?', a: '지갑 페이지에서 MetaMask를 연결한 후 MOC를 MMOC로 전환할 수 있습니다.' },
        { q: 'Faucet이란?', a: '잔고가 1,000 MMOC 미만일 때 하루 3회까지 1,000 MMOC를 무료 충전하는 기능입니다.' },
        { q: '출금 수수료는?', a: 'MMOC → MOC 출금 시 2%의 수수료가 차감됩니다.' },
        { q: '배팅 모드는?', a: 'MetaMask 연결 후 게임 입장 시 배팅 모드를 선택할 수 있습니다.' },
    ];

    return (
        <div className="w-page">
            {/* 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="topbar-icon-btn" onClick={() => navigate(-1)} title="뒤로">
                    <ArrowLeft size={18} />
                </button>
                <h2 className="s-title">Help</h2>
            </div>

            {/* FAQ */}
            {FAQ.map((item, i) => (
                <div key={i} className="w-card">
                    <div className="s-section-header">
                        <HelpCircle size={14} />
                        <span>{item.q}</span>
                    </div>
                    <div className="s-section-body">
                        <p style={{ fontSize: 13, color: '#aaa', margin: 0, lineHeight: 1.6 }}>{item.a}</p>
                    </div>
                </div>
            ))}

            {/* 문의 */}
            <div className="w-card">
                <div className="s-section-header">
                    <Mail size={14} />
                    <span>문의하기</span>
                </div>
                <div className="s-section-body">
                    <p className="s-desc">추가 문의 사항이 있으시면 아래 방법으로 연락해주세요.</p>
                    <div className="s-actions">
                        <button className="btn-primary">
                            <Mail size={14} />
                            이메일
                        </button>
                        <button className="btn-outline">
                            <MessageCircle size={14} />
                            Discord
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
