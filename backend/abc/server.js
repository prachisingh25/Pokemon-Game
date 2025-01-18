require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const seedData = require("./pokemonData");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./pokemon.db", (err) => {
  if (err) {
    console.error("Failed to connect to database", err);
    return;
  }
  console.log("Connected to database");
});

const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS pokemon (
      name TEXT PRIMARY KEY,
      image TEXT,
      powers TEXT
    )`);

    seedData.forEach(({ name, image, powers }) => {
      db.run(`INSERT INTO pokemon (name, image, powers) VALUES (?, ?, ?)`, [
        name,
        image,
        powers,
      ]);
    });

    console.log("Database initialized with seed data.");
  });
};

initializeDatabase();

const getRandomPokemon = (count) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM pokemon ORDER BY RANDOM() LIMIT ?`,
      [count],
      (err, rows) => {
        if (err) return reject(err);

        const uniquePokemons = Array.from(
          new Map(rows.map((pokemon) => [pokemon.name, pokemon])).values()
        );
        resolve(uniquePokemons.slice(0, count));
      }
    );
  });
};

app.get("/start", async (req, res) => {
  try {
    const pokemons = await getRandomPokemon(3);
    res.json({ pokemons });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon." });
  }
});

app.post("/powers", (req, res) => {
  const { choiceName, userPowers } = req.body;

  if (!choiceName || !userPowers) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  db.get(
    `SELECT * FROM pokemon WHERE name = ?`,
    [choiceName],
    (err, chosenPokemon) => {
      if (err || !chosenPokemon) {
        return res.status(404).json({ error: "Chosen Pokémon not found." });
      }

      const correctPowers = chosenPokemon.powers.split(",");
      const correctCount = userPowers.filter((power) =>
        correctPowers.includes(power)
      ).length;
      const percentage = ((correctCount / correctPowers.length) * 100).toFixed(
        2
      );

      res.json({
        chosenPokemon,
        correctPowers,
        correctCount,
        totalPowers: correctPowers.length,
        percentage,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/start`);
});
