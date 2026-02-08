import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import LiveChat from './LiveChat';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-[#05070A] overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-hidden relative flex">
                    {/* The Outlet will render the current page content */}
                    <Outlet />
                </main>
                <LiveChat />
            </div>
        </div>
    );
};

export default Layout;
