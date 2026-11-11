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

  const replaceTeam = (newTeam) => {
    const updatedTeam = newTeam.slice(0, 6);
    setTeam(updatedTeam);
    localStorage.setItem("pokemon-team", JSON.stringify(updatedTeam));
  };

  const removeFromTeam = (id) => {
    const updatedTeam = team.filter((p) => p.id !== id);

    setTeam(updatedTeam);
    localStorage.setItem("pokemon-team", JSON.stringify(updatedTeam));
  };

  return (
    <TeamContext.Provider
      value={{ team, addToTeam, removeFromTeam, replaceTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}
