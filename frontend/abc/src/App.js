import React from "react";
import Game from "./components/Game";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Pokémon Game</h1>
      <h2>Select one Pokémon</h2>
      <Game />
    </div>
  );
};

export default App;
