const BASE_URL = "https://pokeapi.co/api/v2";

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// In-memory cache
const memoryCache = new Map();

export async function fetchWithCache(url) {
  const memoryCached = memoryCache.get(url);

  if (memoryCached && Date.now() - memoryCached.timestamp < CACHE_DURATION) {
    console.log("Memory cache hit:", url);
    return memoryCached.data;
  }

  try {
    const stored = localStorage.getItem(url);

    if (stored) {
      const parsed = JSON.parse(stored);

      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        console.log("LocalStorage cache hit:", url);

        memoryCache.set(url, parsed);

        return parsed.data;
      }

      localStorage.removeItem(url);
    }
  } catch (error) {
    console.warn("Could not read cache:", error);
  }

  console.log("Fetching from API:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  const cacheEntry = {
    data,
    timestamp: Date.now()
  };

  memoryCache.set(url, cacheEntry);

  try {
    localStorage.setItem(url, JSON.stringify(cacheEntry));
  } catch (error) {
    console.warn("Could not save cache:", error);
  }

  return data;
}

// Fetch specific pokemon by ID
export async function getPokemon(id) {
  return fetchWithCache(`${BASE_URL}/pokemon/${id}`);
}

export async function getPokemonList(limit = 24, offset = 0) {
  return fetchWithCache(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
}
// Fetch a bunch of pokemons one time, to avoid calling the API too often
// Returns lightweight data
export async function getPokemonPool(limit = 2000, offset = 0) {
  const data = await fetchWithCache(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  return data.results;
}

export async function getRandomPokemon(count = 12) {
  const pool = await getPokemonPool();

  const randomItems = [];
  const takenIndices = new Set();

  while (randomItems.length < count && takenIndices.size < pool.length) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    if (!takenIndices.has(randomIndex)) {
      takenIndices.add(randomIndex);
      randomItems.push(pool[randomIndex]);
    }
  }

  return randomItems;
}