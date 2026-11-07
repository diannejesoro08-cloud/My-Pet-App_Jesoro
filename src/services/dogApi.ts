import type {
  DogBreedsApiResponse,
  DogImageApiResponse,
  DogMultipleImagesApiResponse,
  BreedOption,
} from '../types/dog';

const DOG_CEO_BASE_URL = 'https://dog.ceo/api';

/**
 * Custom display name overrides for well-known joined breed names
 */
const BREED_NAME_OVERRIDES: Record<string, string> = {
  shihtzu: 'Shih Tzu',
  stbernard: 'Saint Bernard',
  germanshepherd: 'German Shepherd',
  cotondetulear: 'Coton de Tulear',
  bullterrier: 'Bull Terrier',
  cattledog: 'Cattle Dog',
  rottweiler: 'Rottweiler',
  chihuahua: 'Chihuahua',
  weimaraner: 'Weimaraner',
  dane: 'Great Dane',
  australian: 'Australian Shepherd',
  mexicanhairless: 'Mexican Hairless',
};

/**
 * Capitalizes the first letter of each word in a string
 */
function capitalizeWord(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Formats a breed and optional sub-breed into a human-friendly display name.
 * e.g. ("shihtzu") -> "Shih Tzu"
 * e.g. ("retriever", "golden") -> "Golden Retriever"
 * e.g. ("hound", "afghan") -> "Afghan Hound"
 */
export function formatBreedDisplayName(breed: string, subBreed?: string): string {
  const normalizedBreed = breed.toLowerCase().trim();
  const baseName = BREED_NAME_OVERRIDES[normalizedBreed] || capitalizeWord(normalizedBreed);

  if (!subBreed) {
    return baseName;
  }

  const subName = capitalizeWord(subBreed.trim());

  // English natural naming order: "Golden Retriever", "Afghan Hound", "French Bulldog"
  return `${subName} ${baseName}`;
}

/**
 * Retrieves the complete list of available dog breeds and sub-breeds
 * from the Dog CEO API: https://dog.ceo/api/breeds/list/all
 */
export async function fetchAllBreeds(): Promise<BreedOption[]> {
  try {
    const response = await fetch(`${DOG_CEO_BASE_URL}/breeds/list/all`);

    if (!response.ok) {
      throw new Error(`Dog CEO API returned status ${response.status}: ${response.statusText}`);
    }

    const data: DogBreedsApiResponse = await response.json();

    if (data.status !== 'success' || !data.message) {
      throw new Error('Unexpected response format received from Dog CEO API');
    }

    const breedOptions: BreedOption[] = [];

    // Process each breed and its sub-breeds
    for (const [breed, subBreeds] of Object.entries(data.message)) {
      if (Array.isArray(subBreeds) && subBreeds.length > 0) {
        // If breed has sub-breeds, add the primary category option
        breedOptions.push({
          id: breed,
          breed: breed,
          displayName: `${formatBreedDisplayName(breed)} (All)`,
          apiPath: breed,
        });

        // Add each sub-breed option
        for (const sub of subBreeds) {
          breedOptions.push({
            id: `${breed}-${sub}`,
            breed: breed,
            subBreed: sub,
            displayName: formatBreedDisplayName(breed, sub),
            apiPath: `${breed}/${sub}`,
          });
        }
      } else {
        // Main breed without sub-breeds (e.g. shihtzu, beagle, boxer)
        breedOptions.push({
          id: breed,
          breed: breed,
          displayName: formatBreedDisplayName(breed),
          apiPath: breed,
        });
      }
    }

    // Sort alphabetically by human-readable display name
    breedOptions.sort((a, b) => a.displayName.localeCompare(b.displayName));

    return breedOptions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load breeds: ${error.message}`, { cause: error });
    }
    throw new Error('An unknown network error occurred while fetching dog breeds.', { cause: error });
  }
}

/**
 * Retrieves a random image URL for a given breed path from the Dog CEO API:
 * https://dog.ceo/api/breed/{breed}/images/random
 * or https://dog.ceo/api/breed/{breed}/{subBreed}/images/random
 */
export async function fetchRandomDogImage(apiPath: string): Promise<string> {
  if (!apiPath) {
    throw new Error('Breed path cannot be empty');
  }

  // Sanitize path (e.g. "retriever/golden" or "shihtzu")
  const sanitizedPath = apiPath.toLowerCase().trim();

  try {
    const response = await fetch(`${DOG_CEO_BASE_URL}/breed/${sanitizedPath}/images/random`);

    if (!response.ok) {
      throw new Error(`Dog CEO API returned status ${response.status}`);
    }

    const data: DogImageApiResponse = await response.json();

    if (data.status !== 'success' || !data.message) {
      throw new Error('Failed to retrieve an image for the selected breed.');
    }

    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error while retrieving dog photo.', { cause: error });
  }
}

/**
 * Retrieves multiple random images for a breed
 */
export async function fetchMultipleRandomDogImages(
  apiPath: string,
  count = 3
): Promise<string[]> {
  const sanitizedPath = apiPath.toLowerCase().trim();

  try {
    const response = await fetch(`${DOG_CEO_BASE_URL}/breed/${sanitizedPath}/images/random/${count}`);
    if (!response.ok) {
      throw new Error(`Dog CEO API returned status ${response.status}`);
    }

    const data: DogMultipleImagesApiResponse = await response.json();
    if (data.status !== 'success' || !Array.isArray(data.message)) {
      throw new Error('Failed to retrieve multiple breed photos.');
    }

    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error while retrieving multiple dog photos.', { cause: error });
  }
}
