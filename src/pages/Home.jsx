
import { useEffect, useState } from "react";
import { getPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemonList(24, 0);
        setPokemon(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  if (loading) return <h2>Loading Pokemon...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Explore Pokemon</h1>

      <div className="row g-4">
        {pokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
