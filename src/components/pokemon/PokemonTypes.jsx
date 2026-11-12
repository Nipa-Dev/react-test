const typeColors = {
  normal: "type-normal",
  fire: "type-fire",
  water: "type-water",
  electric: "type-electric",
  grass: "type-grass",
  ice: "type-ice",
  fighting: "type-fighting",
  poison: "type-poison",
  ground: "type-ground",
  flying: "type-flying",
  psychic: "type-psychic",
  bug: "type-bug",
  rock: "type-rock",
  ghost: "type-ghost",
  dragon: "type-dragon",
  dark: "type-dark",
  steel: "type-steel",
  fairy: "type-fairy",
};

function PokemonTypes({ types }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {types.map((item) => {
        const typeName = typeof item === "string" ? item : item.type.name;

        return (
          <span
            key={typeName}
            className={`type-badge ${typeColors[typeName] || ""}`}
          >
            {typeName}
          </span>
        );
      })}
    </div>
  );
}

export default PokemonTypes;
