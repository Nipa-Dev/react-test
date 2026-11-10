import { HashRouter, Routes, Route } from "react-router";
import { TeamProvider } from "./context/TeamContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Team from "./pages/Team";

function App() {
  return (
    <TeamProvider>
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </HashRouter>
    </TeamProvider>
  );
}

export default App;
