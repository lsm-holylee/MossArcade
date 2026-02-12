import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, RankTier } from '../types';

// ===== 경제 컨텍스트 인터페이스 =====
// 기획서 11장: MOC ↔ MMOC 듀얼 토큰 + PvP 제로섬
interface EconomyContextType {
    // 유저 상태
    user: UserProfile;
    isGuest: boolean;

    // MMOC 잔고 (인게임 포인트)
    mmocBalance: number;

    // 입금: MOC → MMOC (1:1 전환, 기획서 11장)
    deposit: (mocAmount: number) => void;

    // 출금: MMOC → MOC (수수료 2%, 기획서 11장)
    withdraw: (mmocAmount: number) => { success: boolean; mocReceived: number; fee: number };

    // Faucet: 잔고 1,000 미만 시 1,000 MMOC 무료 충전 (일 3회, 기획서 5.1)
    faucet: () => { success: boolean; message: string };

    // 기본 코인 연산
    addCoin: (amount: number) => void;
    spendCoin: (amount: number) => boolean;

    // 지갑 연결 (게스트 → MetaMask 전환)
    connectWallet: (address: string) => void;

    // 등급 계산 (누적 배팅 기반, 기획서 5.3)
    getRankTier: (cumulativeBet: number) => RankTier;
    getRankLabel: (tier: RankTier) => string;

    // 거래 내역
    transactions: Transaction[];
}

// 거래 내역 타입
interface Transaction {
    id: string;
    type: 'deposit' | 'withdraw' | 'bet' | 'win' | 'faucet' | 'purchase';
    amount: number;
    fee?: number;
    timestamp: string;
    description: string;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

// ===== 등급 기준 (기획서 5.3) =====
const RANK_THRESHOLDS: { tier: RankTier; min: number; label: string }[] = [
    { tier: 'legend', min: 1_000_000, label: '도신 (Legend)' },
    { tier: 'master', min: 200_000, label: '지존 (Master)' },
    { tier: 'skilled', min: 50_000, label: '고수 (Skilled)' },
    { tier: 'regular', min: 5_000, label: '중수 (Regular)' },
    { tier: 'beginner', min: 0, label: '평민 (Beginner)' },
];

// ===== Faucet 상수 (기획서 11장) =====
const FAUCET_AMOUNT = 1_000;        // 무료 충전 금액
const FAUCET_THRESHOLD = 1_000;     // 잔고 이 미만일 때만 사용 가능
const FAUCET_DAILY_LIMIT = 3;       // 일일 최대 횟수
const WITHDRAW_FEE_RATE = 0.02;     // 출금 수수료 2%

export const EconomyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // ===== 유저 프로필 상태 =====
    const [user, setUser] = useState<UserProfile>(() => {
        const saved = localStorage.getItem('moss_arcade_user');
        if (saved) return JSON.parse(saved);
        return {
            uuid: crypto.randomUUID?.() || 'guest-' + Date.now(),
            walletAddress: null,
            nickname: 'Guest',
            avatarUrl: '',
            mmocBalance: 0,
            cumulativeBet: 0,
            rankTier: 'beginner' as RankTier,
            totalWins: 0,
            totalGames: 0,
            isGuest: true,
        };
    });

    // Faucet 사용 횟수 (일일 리셋)
    const [faucetCount, setFaucetCount] = useState<number>(() => {
        const saved = localStorage.getItem('moss_arcade_faucet');
        if (saved) {
            const data = JSON.parse(saved);
            // 날짜가 다르면 리셋
            const today = new Date().toDateString();
            if (data.date !== today) return 0;
            return data.count;
        }
        return 0;
    });

