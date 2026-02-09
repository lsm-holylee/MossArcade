import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';

const Layout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`flex flex-col h-screen bg-[#0a0a0c] overflow-hidden ${!sidebarOpen ? 'sidebar-hidden' : ''}`}>
            {/* Particle Background */}
            <ParticleBackground />

            {/* Header */}
            <Header onToggleSidebar={toggleSidebar} />

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative z-10">
                <Sidebar isOpen={sidebarOpen} />
                <main
                    className="flex-1 flex flex-col overflow-hidden relative transition-all duration-400"
                    style={{ marginLeft: sidebarOpen ? '240px' : '0' }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
