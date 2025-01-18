# Pokémon Game

## Introduction
The Pokémon Game is a web game where users choose a Pokémon and guess its associated powers.

In this game, the user selects a Pokémon and then chooses three powers they think are associated with it. After submitting the guess, they get feedback on how many powers they got right and their accuracy percentage.

## Tech Stack
The game is built using React for the frontend and Express with SQLite for the backend. The backend provides the Pokémon data and handles the user’s guesses, while the frontend displays the game interface and interacts with the API.

## How to Get Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. **Clone the repository** to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. **Install the dependencies** for both the frontend and backend:
    - Navigate to the `frontend` directory:
      ```bash
      cd frontend
      npm install
      ```

    - Navigate to the `backend` directory:
      ```bash
      cd backend
      npm install
      ```

3. **Setup environment variables**:
    - Create a `.env` file in the `frontend` and `backend` directories (if not already present).
    - Add the following in the `.env` file in the `frontend` directory:
      ```env
      REACT_APP_API_BASE_URL=http://localhost:3001
      ```

   - Add the following in the `.env` file in the `backend` directory:
      ```env
      PORT=3001
      ```

### Running the Application
1. **Start the backend** (Express server):
    - Navigate to the `backend` folder and run:
      ```bash
      npm start
      ```
    - This will start the backend server on `http://localhost:3001`.

2. **Start the frontend** (React app):
    - Navigate to the `frontend` folder and run:
      ```bash
      npm start
      ```
    - This will start the React development server on `http://localhost:3000`.

    Now, open your browser and navigate to `http://localhost:3000` to play the game.

## Features of the API

### Endpoints

1. **GET `/start`**:
   - Fetches three random Pokémon with their powers.
   - **Response**:
     ```json
     {
       "pokemons": [
         {
            "name": "Arcanine",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
            "powers": "Burn Up,Extreme Speed,Flamethrower"
        },
        {
            "name": "Growlithe",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
            "powers": "Intimidate,Roar,Heat Wave"
        },
        {
            "name": "Pikachu",
            "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            "powers": "Electric,Quick Attack,Volt Tackle"
        }]}
     ```

2. **POST `/powers`**:
   - Submits the user’s chosen Pokémon and selected powers, then compares them with the actual powers of the chosen Pokémon.
   - **Request Body**:
     ```json
     {
       "choiceName": "Pikachu",
       "userPowers": ["Thunderbolt", "Quick Attack", "Volt Tackle"]
     }
     ```
   - **Response**:
     ```json
     {
       "chosenPokemon": {
         "name": "Pikachu",
         "image": "pikachu_image_url",
         "powers": "Thunderbolt,Quick Attack,Volt Tackle"
       },
       "correctPowers": ["Thunderbolt", "Volt Tackle"],
       "correctCount": 2,
       "totalPowers": 3,
       "percentage": 66.67
     }
     ```

---

## UI

Below are some screenshots of the game interface. Uncomment and add your own images as required.

1. **Pokémon Selection Screen**
   - This screen allows users to choose a Pokémon to play with.
   ```html
   <!-- Screenshot of Pokémon Selection screen here -->
