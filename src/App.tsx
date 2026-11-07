import React from 'react';
import { DecorativeHeader } from './components/DecorativeHeader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DogExplorer } from './components/DogExplorer';
import { Sparkles, Globe } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  const handleScrollToExplorer = () => {
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site-wrapper">
      {/* Playful Giant Bubble Header */}
      <DecorativeHeader />

      {/* Main Browser Window Frame Container */}
      <main className="browser-window" id="home">
        {/* Browser Mockup Top Bar */}
        <header className="browser-titlebar">
          <div className="browser-dots" aria-hidden="true">
            <span className="browser-dot pink" />
            <span className="browser-dot yellow" />
            <span className="browser-dot green" />
          </div>

          <div className="browser-url-pill">
            <Globe size={13} />
            <span>mypetapp.dog</span>
          </div>

          <div className="browser-title-actions" aria-hidden="true">
            <Sparkles size={16} className="spin-star" />
          </div>
        </header>

        {/* Playful Navigation Bar */}
        <Navbar onNavigate={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Ticker Banner */}
        <section className="ticker-banner" aria-label="Welcome Announcement">
          <div className="ticker-track">
            <span>🐾 Discover Adorable Dog Breeds</span>
            <span>★ Every Dog Has a Story</span>
            <span>✿ Find Your Furry Best Friend</span>
            <span>🦴 Powered by the Dog CEO API</span>
            <span>🐾 Discover Adorable Dog Breeds</span>
            <span>★ Every Dog Has a Story</span>
            <span>✿ Find Your Furry Best Friend</span>
            <span>🦴 Powered by the Dog CEO API</span>
          </div>
        </section>

        {/* Hero Section */}
        <Hero onExploreClick={handleScrollToExplorer} />

        {/* Dog Breed Explorer Section */}
        <DogExplorer />
      </main>
    </div>
  );
};

export default App;
