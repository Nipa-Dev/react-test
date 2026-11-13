const BASE_URL = "https://pokeapi.co/api/v2";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// In-memory cache
const memoryCache = new Map();

async function fetchWithMemoryCache(url) {
  const cached = memoryCache.get(url);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("Memory cache hit:", url);
    return cached.data;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  memoryCache.set(url, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

async function fetchWithPersistentCache(url) {
  const cached = localStorage.getItem(url);

  if (cached) {
    try {
      const parsed = JSON.parse(cached);

      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        console.log("Local storage cache hit:", url);
        return parsed.data;
      }

      localStorage.removeItem(url);
    } catch (error) {
      console.warn("Could not read cached list:", error);
      localStorage.removeItem(url);
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  try {
    localStorage.setItem(
      url,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    console.warn("Could not save Pokemon list cache:", error);
  }

  return data;
}

export async function getPokemon(id) {
  return fetchWithMemoryCache(`${BASE_URL}/pokemon/${id}`);
}

export async function getPokemonList(limit = 24, offset = 0) {
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

  if (limit >= 1000) {
    return fetchWithPersistentCache(url);
  }

  return fetchWithMemoryCache(url);
}

export async function getPokemonDetails(url) {
  return fetchWithMemoryCache(url);
}

export async function getPokemonPool(limit = 500, offset = 0) {
  const data = await fetchWithMemoryCache(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  return data.results;
}

export async function getRandomPokemon(count = 12) {
  const pool = await getPokemonPool(2000);

  const selected = getRandomItems(pool, count);

  const pokemonDetails = await Promise.all(
    selected.map((pokemon) => getPokemonDetails(pokemon.url)),
  );

  return pokemonDetails;
}

// Helper function to pick N random items without repetition
function getRandomItems(arr, count) {
  const cloned = [...arr];
  const n = Math.min(count, cloned.length);

  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (cloned.length - i));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned.slice(0, n);
}
