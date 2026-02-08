import React from 'react';
import { Trophy, Calendar, Users, Clock } from 'lucide-react';

const Tournaments: React.FC = () => {
    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-8 relative z-10">
                <Trophy className="text-[#FFD700]" size={24} />
                <h1 className="text-2xl font-bold text-white">Tournaments</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {/* Featured Tournament */}
                <div className="lg:col-span-2 bg-gradient-to-r from-[#FFD70022] to-[#111622] border border-[#FFD70044] rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-[#FFD70011] blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFD700] text-[#05070A] text-[10px] font-black uppercase tracking-widest mb-4">
                                Major Event
                            </div>
                            <h2 className="text-3xl font-black text-white italic mb-2">GOLDEN CUE CHAMPIONSHIP</h2>
                            <p className="text-[#94A3B8] max-w-lg mb-6">The biggest Billiards tournament of the season. Prove your skills and win the grand prize.</p>

                            <div className="flex flex-wrap gap-4 text-sm font-bold text-[#64748B] mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[#FFD700]" />
                                    <span>Feb 24 - Feb 26</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy size={16} className="text-[#FFD700]" />
                                    <span>25,000 XP Prize Pool</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-[#FFD700]" />
                                    <span>64 / 128 Registered</span>
                                </div>
                            </div>

                            <button className="bg-[#FFD700] text-[#05070A] px-6 py-3 rounded-xl font-bold hover:bg-[#EAB308] hover:scale-105 transition-all shadow-lg shadow-[#FFD70022]">
                                Register Now
                            </button>
                        </div>

                        <div className="w-full md:w-auto flex justify-center">
                            <div className="w-48 h-48 bg-[#FFD70011] rounded-full flex items-center justify-center border border-[#FFD70033] relative">
                                <Trophy size={80} className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                                <div className="absolute inset-0 border-4 border-[#FFD70011] rounded-full animate-pulse-slow" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Regular Tournament Card */}
                <div className="bg-[#111622] border border-[#1E2330] rounded-xl p-6 hover:border-[#FFD70044] transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-[#FFD700] transition-colors">Weekly Poker Night</h3>
                            <p className="text-xs text-[#64748B]">Texas Hold'em No Limit</p>
                        </div>
                        <div className="bg-[#1E2330] p-2 rounded-lg">
                            <Trophy size={20} className="text-[#64748B] group-hover:text-[#FFD700] transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#64748B] flex items-center gap-2"><Clock size={14} /> Starts in</span>
                            <span className="font-mono text-white">04:23:10</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#64748B] flex items-center gap-2"><Users size={14} /> Players</span>
                            <span className="font-mono text-white">45/100</span>
                        </div>
                    </div>

                    <button className="w-full py-2.5 rounded-lg bg-[#1E2330] text-[#94A3B8] font-bold text-sm hover:bg-[#FFD700] hover:text-[#05070A] transition-all">
                        Join Lobby
                    </button>
                </div>

                {/* Another Tournament Card */}
                <div className="bg-[#111622] border border-[#1E2330] rounded-xl p-6 hover:border-[#FFD70044] transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-[#FFD700] transition-colors">Cosmic Race</h3>
                            <p className="text-xs text-[#64748B]">Space Shoot Speedrun</p>
                        </div>
                        <div className="bg-[#1E2330] p-2 rounded-lg">
                            <Trophy size={20} className="text-[#64748B] group-hover:text-[#FFD700] transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#64748B] flex items-center gap-2"><Clock size={14} /> Starts in</span>
                            <span className="font-mono text-white">12:00:00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#64748B] flex items-center gap-2"><Users size={14} /> Players</span>
                            <span className="font-mono text-white">128/500</span>
                        </div>
                    </div>

                    <button className="w-full py-2.5 rounded-lg bg-[#1E2330] text-[#94A3B8] font-bold text-sm hover:bg-[#FFD700] hover:text-[#05070A] transition-all">
                        Join Lobby
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tournaments;
