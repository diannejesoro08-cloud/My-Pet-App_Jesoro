import React from 'react';
import { Heart, Sparkles, Smile, Compass, Dog } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-container">
        {/* Playful Header */}
        <div className="section-title-wrap">
          <div className="badge-pill yellow">
            <Heart size={14} fill="#1839D8" />
            <span>Our Canine Mission</span>
          </div>
          <h2 id="about-title" className="section-main-heading">
            Made for People Who Love Dogs
          </h2>
          <p className="section-sub-heading about-intro-p">
            My Pet App makes discovering different dog breeds fun and simple. Explore adorable photos, learn about different breeds, and enjoy discovering your favorite furry companions.
          </p>
        </div>

        {/* 4 Whimsical Feature Cards */}
        <div className="about-feature-grid">
          <div className="about-card bg-soft-yellow">
            <div className="about-icon-bubble bg-yellow" aria-hidden="true">
              <Dog size={28} className="text-deep-blue" />
            </div>
            <h3 className="about-card-title">Live Dog CEO API</h3>
            <p className="about-card-text">
              Direct connection to the renowned open-source Dog CEO API, offering authentic and verified dog photos worldwide.
            </p>
          </div>

          <div className="about-card bg-soft-pink">
            <div className="about-icon-bubble bg-pink" aria-hidden="true">
              <Sparkles size={28} className="text-deep-blue" />
            </div>
            <h3 className="about-card-title">Pure Playful Design</h3>
            <p className="about-card-text">
              Crafted with a cheerful pastel palette, bubbly typography, and joyful cartoon details that bring a smile to every dog lover.
            </p>
          </div>

          <div className="about-card bg-soft-mint">
            <div className="about-icon-bubble bg-mint" aria-hidden="true">
              <Compass size={28} className="text-deep-blue" />
            </div>
            <h3 className="about-card-title">Reliable Exploration</h3>
            <p className="about-card-text">
              Switch across 90+ canine breeds instantly. When you fetch another photo, your selected breed remains locked without surprises.
            </p>
          </div>

          <div className="about-card bg-soft-lavender">
            <div className="about-icon-bubble bg-lavender" aria-hidden="true">
              <Smile size={28} className="text-deep-blue" />
            </div>
            <h3 className="about-card-title">Joyful & Responsive</h3>
            <p className="about-card-text">
              Designed from the ground up for phones, tablets, laptops, and ultra-wide screens with silky-smooth interactions.
            </p>
          </div>
        </div>

        {/* Playful Banner Quote Strip */}
        <div className="about-quote-box">
          <span className="quote-paw-icon" aria-hidden="true">🐾</span>
          <p className="quote-text">
            "Dogs do speak, but only to those who know how to listen."
          </p>
          <span className="quote-author">— Orhan Pamuk</span>
        </div>
      </div>
    </section>
  );
};
