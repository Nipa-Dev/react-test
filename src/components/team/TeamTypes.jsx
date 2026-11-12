import PokemonTypes from "../pokemon/PokemonTypes";

function TeamTypes({ types }) {
  return (
    <div className="card p-3 mb-4">
      <h5>Team Types</h5>

      {types.length > 0 ? (
        <PokemonTypes types={types} />
      ) : (
        <p className="text-muted mb-0">
          Add Pokemon to see your team's type coverage.
        </p>
      )}
    </div>
  );
}

export default TeamTypes;
