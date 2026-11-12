import { Ruler, Weight, Sparkles } from "lucide-react";

function PokemonInfo({ pokemon }) {
  return (
    <div className="row g-3 mb-5">
      <div className="col-6 col-lg-3">
        <div className="detail-info-card">
          <Ruler size={22} />
          <p className="text-muted mb-1 mt-2">Height</p>
          <h4>{pokemon.height / 10} m</h4>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="detail-info-card">
          <Weight size={22} />
          <p className="text-muted mb-1 mt-2">Weight</p>
          <h4>{pokemon.weight / 10} kg</h4>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="detail-info-card h-100">
          <Sparkles size={22} />
          <p className="text-muted mb-2 mt-2">Abilities</p>

          <div className="d-flex flex-wrap gap-2">
            {pokemon.abilities.map((item) => (
              <span
                key={item.ability.name}
                className="badge bg-light text-dark border text-capitalize"
              >
                {item.ability.name.replace("-", " ")}
                {item.is_hidden && " (Hidden)"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
