import React, { useState, useEffect } from 'react';
import { BreedSelector } from './BreedSelector';
import { DogImage } from './DogImage';
import { fetchAllBreeds, fetchRandomDogImage } from '../services/dogApi';
import type { BreedOption } from '../types/dog';
import { Sparkles, RefreshCw, Bone, Camera } from 'lucide-react';

interface DogExplorerProps {
  selectedBreedId: string;
  onSelectBreed: (breedId: string) => void;
}

export const DogExplorer: React.FC<DogExplorerProps> = ({
  selectedBreedId,
  onSelectBreed,
}) => {
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingBreeds, setLoadingBreeds] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photosFetchedCount, setPhotosFetchedCount] = useState<number>(1);

  // Find currently selected breed object
  const currentBreed = breeds.find((b) => b.id === selectedBreedId) || null;

  /**
   * Initial load: fetch all breeds from Dog CEO API
   */
  useEffect(() => {
    let isMounted = true;

    fetchAllBreeds()
      .then((breedList) => {
        if (!isMounted) return;
        setBreeds(breedList);
        setLoadingBreeds(false);

        // If no breed selected yet, default to Shih Tzu or first breed
        if (breedList.length > 0 && !selectedBreedId) {
          const defaultBreed =
            breedList.find((b) => b.id === 'shihtzu') || breedList[0];
          onSelectBreed(defaultBreed.id);
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const msg =
          err instanceof Error
            ? err.message
            : 'Failed to load dog breeds list from Dog CEO API.';
        setError(msg);
        setLoadingBreeds(false);
      });

    return () => {
      isMounted = false;
    };
  }, [onSelectBreed, selectedBreedId]);

  /**
   * When selectedBreedId changes, fetch a random image for that breed
   */
  useEffect(() => {
    if (!selectedBreedId || breeds.length === 0) return;

    const targetBreed = breeds.find((b) => b.id === selectedBreedId);
    if (!targetBreed) return;

    let isMounted = true;

    fetchRandomDogImage(targetBreed.apiPath)
      .then((url) => {
        if (isMounted) {
          setImageUrl(url);
          setLoadingImage(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : "Oops! We couldn't find a photo right now. Please try again.";
          setError(msg);
          setLoadingImage(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedBreedId, breeds]);

  const handleDropdownSelect = (breedId: string) => {
    if (breedId === selectedBreedId) return;
    setLoadingImage(true);
    setError(null);
    setPhotosFetchedCount(1);
    onSelectBreed(breedId);
  };

  /**
   * CRITICAL REQUIREMENT:
   * When Fetch Another Photo is clicked, it MUST request another random image
   * of the currently selected breed. The selected breed MUST NOT change!
   */
  const handleFetchAnotherPhoto = async () => {
    if (!currentBreed || loadingImage) return;

    setLoadingImage(true);
    setError(null);

    try {
      const url = await fetchRandomDogImage(currentBreed.apiPath);
      setImageUrl(url);
      setPhotosFetchedCount((prev) => prev + 1);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Oops! We couldn't find a photo right now. Please try again.";
      setError(msg);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <section className="dog-explorer-section" id="explorer" aria-labelledby="explorer-title">
      <div className="explorer-card">
        {/* Explorer Header */}
        <div className="explorer-header-area">
          <div className="badge-pill yellow">
            <Sparkles size={14} />
            <span>Interactive Dog Gallery</span>
          </div>
          <h2 id="explorer-title" className="explorer-section-title">
            Meet Your Next Favorite Pup
          </h2>
          <p className="explorer-section-caption">
            Pick any breed from the list below and explore photos pulled live from Dog CEO API!
          </p>
        </div>

        {/* Breed Selector */}
        <div className="explorer-control-row">
          <BreedSelector
            breeds={breeds}
            selectedBreedId={selectedBreedId}
            onSelectBreed={handleDropdownSelect}
            disabled={loadingBreeds || loadingImage}
          />
        </div>

        {/* Display Image Container */}
        <DogImage
          imageUrl={imageUrl}
          breedName={currentBreed ? currentBreed.displayName : ''}
          loading={loadingImage || loadingBreeds}
          error={error}
          onRetry={handleFetchAnotherPhoto}
        />

        {/* Fetch Button Action Row */}
        <div className="explorer-action-row">
          <div className="fetch-button-container">
            <button
              type="button"
              className="btn-primary fetch-photo-button"
              onClick={handleFetchAnotherPhoto}
              disabled={loadingImage || loadingBreeds || !selectedBreedId}
              aria-label={`Fetch another photo of ${currentBreed ? currentBreed.displayName : 'the selected breed'}`}
            >
              <RefreshCw
                size={20}
                className={loadingImage ? 'spin-star' : 'fetch-icon-bounce'}
              />
              <span>{loadingImage ? 'Fetching Cutie...' : 'Fetch Another Photo'}</span>
              <Bone size={18} className="fetch-bone-icon" />
            </button>
          </div>

          <div className="fetch-status-indicators">
            <span className="badge-pill pink photo-counter-badge">
              <Camera size={13} />
              <span>
                {currentBreed ? currentBreed.displayName : 'Breed'} Photo #{photosFetchedCount}
              </span>
            </span>
            <p className="fetch-indicator-note">
              Selected breed stays strictly locked to <strong>{currentBreed ? currentBreed.displayName : 'your chosen breed'}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
