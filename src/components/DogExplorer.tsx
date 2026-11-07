import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BreedSelector } from './BreedSelector';
import { DogImage } from './DogImage';
import { fetchAllBreeds, fetchRandomDogImage } from '../services/dogApi';
import type { BreedOption } from '../types/dog';
import { Sparkles, RefreshCw } from 'lucide-react';

export const DogExplorer: React.FC = () => {
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingBreeds, setLoadingBreeds] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Keep a reference to the active breed path to guarantee fetch requests never switch breeds
  const activeBreedRef = useRef<BreedOption | null>(null);

  // Find currently selected breed object
  const currentBreed = breeds.find((b) => b.id === selectedBreedId) || null;

  useEffect(() => {
    activeBreedRef.current = currentBreed;
  }, [currentBreed]);

  /**
   * Load image for a specific breed
   */
  const loadBreedImage = useCallback(async (breed: BreedOption) => {
    if (!breed) return;
    setLoadingImage(true);
    setError(null);

    try {
      const url = await fetchRandomDogImage(breed.apiPath);
      // Double check that user hasn't switched to a different breed while request was in-flight
      if (activeBreedRef.current?.id === breed.id) {
        setImageUrl(url);
      }
    } catch {
      if (activeBreedRef.current?.id === breed.id) {
        setError("Oops! We couldn't find a photo right now. Please try again.");
      }
    } finally {
      if (activeBreedRef.current?.id === breed.id) {
        setLoadingImage(false);
      }
    }
  }, []);

  /**
   * Initial load: fetch all breeds from Dog CEO API
   */
  useEffect(() => {
    let isMounted = true;

    const initializeBreeds = async () => {
      setLoadingBreeds(true);
      setError(null);

      try {
        const breedList = await fetchAllBreeds();
        if (!isMounted) return;

        setBreeds(breedList);

        if (breedList.length > 0) {
          // Default to Shih Tzu if available (prompt highlights Shih Tzu testing), or first breed
          const defaultBreed =
            breedList.find((b) => b.id === 'shihtzu') || breedList[0];

          setSelectedBreedId(defaultBreed.id);
          activeBreedRef.current = defaultBreed;
          await loadBreedImage(defaultBreed);
        }
      } catch {
        if (isMounted) {
          setError('Failed to load dog breeds list from Dog CEO API. Please check your internet connection.');
        }
      } finally {
        if (isMounted) {
          setLoadingBreeds(false);
        }
      }
    };

    initializeBreeds();

    return () => {
      isMounted = false;
    };
  }, [loadBreedImage]);

  /**
   * Handler when user selects a different breed from dropdown
   */
  const handleSelectBreed = (breedId: string) => {
    const breed = breeds.find((b) => b.id === breedId);
    if (!breed) return;

    setSelectedBreedId(breed.id);
    activeBreedRef.current = breed;
    loadBreedImage(breed);
  };

  /**
   * Handler for fetching another photo of the CURRENTLY selected breed
   */
  const handleFetchAnotherPhoto = () => {
    if (!currentBreed || loadingImage) return;
    // CRITICAL: Ensure the selected breed remains unchanged!
    loadBreedImage(currentBreed);
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
            onSelectBreed={handleSelectBreed}
            disabled={loadingBreeds}
          />
        </div>

        {/* Display Image Container */}
        <DogImage
          imageUrl={imageUrl}
          breedName={currentBreed ? currentBreed.displayName : ''}
          loading={loadingImage || loadingBreeds}
          error={error}
          onRetry={() => currentBreed && loadBreedImage(currentBreed)}
        />

        {/* Fetch Button Action Row */}
        <div className="explorer-action-row">
          <button
            type="button"
            className="btn-primary fetch-photo-button"
            onClick={handleFetchAnotherPhoto}
            disabled={loadingImage || loadingBreeds || !selectedBreedId}
            aria-label={`Fetch another photo of ${currentBreed ? currentBreed.displayName : 'the selected breed'}`}
          >
            <RefreshCw size={20} className={loadingImage ? 'spin-star' : ''} />
            <span>Fetch Another Photo</span>
          </button>
          <p className="fetch-indicator-note">
            Fetches a new random image of <strong>{currentBreed ? currentBreed.displayName : 'your chosen breed'}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};
