
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Arcade from './pages/Arcade';
import MatchHistory from './pages/MatchHistory';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Tournaments from './pages/Tournaments';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="arcade" element={<Arcade />} />
          <Route path="match-history" element={<MatchHistory />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="friends" element={<Friends />} />
          <Route path="tournaments" element={<Tournaments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
