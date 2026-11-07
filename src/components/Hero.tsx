import React from 'react';
import { Sparkles, ArrowDown, Heart, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/hero.png';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const handleScrollToExplorer = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const explorer = document.getElementById('explorer');
      if (explorer) {
        explorer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-section" aria-label="Hero Section">
      {/* Top Whimsical Illustration Landscape Strip */}
      <div className="hero-illustration-banner">
        <svg
          viewBox="0 0 1000 240"
          className="hero-landscape-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Sky background */}
          <rect width="1000" height="240" fill="#9DE4F5" />
          
          {/* Clouds */}
          <g fill="#FFFFFF" opacity="0.95">
            <ellipse cx="140" cy="65" rx="50" ry="24" />
            <ellipse cx="180" cy="55" rx="40" ry="24" />
            <ellipse cx="110" cy="60" rx="35" ry="20" />
            
            <ellipse cx="820" cy="70" rx="45" ry="22" />
            <ellipse cx="860" cy="60" rx="40" ry="22" />
            <ellipse cx="790" cy="65" rx="30" ry="18" />
          </g>

          {/* Happy Sun */}
          <g transform="translate(480, 50)">
            {/* Sun rays */}
            <circle cx="20" cy="20" r="38" fill="#FFE477" stroke="#1839D8" strokeWidth="3" />
            {/* Sun Face */}
            <circle cx="10" cy="14" r="3" fill="#1839D8" />
            <circle cx="30" cy="14" r="3" fill="#1839D8" />
            {/* Rosy cheeks */}
            <circle cx="5" cy="23" r="4.5" fill="#FFC3D0" />
            <circle cx="35" cy="23" r="4.5" fill="#FFC3D0" />
            {/* Smile */}
            <path d="M12 24 Q20 32 28 24" stroke="#1839D8" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>

          {/* Rolling Green Hills */}
          <path
            d="M-40,240 Q180,140 420,200 T1040,180 L1040,240 Z"
            fill="#A9E9B0"
            stroke="#1839D8"
            strokeWidth="3.5"
          />
          <path
            d="M-20,240 Q280,180 560,240 T1040,210 L1040,240 Z"
            fill="#88DE91"
            stroke="#1839D8"
            strokeWidth="3.5"
          />

          {/* Cute Whimsical Doghouse on the left */}
          <g transform="translate(110, 105)">
            {/* House body */}
            <rect x="0" y="45" width="110" height="85" rx="10" fill="#FFF0F4" stroke="#1839D8" strokeWidth="3.5" />
            {/* Roof */}
            <polygon points="-12,45 55,-8 122,45" fill="#FFC3D0" stroke="#1839D8" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Scallop roof decor */}
            <path d="M-5,45 Q15,35 35,45 Q55,35 75,45 Q95,35 115,45" fill="none" stroke="#1839D8" strokeWidth="3" />
            {/* Doorway */}
            <path d="M35,130 L35,80 Q55,58 75,80 L75,130 Z" fill="#1839D8" />
            {/* Nameplate Bone */}
            <rect x="25" y="15" width="60" height="18" rx="8" fill="#FFE477" stroke="#1839D8" strokeWidth="2.5" />
            <text x="55" y="28" textAnchor="middle" fill="#1839D8" fontSize="11" fontWeight="800" fontFamily="sans-serif">PUPPY</text>
          </g>

          {/* Cute Cartoon Pup near the house */}
          <g transform="translate(245, 125)">
            {/* Tail wagging */}
            <path d="M-8,60 Q-24,38 -14,24" stroke="#1839D8" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Pup Body */}
            <ellipse cx="28" cy="65" rx="34" ry="26" fill="#FFE477" stroke="#1839D8" strokeWidth="3.5" />
            {/* Paws */}
            <rect x="6" y="80" width="13" height="22" rx="6" fill="#FFE477" stroke="#1839D8" strokeWidth="3" />
            <rect x="36" y="80" width="13" height="22" rx="6" fill="#FFE477" stroke="#1839D8" strokeWidth="3" />
            {/* Pup Head */}
            <circle cx="50" cy="38" r="28" fill="#FFE477" stroke="#1839D8" strokeWidth="3.5" />
            {/* Floppy Ears */}
            <path d="M30,22 C20,20 18,48 30,52 Z" fill="#C6A4F5" stroke="#1839D8" strokeWidth="3" />
            <path d="M68,22 C80,20 84,48 70,52 Z" fill="#C6A4F5" stroke="#1839D8" strokeWidth="3" />
            {/* Eyes */}
            <circle cx="43" cy="36" r="3.5" fill="#1839D8" />
            <circle cx="59" cy="36" r="3.5" fill="#1839D8" />
            <circle cx="42" cy="35" r="1.2" fill="#FFFFFF" />
            <circle cx="58" cy="35" r="1.2" fill="#FFFFFF" />
            {/* Cute black nose */}
            <ellipse cx="51" cy="43" rx="4" ry="2.8" fill="#1839D8" />
            {/* Smile with cute pink tongue */}
            <path d="M47,46 Q51,52 55,46" stroke="#1839D8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M49,48 Q51,55 53,48 Z" fill="#FFC3D0" />
            {/* Collar */}
            <path d="M34,58 Q50,68 64,58" stroke="#1839D8" strokeWidth="5" fill="none" />
            <circle cx="49" cy="65" r="4.5" fill="#FFC3D0" stroke="#1839D8" strokeWidth="1.5" />
          </g>

          {/* Little Flowers across the hills */}
          <g transform="translate(680, 160)">
            {/* Flower 1 */}
            <circle cx="0" cy="0" r="12" fill="#FFC3D0" stroke="#1839D8" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="5" fill="#FFE477" stroke="#1839D8" strokeWidth="2" />
            <path d="M0,12 L0,32" stroke="#1839D8" strokeWidth="3" strokeLinecap="round" />
            <path d="M0,22 Q8,18 12,22" stroke="#1839D8" strokeWidth="2.5" fill="none" />
          </g>
          <g transform="translate(740, 175)">
            {/* Flower 2 */}
            <circle cx="0" cy="0" r="10" fill="#C6A4F5" stroke="#1839D8" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4" fill="#FFE477" stroke="#1839D8" strokeWidth="2" />
            <path d="M0,10 L0,26" stroke="#1839D8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g transform="translate(630, 185)">
            {/* Flower 3 */}
            <circle cx="0" cy="0" r="9" fill="#9DE4F5" stroke="#1839D8" strokeWidth="2" />
            <circle cx="0" cy="0" r="3.5" fill="#FFE477" stroke="#1839D8" strokeWidth="2" />
            <path d="M0,9 L0,22" stroke="#1839D8" strokeWidth="2" />
          </g>

          {/* Cute Decorative Stars / Sparkles */}
          <text x="380" y="80" fill="#1839D8" fontSize="24" fontWeight="bold">✦</text>
          <text x="630" y="70" fill="#FFE477" stroke="#1839D8" strokeWidth="1" fontSize="28" fontWeight="bold">★</text>
          <text x="730" y="110" fill="#1839D8" fontSize="20" fontWeight="bold">✦</text>
        </svg>

        {/* Small floating mascot badge in the corner */}
        <div className="hero-mascot-pill" aria-hidden="true">
          <img src={heroImg} alt="" className="hero-asset-thumb" />
          <div className="mascot-text">
            <span>Happy Pups</span>
            <span className="heart-dot">❤</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content Area */}
      <div className="hero-content-box">
        <div className="hero-badge-row">
          <span className="badge-pill pink">
            <Heart size={14} fill="#1839D8" />
            <span>100% Canine Joy</span>
          </span>
          <span className="badge-pill yellow">
            <Sparkles size={14} />
            <span>Dog CEO API Powered</span>
          </span>
          <span className="badge-pill mint">
            <ShieldCheck size={14} />
            <span>Verified Adorable</span>
          </span>
        </div>

        <h1 className="hero-heading">
          Every Dog Has a Story!
        </h1>

        <p className="hero-description">
          Discover adorable dog breeds, explore their unique personalities, and find your next favorite furry friend.
        </p>

        {/* Call to action button & helper row */}
        <div className="hero-cta-group">
          <button
            type="button"
            className="btn-primary hero-main-cta"
            onClick={handleScrollToExplorer}
          >
            <span>Explore Dog Breeds</span>
            <ArrowDown size={20} className="cta-arrow-bounce" />
          </button>

          <a href="#about" className="btn-secondary">
            <span>Learn More</span>
          </a>
        </div>

        {/* Mini stats preview strip */}
        <div className="hero-highlights-strip">
          <div className="highlight-item">
            <span className="highlight-val">90+</span>
            <span className="highlight-lbl">Distinct Breeds</span>
          </div>
          <div className="highlight-separator" aria-hidden="true">✦</div>
          <div className="highlight-item">
            <span className="highlight-val">1000s</span>
            <span className="highlight-lbl">HD Pup Photos</span>
          </div>
          <div className="highlight-separator" aria-hidden="true">✦</div>
          <div className="highlight-item">
            <span className="highlight-val">Instant</span>
            <span className="highlight-lbl">Breed Fetching</span>
          </div>
        </div>
      </div>
    </section>
  );
};
