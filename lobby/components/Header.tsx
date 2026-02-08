
import React from 'react';
import { Wallet, User, Smile } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#111622] border-b border-[#1E2330] shrink-0 z-30">
      <div className="flex items-center gap-3">
        <div className="bg-[#FFD700] p-1.5 rounded-lg">
          <Gamepad2 className="text-[#05070A] w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Moss Arcade</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-[#05070A] px-4 py-1.5 rounded-full border border-[#1E2330]">
          <Wallet className="text-[#FFD700] w-4 h-4" />
          <span className="text-xs font-bold">MOSS: 1250</span>
        </div>
        
        <button className="text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors">Log In</button>
        
        <button className="bg-[#FFD700] text-[#05070A] px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#FFE033] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
          Register <Smile size={14} strokeWidth={3} />
        </button>

        <div className="w-9 h-9 bg-[#151B26] border border-[#1E2330] rounded-full flex items-center justify-center hover:border-[#334155] cursor-pointer transition-all">
          <User className="text-[#94A3B8] w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

// Internal icon for Logo
const Gamepad2 = ({ className, ...props }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>
  </svg>
);

export default Header;
