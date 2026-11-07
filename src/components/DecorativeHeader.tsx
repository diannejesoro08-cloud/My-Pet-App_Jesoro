import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const DecorativeHeader: React.FC = () => {
  return (
    <header className="decorative-header-wrapper" aria-label="My Pet App Decorative Header">
      <div className="header-decoration-stars" aria-hidden="true">
        <span className="deco-item star-1 spin-star">✦</span>
        <span className="deco-item flower-1">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="9" r="7" fill="#FFC3D0" stroke="#1839D8" strokeWidth="2.5"/>
            <circle cx="33" cy="21" r="7" fill="#FFC3D0" stroke="#1839D8" strokeWidth="2.5"/>
            <circle cx="21" cy="33" r="7" fill="#FFC3D0" stroke="#1839D8" strokeWidth="2.5"/>
            <circle cx="9" cy="21" r="7" fill="#FFC3D0" stroke="#1839D8" strokeWidth="2.5"/>
            <circle cx="21" cy="21" r="8" fill="#FFE477" stroke="#1839D8" strokeWidth="2.5"/>
          </svg>
        </span>
        <span className="deco-item star-2 spin-star">✧</span>
      </div>

      <div className="bubble-brand-container">
        {/* Word 1: MY */}
        <div className="bubble-word">
          <div className="bubble-letter bg-sky">
            <span className="char">M</span>
            <div className="letter-face">
              <span className="eye"></span>
              <span className="eye"></span>
            </div>
          </div>
          <div className="bubble-letter bg-yellow">
            <span className="char">Y</span>
            <div className="letter-face">
              <span className="eye-wink">^</span>
              <span className="eye"></span>
            </div>
          </div>
        </div>

        {/* Decorative Flower Centerpiece between words */}
        <div className="bubble-centerpiece" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="center-flower">
            <ellipse cx="28" cy="12" rx="9" ry="9" fill="#FFC3D0" stroke="#1839D8" strokeWidth="3" />
            <ellipse cx="44" cy="28" rx="9" ry="9" fill="#FFC3D0" stroke="#1839D8" strokeWidth="3" />
            <ellipse cx="28" cy="44" rx="9" ry="9" fill="#FFC3D0" stroke="#1839D8" strokeWidth="3" />
            <ellipse cx="12" cy="28" rx="9" ry="9" fill="#FFC3D0" stroke="#1839D8" strokeWidth="3" />
            <circle cx="28" cy="28" r="10" fill="#FFE477" stroke="#1839D8" strokeWidth="3" />
            {/* cute smiley face on the flower center */}
            <circle cx="25" cy="26" r="1.5" fill="#1839D8" />
            <circle cx="31" cy="26" r="1.5" fill="#1839D8" />
            <path d="M25 31 Q28 34 31 31" stroke="#1839D8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Word 2: PET */}
        <div className="bubble-word">
          <div className="bubble-letter bg-pink">
            <span className="char">P</span>
            <div className="letter-face">
              <span className="eye"></span>
              <span className="eye"></span>
            </div>
          </div>
          <div className="bubble-letter bg-mint">
            <span className="char">E</span>
            <div className="letter-face">
              <span className="eye-happy">ᵔ</span>
              <span className="eye-happy">ᵔ</span>
            </div>
          </div>
          <div className="bubble-letter bg-peach">
            <span className="char">T</span>
            <div className="letter-face">
              <span className="eye"></span>
              <span className="eye"></span>
            </div>
          </div>
        </div>

        {/* Word 3: APP */}
        <div className="bubble-word">
          <div className="bubble-letter bg-lavender">
            <span className="char">A</span>
            <div className="letter-face">
              <span className="eye-star">★</span>
              <span className="eye"></span>
            </div>
          </div>
          <div className="bubble-letter bg-sky">
            <span className="char">P</span>
            <div className="letter-face">
              <span className="eye"></span>
              <span className="eye"></span>
            </div>
          </div>
          <div className="bubble-letter bg-yellow">
            <span className="char">P</span>
            <div className="letter-face">
              <span className="eye"></span>
              <span className="eye-wink">~</span>
            </div>
          </div>
        </div>

        {/* Playful yellow cursor arrow like the reference */}
        <div className="playful-cursor" aria-hidden="true">
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <path
              d="M12 8L34 26L23 28L29 39L23 42L17 31L10 38L12 8Z"
              fill="#FFE477"
              stroke="#1839D8"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="header-subtitle-pill">
        <Sparkles size={16} className="spin-star text-deep-blue" />
        <span>A Whimsical Canine Explorer</span>
        <Heart size={14} fill="#FFC3D0" stroke="#1839D8" strokeWidth={2.5} />
      </div>

      {/* Playful Wavy Cutout Divider */}
      <div className="wavy-bottom-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="wavy-svg">
          <path
            d="M0,0 C150,55 350,55 500,10 C650,-35 850,55 1000,20 C1100,-5 1180,30 1200,15 L1200,64 L0,64 Z"
            fill="none"
          />
        </svg>
      </div>
    </header>
  );
};
