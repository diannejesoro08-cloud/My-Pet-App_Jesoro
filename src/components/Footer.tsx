import React from 'react';
import { Dog, PawPrint, Heart, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Dog size={24} />
              </div>
              <span className="footer-logo-title">My Pet App</span>
            </div>
            <p className="footer-description">
              A whimsical canine explorer designed to brighten your day with thousands of adorable dog photos and breed profiles.
            </p>
            <div className="footer-paws-strip" aria-hidden="true">
              <span>🐾</span>
              <span>★</span>
              <span>🐾</span>
              <span>✿</span>
              <span>🐾</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#explorer">Dog Explorer</a></li>
              <li><a href="#featured">Featured Breeds</a></li>
              <li><a href="#about">About My Pet App</a></li>
            </ul>
          </div>

          {/* API Attribution & Credits Column */}
          <div className="footer-credits-col">
            <h4 className="footer-col-title">Dog Data & API</h4>
            <p className="footer-credits-text">
              Images and breed classifications courtesy of the open-source Dog CEO API.
            </p>
            <a
              href="https://dog.ceo/dog-api/"
              target="_blank"
              rel="noopener noreferrer"
              className="api-link-pill"
            >
              <span>Visit Dog CEO API</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Footer Copyright & Scroll-to-Top Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} My Pet App. Developed with <Heart size={14} fill="#FFC3D0" stroke="#1839D8" className="inline-heart" /> for pet enthusiasts worldwide.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-button"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Decorative scallop pattern at the base */}
      <div className="footer-scallop-base" aria-hidden="true">
        <PawPrint size={18} />
      </div>
    </footer>
  );
};
