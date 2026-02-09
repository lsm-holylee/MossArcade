import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swords, Car, Brain, Target, Gamepad2, Puzzle, Users, Zap, Trophy, Heart, Star, Flame } from 'lucide-react';
import { ALL_GAMES } from '../constants';
import GameCard from '../components/GameCard';

// ---- Components ----
const CategoryButton: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color} hover:brightness-110 transition-all text-white text-[11px] font-bold`}>
        {icon}
        <span>{label}</span>
    </button>
);

// ---- Main Page ----

const Home: React.FC = () => {
    // Scroll ref for potential future features, currently just a container
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter games for different sections
    // Mosaic: Use first 8 games
    const mosaicGames = ALL_GAMES.slice(0, 8);

    // Recommended: Use remaining 2 + mixture of others to fill row
    // We have 10 games total. 
    // Let's use 9 and 10 for "New" in recommended section, plus shuffle some others
    const recommendedGames = [
        ALL_GAMES[8], // 활
        ALL_GAMES[9], // 탱크
        ALL_GAMES[0], // 당구
        ALL_GAMES[1], // 하키
        ALL_GAMES[5], // 패널티킥
        ALL_GAMES[6], // 포커
    ].filter(Boolean); // Safety check

    // Brand: Use a mix
    const brandGames = [
        ALL_GAMES[2], // 룰렛
        ALL_GAMES[3], // 가위바위보
        ALL_GAMES[4], // 체스
        ALL_GAMES[7], // 네온
        ALL_GAMES[8],
        ALL_GAMES[9],
    ].filter(Boolean);

    // Recently Played (Just first 5 for demo)
    const recentGames = ALL_GAMES.slice(0, 5);

    const categories = [
        { icon: <Swords size={14} />, label: '액션', color: 'bg-red-600' },
        { icon: <Car size={14} />, label: '레이싱', color: 'bg-blue-600' },
        { icon: <Brain size={14} />, label: '퍼즐', color: 'bg-purple-600' },
        { icon: <Target size={14} />, label: '슈팅', color: 'bg-orange-600' },
        { icon: <Gamepad2 size={14} />, label: '아케이드', color: 'bg-green-600' },
        { icon: <Puzzle size={14} />, label: '보드', color: 'bg-yellow-600' },
        { icon: <Users size={14} />, label: '멀티', color: 'bg-pink-600' },
        { icon: <Zap size={14} />, label: '캐주얼', color: 'bg-cyan-600' },
        { icon: <Trophy size={14} />, label: '스포츠', color: 'bg-emerald-600' },
        { icon: <Heart size={14} />, label: '시뮬', color: 'bg-rose-600' },
    ];

    return (
        <div
            ref={scrollRef}
            className="h-full bg-transparent overflow-y-auto px-6 py-6 pt-20 scrollbar-hide"
        >
            {/* 1. Continue Playing (Small Icons) */}
            <section className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-sm font-bold text-gray-200">계속 플레이하기</h2>
                    <button className="text-[10px] text-[#00ff99] hover:underline">모두 보기</button>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {recentGames.map((game) => (
                        <Link key={game.id} to={`/game/${game.id}`} className="group relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-[#00ff99] transition-all">
                            <img src={game.icon} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* 2. Top Recommendations (Mosaic Grid 8-cols) */}
            <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-200 mb-3">당신을 위한 최고의 추천</h2>
                {/* 
                    CrazyGames style mosaic layout often uses a specific grid structure.
                    Here we use 8 columns.
                    Row 1: [2x2] [1x1] [1x1] [2x2] [1x1] [1x1] -> This is 2+1+1+2+1+1 = 8 cols. Perfect.
                    Row 2: Left 2x2 continues, [1x1] [1x1] filled below first row 1x1s, Right 2x2 continues, [1x1] [1x1] filled.
                */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {mosaicGames.map((game, idx) => (
                        <div key={`mosaic-${game.id}`} className="aspect-square relative group">
                            <GameCard
                                game={game}
                                className="h-full"
                                badge={
                                    idx === 0 ? "Top" :
                                        idx === 1 ? "Hot" :
                                            idx === 3 ? "Popular" :
                                                idx === 6 ? "Updated" : undefined
                                }
                                badgeColor={
                                    idx === 0 ? "bg-yellow-400 text-black" :
                                        idx === 1 ? "bg-orange-500 text-white" :
                                            idx === 3 ? "bg-purple-500 text-white" :
                                                idx === 6 ? "bg-blue-500 text-white" : undefined
                                }
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Recommended (Landscape Grid) */}
            <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-200 mb-3">추천 게임</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {recommendedGames.map((game, idx) => (
                        <div key={`rec-${game.id}-${idx}`} className="aspect-square">
                            <GameCard game={game} className="h-full" badge={idx < 2 ? "New" : undefined} badgeColor="bg-green-500 text-white" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Play on Brand (Portrait Grid) */}
            <section className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-sm font-bold text-gray-200">브랜드에서 플레이</h2>
                    <span className="text-[10px] text-gray-500">더 스마트한 AI 기반 플레이 및 검색 방식</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {brandGames.map((game, idx) => (
                        <div key={`brand-${game.id}-${idx}`} className="aspect-square">
                            <GameCard
                                game={game}
                                className="h-full"
                                badge="Play on 🎮"
                                badgeColor="bg-white text-black"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Categories */}
            <section className="mb-8">
                <h2 className="text-sm font-bold text-gray-200 mb-3">📂 카테고리</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, idx) => (
                        <CategoryButton key={idx} icon={cat.icon} label={cat.label} color={cat.color} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
