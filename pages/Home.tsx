import React from 'react';
import { Search, ThumbsUp, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { RECOMMENDED_GAMES, POPULAR_GAMES } from '../constants';
import GameCard from '../components/GameCard';

const Home: React.FC = () => {
    return (
        <div className="flex-1 bg-[#05070A] overflow-y-auto p-8 relative">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FFD70005] blur-[120px] pointer-events-none" />

            {/* Search Section */}
            <div className="relative max-w-2xl mx-auto mb-10 z-10">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569]">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full bg-[#111622] border border-[#1E2330] rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#FFD70044] focus:ring-1 focus:ring-[#FFD70022] transition-all placeholder-[#475569]"
                />
            </div>

            {/* Recommended Section */}
            <section className="mb-12 relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <ThumbsUp className="text-[#FFD700]" size={18} />
                        <h2 className="text-lg font-bold">Recommended Games</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] bg-[#111622] px-3 py-1.5 rounded-lg border border-[#1E2330] hover:text-[#FFD700] hover:border-[#FFD70044] transition-all mr-2">
                            View All
                        </button>
                        <button className="p-1.5 rounded-full bg-[#111622] border border-[#1E2330] hover:bg-[#1E2330] transition-colors">
                            <ChevronLeft size={16} className="text-[#94A3B8]" />
                        </button>
                        <button className="p-1.5 rounded-full bg-[#111622] border border-[#1E2330] hover:bg-[#1E2330] transition-colors">
                            <ChevronRight size={16} className="text-[#94A3B8]" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {RECOMMENDED_GAMES.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>

            {/* Popular Section */}
            <section className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Flame className="text-[#FFD700]" size={18} />
                        <h2 className="text-lg font-bold">Popular Games</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] bg-[#111622] px-3 py-1.5 rounded-lg border border-[#1E2330] hover:text-[#FFD700] hover:border-[#FFD70044] transition-all mr-2">
                            View All
                        </button>
                        <button className="p-1.5 rounded-full bg-[#111622] border border-[#1E2330] hover:bg-[#1E2330] transition-colors">
                            <ChevronLeft size={16} className="text-[#94A3B8]" />
                        </button>
                        <button className="p-1.5 rounded-full bg-[#111622] border border-[#1E2330] hover:bg-[#1E2330] transition-colors">
                            <ChevronRight size={16} className="text-[#94A3B8]" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {POPULAR_GAMES.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 py-10 border-t border-[#1E2330] flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                <p className="text-xs font-medium text-[#94A3B8]">© 2024 Moss Arcade. All rights reserved.</p>
                <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#111622] border border-[#1E2330] flex items-center justify-center cursor-pointer hover:bg-[#1E2330]">
                        <Facebook size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#111622] border border-[#1E2330] flex items-center justify-center cursor-pointer hover:bg-[#1E2330]">
                        <Twitter size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#111622] border border-[#1E2330] flex items-center justify-center cursor-pointer hover:bg-[#1E2330]">
                        <Youtube size={14} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Social Icons helper
const Facebook = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Youtube = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);

export default Home;
