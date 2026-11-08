import { useEffect, useState, useCallback } from "react";
import { getRandomPokemon } from "../services/api";
import PokemonCard from "../components/PokemonCard";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const randomPokemonData = await getRandomPokemon(12);
      setPokemon(randomPokemonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRandomPokemon();
  }, [loadRandomPokemon]);

  if (loading && pokemon.length === 0) {
    return <h2 className="text-center py-5">Loading Pokemon Pool...</h2>;
  }
  
  if (error) {
    return <h2 className="text-center py-5 text-danger">Error: {error}</h2>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Explore Random Pokemon</h1>
          <button
            className="btn btn-primary"
            onClick={loadRandomPokemon}
            disabled={loading}
          >
            {loading ? "Shuffling..." : "Shuffle Pokemon"}
          </button>
      </div>

      <div className="row g-4">
        {pokemon.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;