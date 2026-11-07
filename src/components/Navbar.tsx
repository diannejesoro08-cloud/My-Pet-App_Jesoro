import React, { useState } from 'react';
import { PawPrint, Sparkles, Menu, X, Heart, Dog } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="site-navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <a 
          href="#home" 
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="My Pet App Home"
        >
          <div className="brand-icon-wrapper">
            <Dog size={22} className="brand-dog-icon" />
            <span className="brand-bubble-paw">
              <PawPrint size={13} fill="#1839D8" />
            </span>
          </div>
          <div className="brand-text-col">
            <span className="brand-title">My Pet App</span>
            <span className="brand-caption">CANINE EXPLORER</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links-desktop">
          <li>
            <a 
              href="#home" 
              className="nav-link"
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#explorer" 
              className="nav-link"
              onClick={(e) => handleLinkClick(e, 'explorer')}
            >
              <span>Explore Breeds</span>
              <span className="nav-badge-dot"></span>
            </a>
          </li>
          <li>
            <a 
              href="#featured" 
              className="nav-link"
              onClick={(e) => handleLinkClick(e, 'featured')}
            >
              Featured
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="nav-link"
              onClick={(e) => handleLinkClick(e, 'about')}
            >
              About
            </a>
          </li>
        </ul>

        {/* Right Action & Cute Icons */}
        <div className="navbar-actions">
          <a
            href="#explorer"
            className="navbar-cta-button"
            onClick={(e) => handleLinkClick(e, 'explorer')}
          >
            <Sparkles size={16} />
            <span>Find a Pup</span>
          </a>

          <div className="social-pill-icons" aria-label="Quick pet love">
            <button 
              type="button" 
              className="paw-love-btn" 
              title="Show dog love"
              aria-label="Give a heart"
            >
              <Heart size={16} fill="#FFC3D0" stroke="#1839D8" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-links">
            <li>
              <a 
                href="#home" 
                className="mobile-link"
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#explorer" 
                className="mobile-link"
                onClick={(e) => handleLinkClick(e, 'explorer')}
              >
                Explore Breeds
              </a>
            </li>
            <li>
              <a 
                href="#featured" 
                className="mobile-link"
                onClick={(e) => handleLinkClick(e, 'featured')}
              >
                Featured Breeds
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="mobile-link"
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                About My Pet App
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
