import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Heart } from "lucide-react";

import { getPokemon } from "../services/api";
import { useTeam } from "../context/useTeam";
import { useFavorites } from "../context/FavoritesContext";

import PokemonTypes from "../components/PokemonTypes";
import PokemonStats from "../components/PokemonStats";
import PokemonInfo from "../components/PokemonInfo";

function Details() {
  const { id } = useParams();
  const { team, addToTeam, removeFromTeam } = useTeam();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamMessage, setTeamMessage] = useState("");

  const isInTeam = pokemon ? team.some((p) => p.id === pokemon.id) : false;

  const favorite = pokemon ? isFavorite(pokemon.id) : false;

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);
      setPokemon(null);
      setTeamMessage("");

      try {
        const data = await getPokemon(id);
        setPokemon(data);
      } catch (err) {
        setError(err.message || "Could not load Pokemon.");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  const handleTeamToggle = () => {
    if (isInTeam) {
      removeFromTeam(pokemon.id);
      setTeamMessage(`${pokemon.name} removed from your team.`);
      return;
    }

    const result = addToTeam(pokemon);

    if (result === "added") {
      setTeamMessage(`${pokemon.name} added to your team.`);
    } else if (result === "full") {
      setTeamMessage("Your team is already full (6 Pokemon).");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading Pokemon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <Link to="/" className="btn btn-outline-secondary">
          Back to Explore
        </Link>
      </div>
    );
  }

  if (!pokemon) return null;

  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        &larr; Back to Explore
      </Link>

      <div className="row g-4 align-items-center mb-5">
        <div className="col-12 col-md-5">
          <div className="pokemon-detail-artwork">
            {artwork ? (
              <img src={artwork} alt={pokemon.name} className="img-fluid" />
            ) : (
              <p className="text-muted">Artwork unavailable</p>
            )}
          </div>
        </div>

        <div className="col-12 col-md-7">
          <p className="text-muted mb-1">
            #{String(pokemon.id).padStart(3, "0")}
          </p>

          <h1 className="display-4 text-capitalize mb-3">{pokemon.name}</h1>

          <div className="mb-4">
            <PokemonTypes types={pokemon.types} />
          </div>

          <p className="text-muted">
            Explore the stats and characteristics of {pokemon.name}.
          </p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className={`btn ${
                isInTeam ? "btn-outline-danger" : "btn-primary"
              }`}
              onClick={handleTeamToggle}
              disabled={!isInTeam && team.length >= 6}
            >
              {isInTeam
                ? "Remove from Team"
                : team.length >= 6
                  ? "Team Full"
                  : "+ Add to Team"}
            </button>

            <button
              className={`btn ${
                favorite ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => toggleFavorite(pokemon)}
              aria-label={
                favorite ? "Remove from Favorites" : "Add to Favorites"
              }
              title={favorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart size={20} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>

          {teamMessage && (
            <p className="small text-muted mt-3 mb-0" role="status">
              {teamMessage}
            </p>
          )}
        </div>
      </div>

      <h2 className="mb-3">About</h2>
      <PokemonInfo pokemon={pokemon} />

      {/* Pokemon stats */}
      <PokemonStats stats={pokemon.stats} />
    </div>
  );
}

export default Details;
