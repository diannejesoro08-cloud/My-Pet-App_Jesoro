import React, { useState } from 'react';
import { PawPrint, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface DogImageProps {
  imageUrl: string | null;
  breedName: string;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const DogImage: React.FC<DogImageProps> = ({
  imageUrl,
  breedName,
  loading,
  error,
  onRetry,
}) => {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const isImageLoaded = loadedUrl === imageUrl;

  return (
    <div className="dog-image-container-wrapper">
      {/* Top Banner Row above the picture */}
      <div className="image-header-badge-row">
        <div className="badge-pill lavender moment-badge">
          <Sparkles size={13} className="spin-star" />
          <span>BREED OF THE MOMENT</span>
        </div>
        <div className="selected-breed-pill">
          <PawPrint size={14} className="text-deep-blue" />
          <span className="current-breed-title">{breedName || 'Select a Breed'}</span>
        </div>
      </div>

      {/* Frame for the Image */}
      <div className="dog-photo-frame">
        {/* Loading Overlay */}
        {loading && (
          <div className="photo-loading-overlay" role="status" aria-live="polite">
            <div className="loading-paw-bounce" aria-hidden="true">
              <PawPrint size={40} className="animated-paw" />
            </div>
            <p className="loading-message">Finding another adorable pup...</p>
            <span className="loading-sub">Fetching from Dog CEO API</span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="photo-error-overlay" role="alert">
            <AlertCircle size={42} className="error-icon" />
            <p className="error-title">Oops! We couldn't find a photo right now.</p>
            <p className="error-description">Please try again or select another breed.</p>
            {onRetry && (
              <button type="button" onClick={onRetry} className="btn-secondary retry-btn">
                <RefreshCw size={15} />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !imageUrl && (
          <div className="photo-empty-overlay">
            <div className="empty-mascot-circle" aria-hidden="true">
              <PawPrint size={48} />
            </div>
            <p className="empty-title">Choose a breed above to meet a pup!</p>
          </div>
        )}

        {/* Actual Image */}
        {imageUrl && !error && (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={`Adorable ${breedName || 'dog'} showing its playful personality`}
            className={`dog-display-image ${isImageLoaded ? 'loaded' : 'loading'} ${loading ? 'blurred' : ''}`}
            onLoad={() => setLoadedUrl(imageUrl)}
            onError={() => setLoadedUrl(imageUrl)}
          />
        )}

        {/* Decorative corner tag */}
        <div className="photo-decorative-tag" aria-hidden="true">
          <span>🐾 100% PAW-SOME</span>
        </div>
      </div>
    </div>
  );
};
