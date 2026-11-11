import { HashRouter, Routes, Route } from "react-router";
import { TeamProvider } from "./context/TeamContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Team from "./pages/Team";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <TeamProvider>
      <FavoritesProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Details />} />
            <Route path="/team" element={<Team />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </HashRouter>
      </FavoritesProvider>
    </TeamProvider>
  );
}

export default App;
