import { useEffect, useState } from "react";
import { getPokemonPool, getRandomPokemon } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonPool, setPokemonPool] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemonPool() {
      try {
        const pool = await getPokemonPool(2000);
        const randomPokemon = await getRandomPokemon(12);

        setPokemonPool(pool);
        setPokemon(randomPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemonPool();
  }, []);

  const handleShuffle = async () => {
    try {
      const randomPokemon = await getRandomPokemon(12);
      setPokemon(randomPokemon);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter Pokemon by name
  const displayedPokemon = searchTerm.trim()
    ? pokemonPool.filter((p) =>
        p.name.includes(searchTerm.toLowerCase().trim())
      )
    : pokemon;

  if (loading) {
    return (
      <h2 className="text-center py-5">
        Loading Pokemon Pool...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-danger py-5">
        Error: {error}
      </h2>
    );
  }

  return (
    <div className="container py-3">
      <div className="mb-3">
        <h1 className="mb-4">Explore Pokemon</h1>

        <div className="row g-3 align-items-center">
          <div className="col-12 col-md">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="col-12 col-md-auto">
            <button
              className="btn btn-primary w-100"
              onClick={handleShuffle}
            >
              Shuffle Pokemon
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {displayedPokemon.length > 0 ? (
          displayedPokemon.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))
        ) : (
          <p className="text-center py-4">
            No Pokemon found matching "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
