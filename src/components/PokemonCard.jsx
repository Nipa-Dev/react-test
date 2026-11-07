function PokemonCard({ pokemon }) {
  const id = pokemon.url.split("/").filter(Boolean).pop();

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card h-100 text-center p-3">
        <img
          src={image}
          alt={pokemon.name}
          className="card-img-top"
        />

        <div className="card-body">
          <p>#{id}</p>
          <h5 className="card-title text-capitalize">
            {pokemon.name}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;