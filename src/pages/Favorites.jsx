import { Link } from "react-router";
import { useFavorites } from "../context/useFavorites";
import PokemonCard from "../components/pokemon/PokemonCard";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1>My Favorites</h1>
        <p className="text-muted">Your favorite Pokemon, all in one place.</p>
      </div>

      <div className="mb-4">
        <span className="badge bg-danger fs-6">
          {favorites.length} Favorites
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <h3>No favorites yet</h3>
          <p className="text-muted">
            Explore Pokemon and use the heart button to save your favorites.
          </p>
          <Link to="/" className="btn btn-primary mt-2">
            Explore Pokemon
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={() => toggleFavorite(pokemon)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
