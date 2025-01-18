import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [availablePowers, setAvailablePowers] = useState([]);
  const [userSelectedPowers, setUserSelectedPowers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    axios
      .get(`${URL}/start`)
      .then((response) => {
        const fetchedPokemons = response.data.pokemons;
        setPokemons(fetchedPokemons);
        setSelectedPokemon(null);
        setResult(null);
        const allPowers = fetchedPokemons
          .flatMap((pokemon) => pokemon.powers.split(","))
          .sort(() => Math.random() - 0.5);
        setAvailablePowers(allPowers);
        setUserSelectedPowers([]);
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  };

  const handlePokemonChoice = (name) => {
    setSelectedPokemon(name);
  };

  const togglePowerSelection = (power) => {
    if (userSelectedPowers.length >= 3 && !userSelectedPowers.includes(power))
      return;
    setUserSelectedPowers((prev) =>
      prev.includes(power) ? prev.filter((p) => p !== power) : [...prev, power]
    );
  };

  const submitGuess = () => {
    if (!selectedPokemon) return;
    setLoading(true);
    const chosenPokemon = pokemons.find((p) => p.name === selectedPokemon);
    if (!chosenPokemon) return;
    axios
      .post(`${URL}/powers`, {
        choiceName: chosenPokemon.name,
        userPowers: userSelectedPowers,
      })
      .then((response) => {
        const {
          chosenPokemon,
          correctPowers,
          correctCount,
          totalPowers,
          percentage,
        } = response.data;
        setResult({
          chosenPokemon,
          correctPowers,
          correctCount,
          totalPowers,
          percentage,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting guess:", error);
        setLoading(false);
      });
  };

  const resetGame = () => {
    fetchPokemons();
  };

  return (
    <div>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card"
            style={{
              opacity:
                selectedPokemon && selectedPokemon !== pokemon.name ? 0.5 : 1,
            }}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <button
              onClick={() => handlePokemonChoice(pokemon.name)}
              disabled={selectedPokemon}
            >
              Choose {pokemon.name}
            </button>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="powers-section">
          <h2>Choose Any 3 Powers</h2>
          <div className="powers-list">
            {availablePowers.map((power, index) => (
              <button
                key={index}
                onClick={() => togglePowerSelection(power)}
                className={`power-button ${
                  userSelectedPowers.includes(power) ? "selected" : ""
                }`}
                disabled={
                  userSelectedPowers.length >= 3 &&
                  !userSelectedPowers.includes(power)
                }
              >
                {power}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPokemon && (
        <div className="action-buttons">
          <button onClick={submitGuess} disabled={loading}>
            {loading ? "Submitting..." : "Submit Guess"}
          </button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}

      {result && (
        <div className="results">
          <h2>Results</h2>
          <p>Correct Powers: {result.correctPowers.join(", ")}</p>
          <p>Percentage Correct: {result.percentage}%</p>
        </div>
      )}
    </div>
  );
};

export default Game;
