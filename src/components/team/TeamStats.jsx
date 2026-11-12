function TeamStats({ teamSize, averageStats, typeCount }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-lg-4">
        <div className="card h-100 p-3">
          <p className="text-muted mb-1">Team Size</p>
          <h2>{teamSize} / 6</h2>
        </div>
      </div>

      <div className="col-6 col-lg-4">
        <div className="card h-100 p-3">
          <p className="text-muted mb-1">Average Total Stats</p>
          <h2>{averageStats}</h2>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card h-100 p-3">
          <p className="text-muted mb-1">Type Coverage</p>
          <h2>{typeCount} types</h2>
        </div>
      </div>
    </div>
  );
}

export default TeamStats;
