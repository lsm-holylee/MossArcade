
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 로비 영역 (수정 금지)
import Layout from './lobby/components/Layout';
import Home from './lobby/pages/Home';
import Arcade from './lobby/pages/Arcade';
import MatchHistory from './lobby/pages/MatchHistory';
import Leaderboard from './lobby/pages/Leaderboard';
import Friends from './lobby/pages/Friends';
import Tournaments from './lobby/pages/Tournaments';

// 게임 영역 (자유롭게 수정)
import GameRouter from './games/GameRouter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로비 라우트 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="arcade" element={<Arcade />} />
          <Route path="match-history" element={<MatchHistory />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="friends" element={<Friends />} />
          <Route path="tournaments" element={<Tournaments />} />
        </Route>

        {/* 게임 라우트 - 로비 레이아웃 없이 독립 실행 */}
        <Route path="/game/:gameId" element={<GameRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
