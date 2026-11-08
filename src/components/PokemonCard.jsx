import { Link } from "react-router";

function PokemonCard({ pokemon }) {
  const id = pokemon.url.split("/").filter(Boolean).pop();

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Link
        to={`/pokemon/${id}`}
        className="pokemon-card-link"
      >
        <div className="card pokemon-card h-100 text-center p-3">

          <p className="pokemon-id">#{String(id).padStart(3, "0")}</p>

          <img
            src={image}
            alt={pokemon.name}
            className="pokemon-image img-fluid"
            loading="lazy"
          />

          <div className="card-body">
            <h5 className="card-title text-capitalize mb-0">
              {pokemon.name}
            </h5>
          </div>

        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;