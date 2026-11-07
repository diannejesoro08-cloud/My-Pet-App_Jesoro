import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { BreedOption } from '../types/dog';

interface BreedSelectorProps {
  breeds: BreedOption[];
  selectedBreedId: string;
  onSelectBreed: (breedId: string) => void;
  disabled?: boolean;
}

export const BreedSelector: React.FC<BreedSelectorProps> = ({
  breeds,
  selectedBreedId,
  onSelectBreed,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectBreed(e.target.value);
  };

  return (
    <div className="breed-selector-wrapper">
      <label htmlFor="breed-select" className="breed-selector-label">
        <span className="label-icon" aria-hidden="true">🐶</span>
        <span className="label-text">Choose Your Favorite Breed</span>
      </label>

      <div className="custom-select-box">
        <div className="select-icon-left" aria-hidden="true">
          <Search size={18} className="text-deep-blue" />
        </div>

        <select
          id="breed-select"
          className="breed-dropdown"
          value={selectedBreedId}
          onChange={handleChange}
          disabled={disabled || breeds.length === 0}
          aria-label="Choose Your Favorite Breed"
        >
          {breeds.length === 0 ? (
            <option value="" disabled>
              Loading dog breeds...
            </option>
          ) : (
            breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.displayName}
              </option>
            ))
          )}
        </select>

        <div className="select-icon-arrow" aria-hidden="true">
          <ChevronDown size={20} className="text-deep-blue" />
        </div>
      </div>
    </div>
  );
};
