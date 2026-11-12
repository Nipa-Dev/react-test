import { useState } from "react";
import { FavoritesContext } from "./useFavorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("pokemon-favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (pokemon) => {
    const isFavorite = favorites.some((p) => p.id === pokemon.id);

    const updatedFavorites = isFavorite
      ? favorites.filter((p) => p.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    localStorage.setItem("pokemon-favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((pokemon) => pokemon.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
