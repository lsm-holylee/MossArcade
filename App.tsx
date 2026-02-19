import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 로비 영역
import Layout from './lobby/components/Layout';
import Home from './lobby/pages/Home';
import Wallet from './lobby/pages/Wallet';
import Marketplace from './lobby/pages/Marketplace';
import Events from './lobby/pages/Events';
import MatchHistory from './lobby/pages/MatchHistory';
import Leaderboard from './lobby/pages/Leaderboard';
import Friends from './lobby/pages/Friends';
import Tournaments from './lobby/pages/Tournaments';
import SettingsPage from './lobby/pages/Settings';
import HelpPage from './lobby/pages/Help';

// 게임 영역
import GameRoom from './game/pages/GameRoom';

import { EconomyProvider } from './lobby/context/EconomyContext';

const App: React.FC = () => {
  return (
    <EconomyProvider>
      <BrowserRouter>

        <Routes>
          {/* 로비 라우트 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="wallet" element={<Wallet />} />
            {/* <Route path="marketplace" element={<Marketplace />} /> */}
            <Route path="events" element={<Events />} />
            {/* <Route path="match-history" element={<MatchHistory />} /> */}
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="friends" element={<Friends />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>

          {/* 게임 라우트 - 로비 레이아웃 없이 독립 실행 */}
          <Route path="/game/:gameId" element={<GameRoom />} />
        </Routes>
      </BrowserRouter>
    </EconomyProvider>
  );
};

export default App;

