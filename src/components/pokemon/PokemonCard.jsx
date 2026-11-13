import { Link } from "react-router";

function PokemonCard({ pokemon, onRemove }) {
  const id = pokemon.id ?? pokemon.url.split("/").filter(Boolean).pop();

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card pokemon-card h-100 text-center p-3">
        <p className="pokemon-id">#{String(id).padStart(3, "0")}</p>

        <Link to={`/pokemon/${id}`} className="pokemon-card-link">
          <img
            src={image}
            alt={pokemon.name}
            className="pokemon-image img-fluid"
            loading="lazy"
          />

          <div className="card-body">
            <h5 className="card-title text-capitalize mb-0">{pokemon.name}</h5>
          </div>
        </Link>

        {onRemove && (
          <button
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${pokemon.name} from team`}
          >
            Remove from Team
          </button>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
