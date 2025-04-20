// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read/:id" element={<Read />} />
          {/* Add more routes as they're developed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;