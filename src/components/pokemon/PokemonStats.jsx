function PokemonStats({ stats }) {
  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <div className="detail-stats-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Base Stats</h2>
        <span className="badge bg-secondary fs-6">Total: {totalStats}</span>
      </div>

      {stats.map((stat) => {
        const percentage = Math.min((stat.base_stat / 255) * 100, 100);

        return (
          <div key={stat.stat.name} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-capitalize fw-medium">
                {stat.stat.name.replace("-", " ")}
              </span>

              <span className="fw-semibold">{stat.base_stat}</span>
            </div>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={stat.base_stat}
                aria-valuemin="0"
                aria-valuemax="255"
                aria-label={stat.stat.name}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonStats;
