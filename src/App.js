import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Events from './components/Events/Events'; // Import Events component
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

import Leaderboard from './components/Leaderboard/Leaderboard';
import OverallLeaderboard from './components/Leaderboard/OverallLeaderboard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} /> Render Events component
        
        {/* <Route path="/resources" element={<Resources />} /> */}

        <Route path="/leaderboard/:category" element={<Leaderboard />} />
        <Route path="/leaderboard" element={<OverallLeaderboard />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;



