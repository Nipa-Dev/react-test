import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getPokemon } from "../services/api";
import { Heart } from "lucide-react";
import { useTeam } from "../context/TeamContext";
import { useFavorites } from "../context/FavoritesContext";

function Details() {
  const { id } = useParams();
  const { team, addToTeam, removeFromTeam } = useTeam();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [teamMessage, setTeamMessage] = useState("");

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTeamToggle = () => {
    const isInTeam = team.some((p) => p.id === pokemon.id);

    if (isInTeam) {
      removeFromTeam(pokemon.id);
      setTeamMessage(`${pokemon.name} removed from your team.`);
      return;
    }

    const result = addToTeam(pokemon);

    if (result === "added") {
      setTeamMessage(`${pokemon.name} added to your team!`);
    } else if (result === "full") {
      setTeamMessage("Your team is already full (6 Pokemon).");
    }
  };

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
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="img-fluid"
        style={{ maxWidth: "300px" }}
      />
      <div className="mt-3">
        <p>
          <strong>Type:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>

        <p>
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>

        <p>
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
      </div>
      <div className="mt-4">
        <h3>Base Stats</h3>

        {pokemon.stats.map((stat) => (
          <p key={stat.stat.name}>
            <strong className="text-capitalize">
              {stat.stat.name.replace("-", " ")}:
            </strong>{" "}
            {stat.base_stat}
          </p>
        ))}
      </div>
      <div className="mt-4 mb-4 d-flex gap-2">
        <button
          className={`btn ${
            team.some((p) => p.id === pokemon.id)
              ? "btn-outline-danger"
              : "btn-primary"
          }`}
          onClick={handleTeamToggle}
          disabled={!team.some((p) => p.id === pokemon.id) && team.length >= 6}
        >
          {team.some((p) => p.id === pokemon.id)
            ? "Remove from Team"
            : team.length >= 6
              ? "Team Full"
              : "+ Add to Team"}
        </button>
        <button
          className={`btn ${
            isFavorite(pokemon.id) ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => toggleFavorite(pokemon)}
          aria-label={
            isFavorite(pokemon.id)
              ? "Remove from Favorites"
              : "Add to Favorites"
          }
          title={
            isFavorite(pokemon.id)
              ? "Remove from Favorites"
              : "Add to Favorites"
          }
        >
          <Heart
            size={20}
            fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
          />
        </button>
        {teamMessage && <p className="mt-2 text-muted">{teamMessage}</p>}
      </div>
    </div>
  );
}

export default Details;
