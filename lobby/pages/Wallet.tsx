import React, { useState } from 'react';
import { useEconomy } from '../context/EconomyContext';
import { ArrowDownToLine, ArrowUpFromLine, Droplets, History, ChevronDown } from 'lucide-react';

// ===== 지갑 페이지 — 프리미엄 아케이드 디자인 =====
const Wallet: React.FC = () => {
    const { mmocBalance, deposit, withdraw, faucet, isGuest, user, getRankLabel, transactions } = useEconomy();
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    // 입금 처리
    const handleDeposit = () => {
        const val = parseInt(amount);
        if (!val || val <= 0) return showMessage('유효한 금액을 입력하세요.', 'error');
        deposit(val);
        showMessage(`${val.toLocaleString()} MOC → ${val.toLocaleString()} MMOC 전환 완료!`, 'success');
        setAmount('');
    };

    // 출금 처리
    const handleWithdraw = () => {
        if (isGuest) return showMessage('게스트는 출금 불가. MetaMask를 연결하세요.', 'error');
        const val = parseInt(amount);
        if (!val || val <= 0) return showMessage('유효한 금액을 입력하세요.', 'error');
        const result = withdraw(val);
        if (result.success) {
            showMessage(`${val.toLocaleString()} MMOC → ${result.mocReceived.toLocaleString()} MOC 전환 완료!`, 'success');
            setAmount('');
        } else {
            showMessage('잔고가 부족합니다.', 'error');
        }
    };

    // Faucet 처리
    const handleFaucet = () => {
        const result = faucet();
        showMessage(result.message, result.success ? 'success' : 'error');
    };

    const handleSubmit = () => {
        if (activeTab === 'deposit') handleDeposit();
        else handleWithdraw();
    };

    // 출금 시 수수료 미리보기
    const withdrawPreview = activeTab === 'withdraw' && amount && parseInt(amount) > 0 ? {
        fee: Math.floor(parseInt(amount) * 0.02),
        receive: Math.floor(parseInt(amount) * 0.98),
    } : null;

    return (
        <div className="w-page">
            {/* 토스트 */}
            {message && (
                <div className={`w-toast ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* ===== 잔고 카드 — 그라데이션 배경 ===== */}
            <div className="w-hero">
                <div className="w-hero-bg" />
                <div className="w-hero-content">
                    <span className="w-hero-label">MMOC Balance</span>
                    <div className="w-hero-amount">
                        {mmocBalance.toLocaleString()}
                    </div>
                    <div className="w-hero-rank">
                        {getRankLabel(user.rankTier)} · BET {user.cumulativeBet.toLocaleString()}
                    </div>
                </div>

                {/* Faucet 버튼 */}
                <button className="w-faucet-btn" onClick={handleFaucet} title="잔고 1,000 미만일 때 무료 충전">
                    <Droplets size={16} />
                    Faucet
                </button>
            </div>

            {/* ===== 입출금 탭 ===== */}
            <div className="w-card">
                <div className="w-tabs">
                    <button
                        className={`w-tab ${activeTab === 'deposit' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('deposit'); setAmount(''); }}
                    >
                        <ArrowDownToLine size={16} />
                        입금 (MOC → MMOC)
                    </button>
                    <button
                        className={`w-tab ${activeTab === 'withdraw' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('withdraw'); setAmount(''); }}
                    >
                        <ArrowUpFromLine size={16} />
                        출금 (MMOC → MOC)
                    </button>
                </div>

                <div className="w-body">
                    {activeTab === 'withdraw' && (
                        <p className="w-fee-notice">수수료 2% 차감</p>
                    )}

                    <div className="w-input-row">
                        <input
                            type="number"
                            className="w-input"
                            placeholder={activeTab === 'deposit' ? 'MOC 수량' : 'MMOC 수량'}
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                        <button className="w-submit-btn" onClick={handleSubmit}>
                            {activeTab === 'deposit' ? '전환' : '출금'}
                        </button>
                    </div>

                    {/* 빠른 금액 버튼 */}
                    <div className="w-quick-amounts">
                        {[100, 500, 1000, 5000].map(v => (
                            <button key={v} className="w-quick-btn" onClick={() => setAmount(String(v))}>
                                {v.toLocaleString()}
                            </button>
                        ))}
                        <button className="w-quick-btn" onClick={() => setAmount(String(mmocBalance))}>
                            MAX
                        </button>
                    </div>

                    {/* 출금 미리보기 */}
                    {withdrawPreview && (
                        <div className="w-preview">
                            <div className="w-preview-row">
                                <span>수수료 (2%)</span>
                                <span className="w-preview-fee">-{withdrawPreview.fee.toLocaleString()} MMOC</span>
                            </div>
                            <div className="w-preview-row">
                                <span>수령액</span>
                                <span className="w-preview-receive">{withdrawPreview.receive.toLocaleString()} MOC</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== 거래 내역 ===== */}
            <div className="w-card">
                <div className="w-history-header">
                    <History size={16} />
                    <span>거래 내역</span>
                    <span className="w-history-count">{transactions.length}</span>
                </div>

                <div className="w-tx-list">
                    {transactions.length === 0 ? (
                        <div className="w-tx-empty">아직 거래 내역이 없습니다</div>
                    ) : (
                        transactions.slice(0, 20).map(tx => (
                            <div key={tx.id} className="w-tx-item">
                                <div className="w-tx-left">
                                    <div className={`w-tx-icon ${tx.type === 'deposit' || tx.type === 'win' || tx.type === 'faucet'
                                            ? 'plus' : 'minus'
                                        }`}>
                                        {tx.type === 'deposit' || tx.type === 'faucet' ? '↓' : '↑'}
                                    </div>
                                    <div>
                                        <div className="w-tx-desc">{tx.description}</div>
                                        <div className="w-tx-time">
                                            {new Date(tx.timestamp).toLocaleString('ko-KR')}
                                        </div>
                                    </div>
                                </div>
                                <span className={`w-tx-amount ${tx.type === 'deposit' || tx.type === 'win' || tx.type === 'faucet'
                                        ? 'plus' : 'minus'
                                    }`}>
                                    {tx.type === 'deposit' || tx.type === 'win' || tx.type === 'faucet'
                                        ? `+${tx.amount.toLocaleString()}`
                                        : `-${tx.amount.toLocaleString()}`
                                    }
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
