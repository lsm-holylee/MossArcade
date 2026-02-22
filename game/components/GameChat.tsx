import React, { useState, useRef, useEffect } from 'react';
import { Send, LogOut, MessageSquare, X } from 'lucide-react';

interface Message {
    id: string;
    sender: string;
    text: string;
    type: 'user' | 'system';
}

interface GameChatProps {
    onExit: () => void;
}

const GameChat: React.FC<GameChatProps> = ({ onExit }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'System', text: '매칭???�사?�었?�니??', type: 'system' },
        { id: '2', sender: 'System', text: '매너?�는 채팅 부?�드립니??', type: 'system' },
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'You',
            text: input,
            type: 'user'
        }]);
        setInput('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-[#0d0d12] border-l border-white/5 w-[320px] flex-shrink-0 relative">
            {/* Header: GAME CHAT + EXIT button */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0d0d12]">
                <div className="flex items-center gap-2 text-gray-400">
                    <MessageSquare size={18} />
                    <span className="font-orbitron text-sm font-bold tracking-wider">GAME CHAT</span>
                </div>
                <button
                    onClick={onExit}
                    className="flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-md transition-all text-[10px] font-bold border border-red-500/20"
                >
                    <LogOut size={12} />
                    EXIT
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#0d0d12]">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.type === 'system' ? 'items-center my-4' : msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                        {msg.type === 'system' ? (
                            <span className="text-[10px] text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">{msg.text}</span>
                        ) : (
                            <div className={`px-4 py-2.5 rounded-2xl text-xs max-w-[85%] break-words relative
                                ${msg.sender === 'You'
                                    ? 'bg-[#1a1d26] text-gray-200 rounded-tr-none border border-white/5'
                                    : 'bg-[#1a1d26] text-gray-200 rounded-tl-none border border-white/5'
                                }
                            `}>
                                {msg.text}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area (Fixed at bottom) */}
            <div className="p-4 border-t border-white/5 bg-[#12141a]">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지�??�력?�세??.."
                        className="w-full bg-[#08090c] text-white text-xs rounded pl-4 pr-10 py-3 border border-white/10 focus:border-[#999999]/50 focus:outline-none transition-colors placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#999999] p-1.5 transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GameChat;
