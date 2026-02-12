import React, { useState } from 'react';
import { useEconomy } from '../context/EconomyContext';
import { useNavigate } from 'react-router-dom';
import { User, Wallet, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

// ===== 설정 페이지 — 프리미엄 디자인 =====
const SettingsPage: React.FC = () => {
    const { user, isGuest, connectWallet } = useEconomy();
    const navigate = useNavigate();
    const [notifGame, setNotifGame] = useState(true);
    const [notifEvent, setNotifEvent] = useState(true);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    // MetaMask 연결 (Mock)
    const handleConnectWallet = () => {
        const mockAddress = '0x' + Math.random().toString(16).slice(2, 42);
        connectWallet(mockAddress);
        showMessage('MetaMask 연결 완료!', 'success');
    };

    return (
        <div className="w-page">
            {/* 토스트 */}
            {message && (
                <div className={`w-toast ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* 페이지 헤더 */}
            <div className="s-header">
                <h2 className="s-title">Settings</h2>
            </div>

            {/* 프로필 섹션 */}
            <div className="w-card">
                <div className="s-section-header">
                    <User size={16} />
                    <span>프로필</span>
                </div>
                <div className="s-section-body">
                    <div className="s-row">
                        <span className="s-label">닉네임</span>
                        <span className="s-value">{user.nickname}</span>
                    </div>
                    <div className="s-row">
                        <span className="s-label">계정 유형</span>
                        <span className={`s-badge ${isGuest ? 'guest' : 'connected'}`}>
                            {isGuest ? 'Guest' : 'Connected'}
                        </span>
                    </div>
                    {user.walletAddress && (
                        <div className="s-row">
                            <span className="s-label">지갑 주소</span>
                            <span className="s-value mono">
                                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* MetaMask 연결 */}
            {isGuest && (
                <div className="w-card">
                    <div className="s-section-header">
                        <Wallet size={16} />
                        <span>MetaMask 연결</span>
                    </div>
                    <div className="s-section-body">
                        <p className="s-desc">
                            지갑을 연결하면 MOC 입/출금과 배팅 모드를 사용할 수 있습니다.
                        </p>
                        <button className="s-connect-btn" onClick={handleConnectWallet}>
                            🦊 MetaMask 연결하기
                        </button>
                    </div>
                </div>
            )}

            {/* 알림 설정 */}
            <div className="w-card">
                <div className="s-section-header">
                    <Bell size={16} />
                    <span>알림</span>
                </div>
                <div className="s-section-body">
                    <div className="s-row">
                        <span className="s-label">게임 초대 알림</span>
                        <label className="s-toggle">
                            <input
                                type="checkbox"
                                checked={notifGame}
                                onChange={() => setNotifGame(!notifGame)}
                            />
                            <span className="s-toggle-slider" />
                        </label>
                    </div>
                    <div className="s-row">
                        <span className="s-label">이벤트 알림</span>
                        <label className="s-toggle">
                            <input
                                type="checkbox"
                                checked={notifEvent}
                                onChange={() => setNotifEvent(!notifEvent)}
                            />
                            <span className="s-toggle-slider" />
                        </label>
                    </div>
                </div>
            </div>

            {/* 계정 관리 */}
            <div className="w-card">
                <div className="s-section-header">
                    <Shield size={16} />
                    <span>계정 관리</span>
                </div>
                <div className="s-section-body">
                    <div className="s-actions">
                        <button className="btn-outline" onClick={() => navigate('/help')}>
                            <HelpCircle size={14} />
                            도움말
                        </button>
                        <button className="btn-danger">
                            <LogOut size={14} />
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
