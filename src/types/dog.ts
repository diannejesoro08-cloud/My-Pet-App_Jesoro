/**
 * TypeScript Interfaces for Dog CEO API & Breed Management
 */

export interface DogBreedsApiResponse {
  message: Record<string, string[]>;
  status: 'success' | 'error';
}

export interface DogImageApiResponse {
  message: string;
  status: 'success' | 'error';
}

export interface DogMultipleImagesApiResponse {
  message: string[];
  status: 'success' | 'error';
}

export interface BreedOption {
  id: string; // e.g. "shihtzu", "retriever-golden"
  breed: string; // e.g. "shihtzu", "retriever"
  subBreed?: string; // e.g. "golden"
  displayName: string; // e.g. "Shih Tzu", "Golden Retriever"
  apiPath: string; // e.g. "shihtzu", "retriever/golden"
}

export interface DogImageState {
  url: string;
  breedId: string;
  breedName: string;
}

export interface FeaturedBreedCard {
  id: string;
  breed: string;
  subBreed?: string;
  displayName: string;
  apiPath: string;
  description: string;
  tag: string;
  badgeColor: 'pink' | 'yellow' | 'mint' | 'lavender' | 'blue';
  sampleImageUrl?: string;
}

// Legacy compatibility types during transition
export interface BreedImage {
  id: string;
  url: string;
  thumb: string;
  medium: string;
  large: string;
}

export interface BreedAttributes {
  name: string;
  description: string;
  hypoallergenic: boolean;
  images?: BreedImage[];
}

export interface BreedData {
  id: string;
  type: string;
  attributes: BreedAttributes;
}

export interface BreedCollectionResponse {
  data: BreedData[];
}

