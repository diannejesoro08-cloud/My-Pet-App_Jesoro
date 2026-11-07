import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BreedSelector } from './BreedSelector';
import { DogImage } from './DogImage';
import { fetchAllBreeds, fetchRandomDogImage } from '../services/dogApi';
import type { BreedOption } from '../types/dog';
import { Sparkles, RefreshCw, Bone, Camera } from 'lucide-react';

export const DogExplorer: React.FC = () => {
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingBreeds, setLoadingBreeds] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photosFetchedForBreed, setPhotosFetchedForBreed] = useState<number>(1);

  // Active breed reference to strictly lock image requests to the selected breed
  const activeBreedRef = useRef<BreedOption | null>(null);
  // Guard flag to strictly prevent duplicate or overlapping concurrent network requests
  const isRequestInProgressRef = useRef<boolean>(false);

  // Find currently selected breed object
  const currentBreed = breeds.find((b) => b.id === selectedBreedId) || null;

  useEffect(() => {
    activeBreedRef.current = currentBreed;
  }, [currentBreed]);

  /**
   * Load image for a specific breed with strict concurrency locks
   * and breed invariance guarantee.
   */
  const loadBreedImage = useCallback(async (targetBreed: BreedOption, isNewFetch = false) => {
    if (!targetBreed || isRequestInProgressRef.current) return;

    isRequestInProgressRef.current = true;
    setLoadingImage(true);
    setError(null);

    try {
      // Dog CEO API endpoint for the exact selected breed path
      const url = await fetchRandomDogImage(targetBreed.apiPath);

      // Verify that the user did not switch breeds while this fetch was pending
      if (activeBreedRef.current?.id === targetBreed.id) {
        setImageUrl(url);
        if (isNewFetch) {
          setPhotosFetchedForBreed((prev) => prev + 1);
        } else {
          setPhotosFetchedForBreed(1);
        }
      }
    } catch (err) {
      if (activeBreedRef.current?.id === targetBreed.id) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Oops! We couldn't find a photo right now. Please try again.";
        setError(errorMsg);
      }
    } finally {
      if (activeBreedRef.current?.id === targetBreed.id) {
        setLoadingImage(false);
      }
      isRequestInProgressRef.current = false;
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
          // Select Shih Tzu by default to fulfill prompt emphasis, or first breed
          const defaultBreed =
            breedList.find((b) => b.id === 'shihtzu') || breedList[0];

          setSelectedBreedId(defaultBreed.id);
          activeBreedRef.current = defaultBreed;
          await loadBreedImage(defaultBreed, false);
        }
      } catch (err) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : 'Failed to load dog breeds list from Dog CEO API.';
          setError(msg);
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
    // If request is in progress or same breed clicked, handle gracefully
    if (breedId === selectedBreedId) return;

    const breed = breeds.find((b) => b.id === breedId);
    if (!breed) return;

    // Reset photo counter for new breed
    setPhotosFetchedForBreed(1);
    setSelectedBreedId(breed.id);
    activeBreedRef.current = breed;
    loadBreedImage(breed, false);
  };

  /**
   * CRITICAL REQUIREMENT:
   * When Fetch Another Photo is clicked, it MUST fetch another random photo
   * of the currently selected breed. The selected breed MUST NOT change!
   */
  const handleFetchAnotherPhoto = () => {
    if (!currentBreed || loadingImage || isRequestInProgressRef.current) return;
    loadBreedImage(currentBreed, true);
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
            disabled={loadingBreeds || loadingImage}
          />
        </div>

        {/* Display Image Container */}
        <DogImage
          imageUrl={imageUrl}
          breedName={currentBreed ? currentBreed.displayName : ''}
          loading={loadingImage || loadingBreeds}
          error={error}
          onRetry={() => currentBreed && loadBreedImage(currentBreed, false)}
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
                {currentBreed ? currentBreed.displayName : 'Breed'} Photo #{photosFetchedForBreed}
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
