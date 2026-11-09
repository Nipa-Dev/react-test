import { Search } from "lucide-react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text">
        <Search size={18} />
      </span>

      <input
        type="text"
        className="form-control"
        placeholder="Search Pokemon by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;