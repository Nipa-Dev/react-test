import { useState } from "react";
import { Link } from "react-router";
import { useTeam } from "../context/useTeam";
import { getRandomPokemon } from "../services/api";
import PokemonCard from "../components/pokemon/PokemonCard";
import TeamStats from "../components/team/TeamStats";
import TeamTypes from "../components/team/TeamTypes";

function Team() {
  const { team, removeFromTeam, replaceTeam } = useTeam();

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Calculate team statistics
  const pokemonStats = team.map((pokemon) => ({
    ...pokemon,
    totalStats: pokemon.stats.reduce(
      (total, stat) => total + stat.base_stat,
      0,
    ),
  }));

  const averageStats =
    team.length > 0
      ? Math.round(
          pokemonStats.reduce(
            (total, pokemon) => total + pokemon.totalStats,
            0,
          ) / team.length,
        )
      : 0;

  const strongestPokemon = pokemonStats.reduce(
    (strongest, pokemon) =>
      !strongest || pokemon.totalStats > strongest.totalStats
        ? pokemon
        : strongest,
    null,
  );

  const teamTypes = [
    ...new Set(
      team.flatMap((pokemon) => pokemon.types.map((type) => type.type.name)),
    ),
  ];

  // Generate a random team of six Pokemon
  const handleGenerateTeam = async () => {
    setGenerating(true);
    setError("");
    setMessage("");

    try {
      const pokemonDetails = await getRandomPokemon(6);

      replaceTeam(pokemonDetails);
      setMessage("Your new random team is ready!");
    } catch (err) {
      setError("Could not generate a team. Please try again.");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>My Team</h1>
          <p className="text-muted mb-0">Build and manage your Pokemon team.</p>
        </div>

        <span className="badge bg-primary fs-6">{team.length} / 6</span>
      </div>

      <TeamStats
        teamSize={team.length}
        averageStats={averageStats}
        typeCount={teamTypes.length}
      />

      <TeamTypes types={teamTypes} />

      {strongestPokemon && (
        <div className="card p-3 mb-4">
          <h5>Strongest Pokemon</h5>

          <div className="d-flex align-items-center gap-3">
            <img
              src={
                strongestPokemon.sprites.other?.["official-artwork"]
                  ?.front_default || strongestPokemon.sprites.front_default
              }
              alt={strongestPokemon.name}
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
              }}
            />

            <div>
              <h5 className="text-capitalize mb-1">{strongestPokemon.name}</h5>

              <p className="text-muted mb-0">
                Total base stats: {strongestPokemon.totalStats}
              </p>

              <Link to={`/pokemon/${strongestPokemon.id}`} className="small">
                View details
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="card p-4 mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h4>Random Team Generator</h4>
            <p className="text-muted mb-0">
              Generate six random Pokemon using PokeAPI.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleGenerateTeam}
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate Random Team"}
          </button>
        </div>

        {team.length > 0 && (
          <p className="text-muted small mt-3 mb-0">
            Generating a new team will replace your current team.
          </p>
        )}

        {message && (
          <p className="text-success mt-3 mb-0" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="text-danger mt-3 mb-0" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="mb-3">
        <h3>Your Pokemon</h3>
        <p className="text-muted">{team.length} Pokemon in your team.</p>
      </div>

      {team.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your team is empty</h4>
          <p className="text-muted">
            Explore Pokemon or generate a random team to get started.
          </p>

          <Link to="/" className="btn btn-outline-primary mt-2">
            Explore Pokemon
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {team.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={removeFromTeam}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Team;
