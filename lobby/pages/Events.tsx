import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Gift, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { ALL_CARDS } from '../constants';
import { EventCard as EventCardType } from '../types';

// ===== 이벤트 페이지 — 메인에서 분리된 이벤트 카드들을 여기서 표시 =====
const Events: React.FC = () => {
    const navigate = useNavigate();

    // constants에서 이벤트 타입 카드만 필터
    const eventCards = ALL_CARDS.filter(c => c.type === 'event') as EventCardType[];

    // 남은 시간 계산 헬퍼
    const getTimeLeft = (endsAt: string) => {
        const diff = new Date(endsAt).getTime() - Date.now();
        if (diff <= 0) return '종료됨';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (days > 0) return `${days}일 ${hours}시간 남음`;
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}시간 ${mins}분 남음`;
    };

    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* 배경 장식 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#88888805] blur-[120px] pointer-events-none" />

            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-8 relative z-10">
                <CalendarDays className="text-[#888888]" size={24} />
                <h1 className="text-2xl font-bold text-white">이벤트</h1>
                <span className="bg-[#111622] text-[#64748B] text-xs px-2 py-0.5 rounded border border-[#1E2330] ml-2">
                    {eventCards.length}
                </span>
            </div>

            {/* 이벤트 카드 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {eventCards.map((event) => (
                    <div
                        key={event.id}
                        className="bg-[#111622] border border-[#1E2330] rounded-2xl overflow-hidden hover:border-[#88888844] transition-all group cursor-pointer"
                        onClick={() => alert(`🎉 "${event.title}" 이벤트 상세 페이지는 준비 중입니다.`)}
                    >
                        {/* 이벤트 썸네일 + 오버레이 */}
                        <div className="relative h-48 overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url(${event.thumbnail})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-transparent" />

                            {/* 남은 시간 뱃지 */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#FF6B6B]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                                <Clock size={12} />
                                {getTimeLeft(event.endsAt)}
                            </div>

                            {/* 핀 표시 */}
                            {event.pinned && (
                                <div className="absolute top-4 left-4 flex items-center gap-1 bg-[#888888]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                                    <Sparkles size={10} />
                                    PINNED
                                </div>
                            )}
                        </div>

                        {/* 이벤트 정보 */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#888888] transition-colors">
                                {event.title}
                            </h3>
                            <p className="text-[#94A3B8] text-sm mb-4">{event.description}</p>

                            <div className="flex items-center justify-between">
                                {/* 리워드 뱃지 */}
                                {event.reward && (
                                    <div className="flex items-center gap-2 bg-[#FFD70015] text-[#FFD700] text-sm font-bold px-3 py-1.5 rounded-lg border border-[#FFD70033]">
                                        <Gift size={14} />
                                        {event.reward}
                                    </div>
                                )}

                                {/* 자세히 보기 */}
                                <div className="flex items-center gap-1 text-[#64748B] text-sm font-medium group-hover:text-[#888888] transition-colors ml-auto">
                                    자세히 보기
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 이벤트가 없을 때 */}
                {eventCards.length === 0 && (
                    <div className="text-center py-20 text-[#64748B]">
                        <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-bold">현재 진행 중인 이벤트가 없습니다</p>
                        <p className="text-sm mt-2">새로운 이벤트가 곧 시작됩니다!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
