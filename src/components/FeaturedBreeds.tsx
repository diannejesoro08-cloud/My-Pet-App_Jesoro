import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import { fetchRandomDogImage } from '../services/dogApi';

interface FeaturedBreedData {
  id: string;
  breed: string;
  subBreed?: string;
  apiPath: string;
  displayName: string;
  tag: string;
  badgeColor: 'pink' | 'yellow' | 'mint' | 'lavender';
  description: string;
  personality: string[];
}

const FEATURED_ITEMS: FeaturedBreedData[] = [
  {
    id: 'shihtzu',
    breed: 'shihtzu',
    apiPath: 'shihtzu',
    displayName: 'Shih Tzu',
    tag: 'Royal Companion',
    badgeColor: 'pink',
    description: 'Affectionate, playful, and outgoing little lions with luxurious coats and big hearts.',
    personality: ['Affectionate', 'Playful', 'Charming'],
  },
  {
    id: 'retriever-golden',
    breed: 'retriever',
    subBreed: 'golden',
    apiPath: 'retriever/golden',
    displayName: 'Golden Retriever',
    tag: 'Gentle Giant',
    badgeColor: 'yellow',
    description: 'Devoted, friendly, and remarkably smart companions who love fetching smiles.',
    personality: ['Intelligent', 'Friendly', 'Devoted'],
  },
  {
    id: 'corgi-cardigan',
    breed: 'corgi',
    subBreed: 'cardigan',
    apiPath: 'corgi/cardigan',
    displayName: 'Cardigan Corgi',
    tag: 'Bouncy Explorer',
    badgeColor: 'mint',
    description: 'Spirited, quick-witted, and loyal herders with adorable short legs and boundless energy.',
    personality: ['Spirited', 'Loyal', 'Energetic'],
  },
  {
    id: 'samoyed',
    breed: 'samoyed',
    apiPath: 'samoyed',
    displayName: 'Samoyed',
    tag: 'Fluffy Cloud',
    badgeColor: 'lavender',
    description: 'Famous for their heartwarming Sammie smile, plush white coats, and cheerful dispositions.',
    personality: ['Gentle', 'Friendly', 'Smiling'],
  },
];

interface FeaturedBreedsProps {
  onSelectFeaturedBreed?: (breedId: string) => void;
}

export const FeaturedBreeds: React.FC<FeaturedBreedsProps> = ({ onSelectFeaturedBreed }) => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      for (const item of FEATURED_ITEMS) {
        setLoadingMap((prev) => ({ ...prev, [item.id]: true }));
        try {
          const url = await fetchRandomDogImage(item.apiPath);
          if (isMounted) {
            setImages((prev) => ({ ...prev, [item.id]: url }));
          }
        } catch {
          // Keep placeholder on network error
        } finally {
          if (isMounted) {
            setLoadingMap((prev) => ({ ...prev, [item.id]: false }));
          }
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardClick = (item: FeaturedBreedData) => {
    if (onSelectFeaturedBreed) {
      onSelectFeaturedBreed(item.id);
    }
    const explorerEl = document.getElementById('explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="featured-section" id="featured" aria-labelledby="featured-title">
      <div className="featured-container">
        {/* Section Header */}
        <div className="section-title-wrap">
          <div className="badge-pill pink">
            <Sparkles size={14} />
            <span>Handpicked Favorites</span>
          </div>
          <h2 id="featured-title" className="section-main-heading">
            Featured Dog Breeds
          </h2>
          <p className="section-sub-heading">
            Meet a few spotlight companions renowned for their joyful personalities and gentle warmth.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="featured-cards-grid">
          {FEATURED_ITEMS.map((item) => {
            const imgUrl = images[item.id];
            const isLoading = loadingMap[item.id];

            return (
              <article key={item.id} className="featured-card playful-card">
                <div className="featured-card-image-box">
                  {isLoading || !imgUrl ? (
                    <div className="featured-skeleton-loader">
                      <span className="spin-star">🐾</span>
                      <span>Loading photo...</span>
                    </div>
                  ) : (
                    <img
                      src={imgUrl}
                      alt={item.displayName}
                      className="featured-dog-thumb"
                      loading="lazy"
                    />
                  )}
                  <span className={`badge-pill ${item.badgeColor} card-corner-badge`}>
                    {item.tag}
                  </span>
                </div>

                <div className="featured-card-content">
                  <div className="card-title-row">
                    <h3 className="card-breed-name">{item.displayName}</h3>
                    <Heart size={16} fill="#FFC3D0" stroke="#1839D8" />
                  </div>

                  <p className="card-description">{item.description}</p>

                  <div className="trait-chips-list">
                    {item.personality.map((trait) => (
                      <span key={trait} className="trait-chip">
                        {trait}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="explore-this-btn"
                    onClick={() => handleCardClick(item)}
                    aria-label={`Explore ${item.displayName} in the dog viewer`}
                  >
                    <span>View in Explorer</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
