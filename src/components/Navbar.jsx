import { NavLink, Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar py-3 app-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold m-0 app-brand" to="/">
          Pokemons
        </Link>

        <div className="navbar-nav flex-row gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded-pill app-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded-pill app-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            My Team
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded-pill app-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Favorites
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
