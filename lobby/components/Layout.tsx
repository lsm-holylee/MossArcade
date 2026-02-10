import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';

const Layout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen bg-[#111113] overflow-hidden">
            {/* Particle Background Container with low opacity */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <ParticleBackground />
            </div>

            {/* Top Navigation */}
            <TopBar onToggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex flex-1 pt-14 h-full relative z-10">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} />

                {/* Content */}
                <main
                    className={`
                        flex-1 flex flex-col overflow-y-auto bg-[#121214] custom-scrollbar
                        transition-all duration-300 ease-in-out
                    `}
                    style={{
                        marginLeft: sidebarOpen ? '240px' : '72px'
                    }}
                >
                    <div className="p-6 md:p-8 min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
