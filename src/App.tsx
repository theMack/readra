// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutDemo from './components/Demo/LayoutDemo';
import TabsDemo from './components/Demo/TabsDemo';
import TypographyDemo from './components/Demo/TypographyDemo';
import FooterDemo from './components/Demo/FooterDemo';
import Home from './pages/Home';
import Read from './pages/Read';
import './styles/main.scss';
import './App.scss';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Routes>
          <Route path="/layout-demo" element={<LayoutDemo />} />
          <Route path="/" element={<Home />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/tabs-demo" element={<TabsDemo />} />
          <Route path="/typography-demo" element={<TypographyDemo />} />
          <Route path="/footer-demo" element={<FooterDemo />} />
          {/* Add more routes as needed */}
          {/* Example: <Route path="/another-demo" element={<AnotherDemo />} /> */}
          {/* Example: <Route path="/another-page" element={<AnotherPage />} /> */}

          {/* Add more routes as they're developed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;