import { useState } from "react";
import { TeamContext } from "./useTeam";

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    try {
      const savedTeam = localStorage.getItem("pokemon-team");
      return savedTeam ? JSON.parse(savedTeam) : [];
    } catch (error) {
      console.error("Could not load saved team:", error);
      return [];
    }
  });

  const saveTeam = (updatedTeam) => {
    setTeam(updatedTeam);

    try {
      localStorage.setItem("pokemon-team", JSON.stringify(updatedTeam));
    } catch (error) {
      console.error("Could not save team to localStorage:", error);
    }
  };

  const addToTeam = (pokemon) => {
    if (team.length >= 6) {
      return "full";
    }

    if (team.some((p) => p.id === pokemon.id)) {
      return "duplicate";
    }

    const updatedTeam = [...team, pokemon];
    saveTeam(updatedTeam);

    return "added";
  };

  const replaceTeam = (newTeam) => {
    const updatedTeam = newTeam.slice(0, 6);
    saveTeam(updatedTeam);
  };

  const removeFromTeam = (id) => {
    const updatedTeam = team.filter((p) => p.id !== id);
    saveTeam(updatedTeam);
  };

  return (
    <TeamContext.Provider
      value={{ team, addToTeam, removeFromTeam, replaceTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}