    // 거래 내역
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('moss_arcade_transactions');
        return saved ? JSON.parse(saved) : [];
    });

    // ===== 로컬 스토리지 동기화 =====
    useEffect(() => {
        localStorage.setItem('moss_arcade_user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('moss_arcade_faucet', JSON.stringify({
            count: faucetCount,
            date: new Date().toDateString(),
        }));
    }, [faucetCount]);

    useEffect(() => {
        localStorage.setItem('moss_arcade_transactions', JSON.stringify(transactions.slice(-50)));
    }, [transactions]);

    // ===== 거래 기록 헬퍼 =====
    const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'timestamp'>) => {
        const newTx: Transaction = {
            ...tx,
            id: 'tx-' + Date.now(),
            timestamp: new Date().toISOString(),
        };
        setTransactions(prev => [newTx, ...prev]);
    }, []);

    // ===== 등급 계산 (누적 배팅 기반) =====
    const getRankTier = useCallback((cumulativeBet: number): RankTier => {
        for (const rank of RANK_THRESHOLDS) {
            if (cumulativeBet >= rank.min) return rank.tier;
        }
        return 'beginner';
    }, []);

    const getRankLabel = useCallback((tier: RankTier): string => {
        return RANK_THRESHOLDS.find(r => r.tier === tier)?.label || '평민 (Beginner)';
    }, []);

    // ===== 코인 추가 (PvP 승리 등) =====
    const addCoin = useCallback((amount: number) => {
        setUser(prev => ({
            ...prev,
            mmocBalance: prev.mmocBalance + amount,
        }));
    }, []);

    // ===== 코인 차감 (배팅, 구매 등) =====
    const spendCoin = useCallback((amount: number): boolean => {
        if (user.mmocBalance >= amount) {
            setUser(prev => ({
                ...prev,
                mmocBalance: prev.mmocBalance - amount,
            }));
            return true;
        }
        return false;
    }, [user.mmocBalance]);

    // ===== 입금: MOC → MMOC (1:1, 기획서 11장) =====
    const deposit = useCallback((mocAmount: number) => {
        setUser(prev => ({
            ...prev,
            mmocBalance: prev.mmocBalance + mocAmount,
        }));
        addTransaction({
            type: 'deposit',
            amount: mocAmount,
            description: `MOC ${mocAmount.toLocaleString()} → MMOC ${mocAmount.toLocaleString()} 전환`,
        });
    }, [addTransaction]);

    // ===== 출금: MMOC → MOC (수수료 2%, 기획서 11장) =====
    const withdraw = useCallback((mmocAmount: number) => {
        if (user.isGuest) {
            return { success: false, mocReceived: 0, fee: 0 };
        }
        if (user.mmocBalance < mmocAmount) {
            return { success: false, mocReceived: 0, fee: 0 };
        }
        const fee = Math.floor(mmocAmount * WITHDRAW_FEE_RATE);
        const mocReceived = mmocAmount - fee;

        setUser(prev => ({
            ...prev,
            mmocBalance: prev.mmocBalance - mmocAmount,
        }));
        addTransaction({
            type: 'withdraw',
            amount: mmocAmount,
            fee,
            description: `MMOC ${mmocAmount.toLocaleString()} → MOC ${mocReceived.toLocaleString()} (수수료 ${fee.toLocaleString()})`,
        });
        return { success: true, mocReceived, fee };
    }, [user.mmocBalance, user.isGuest, addTransaction]);

    // ===== Faucet: 무료 충전 (기획서 11장) =====
    const faucet = useCallback(() => {
        // 잔고가 이미 충분한 경우
        if (user.mmocBalance >= FAUCET_THRESHOLD) {
            return { success: false, message: `잔고가 ${FAUCET_THRESHOLD.toLocaleString()} MMOC 이상이면 Faucet을 사용할 수 없습니다.` };
        }
        // 일일 횟수 제한
        if (faucetCount >= FAUCET_DAILY_LIMIT) {
            return { success: false, message: `일일 무료 충전 횟수(${FAUCET_DAILY_LIMIT}회)를 초과했습니다. 내일 다시 시도해주세요.` };
        }

        setUser(prev => ({
            ...prev,
            mmocBalance: prev.mmocBalance + FAUCET_AMOUNT,
        }));
        setFaucetCount(prev => prev + 1);
        addTransaction({
            type: 'faucet',
            amount: FAUCET_AMOUNT,
            description: `Faucet 무료 충전 ${FAUCET_AMOUNT.toLocaleString()} MMOC (${faucetCount + 1}/${FAUCET_DAILY_LIMIT}회)`,
        });
        return { success: true, message: `${FAUCET_AMOUNT.toLocaleString()} MMOC가 충전되었습니다! (${faucetCount + 1}/${FAUCET_DAILY_LIMIT}회)` };
    }, [user.mmocBalance, faucetCount, addTransaction]);

    // ===== 지갑 연결 (게스트 → MetaMask 업그레이드) =====
    const connectWallet = useCallback((address: string) => {
        setUser(prev => ({
            ...prev,
            walletAddress: address,
            isGuest: false,
        }));
    }, []);

    return (
        <EconomyContext.Provider value={{
            user,
            isGuest: user.isGuest,
            mmocBalance: user.mmocBalance,
            deposit,
            withdraw,
            faucet,
            addCoin,
            spendCoin,
            connectWallet,
            getRankTier,
            getRankLabel,
            transactions,
        }}>
            {children}
        </EconomyContext.Provider>
    );
};

// 하위 호환: 기존 코드에서 mossCoin으로 접근하던 부분 지원
export const useEconomy = () => {
    const context = useContext(EconomyContext);
    if (context === undefined) {
        throw new Error('useEconomy must be used within a EconomyProvider');
    }
    // mossCoin 별칭 제공 (기존 호환)
    return { ...context, mossCoin: context.mmocBalance };
};
