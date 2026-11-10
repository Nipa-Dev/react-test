import { Link } from "react-router";
import { useTeam } from "../context/TeamContext";
import PokemonCard from "../components/PokemonCard";

function Team() {
  const { team, removeFromTeam } = useTeam();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>My Team</h1>
          <p className="text-muted mb-0">Your selected Pokemon.</p>
        </div>

        <span className="badge bg-primary fs-6">{team.length} / 6</span>
      </div>

      {team.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your team is empty</h3>
          <p className="text-muted">
            Explore Pokemon and add your favorites to your team.
          </p>
          <Link to="/" className="btn btn-primary mt-2">
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
