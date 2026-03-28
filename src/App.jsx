import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import GoldScene from './GoldScene'
import LearnPage from './LearnPage'
import CharacterizationPage from './CharacterizationPage'
import './index.css'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-black text-white selection:bg-yellow-500/30 flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<GoldScene />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/characterization" element={<CharacterizationPage />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <footer className="w-full py-6 text-center border-t border-white/10 bg-[#050505] relative z-40">
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">
            Engineering Chemistry Project • Developed by <span className="text-yellow-500 font-bold">Krishna Giri</span>
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
