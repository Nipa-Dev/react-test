import { NavLink, Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom py-3">
      <div className="container d-flex justify-content-between align-items-center">
        
        <Link className="navbar-brand fw-bold text-danger m-0" to="/">
          Pokemons
        </Link>

        <div className="navbar-nav flex-row gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link px-3 py-1 rounded-pill ${
                isActive ? "bg-danger text-white" : "text-secondary"
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `nav-link px-3 py-1 rounded-pill ${
                isActive ? "bg-danger text-white" : "text-secondary"
              }`
            }
          >
            My Team
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;