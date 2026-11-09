import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getPokemon } from "../services/api";

function Details() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        const data = await getPokemon(id);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  if (loading) return <p className="text-center py-5">Loading Pokemon...</p>;
  if (error) return <p className="text-center text-danger py-5">{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        &larr; Back to Explore
      </Link>

      <h1 className="text-capitalize">{pokemon.name}</h1>
      <p>#{String(pokemon.id).padStart(3, "0")}</p>

    </div>
  );
}

export default Details;