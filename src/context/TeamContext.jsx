import { createContext, useContext, useState } from "react";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem("pokemon-team");
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  const addToTeam = (pokemon) => {
    if (team.length >= 6) {
      return "full";
    }

    if (team.some((p) => p.id === pokemon.id)) {
      return "duplicate";
    }

    const updatedTeam = [...team, pokemon];

    setTeam(updatedTeam);
    localStorage.setItem("pokemon-team", JSON.stringify(updatedTeam));

    return "added";
  };

  const removeFromTeam = (id) => {
    const updatedTeam = team.filter((p) => p.id !== id);

    setTeam(updatedTeam);
    localStorage.setItem("pokemon-team", JSON.stringify(updatedTeam));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}
