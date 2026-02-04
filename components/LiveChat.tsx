
import React from 'react';
import { CHAT_MESSAGES } from '../constants';

const LiveChat: React.FC = () => {
  return (
    <aside className="w-80 hidden xl:flex flex-col bg-[#111622] border-l border-[#1E2330] h-full">
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#1E2330] bg-[#111622] shrink-0">
        <h3 className="font-bold tracking-wide">Live Chat</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD700]"></span>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {CHAT_MESSAGES.map((msg) => (
          <div key={msg.id} className="flex gap-3 animate-in fade-in duration-500">
            <div className="w-9 h-9 rounded-full bg-[#05070A] border border-[#1E2330] flex items-center justify-center shrink-0">
              <span className="text-[11px] font-black text-[#FFD700] tracking-tighter">{msg.userId}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wide">{msg.user}</span>
              <p className="text-sm text-[#E2E8F0] leading-snug">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#111622] border-t border-[#1E2330]">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="w-full bg-[#05070A] border border-[#1E2330] rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:border-[#FFD70044] transition-all"
          />
        </div>
      </div>
    </aside>
  );
};

export default LiveChat;
