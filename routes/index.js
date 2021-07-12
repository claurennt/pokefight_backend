const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const Game = require("../models/gameSchema");

router.get("/", async (req, res) => {
  const pokedex = req.app.get("pokedex");

  try {
    //map through first 50 pokemon from jsonfile and fetch the pictures from the API
    const newPokedex = pokedex.slice(0, 50).map(async (p) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${p.id}`
      );
      const mergedPokemon = {
        ...p,
        image: data?.sprites?.other?.dream_world?.front_default,
      };

      return mergedPokemon;
    });

    const mergedPokemons = await Promise.all(newPokedex);
    res.json(mergedPokemons);
  } catch (e) {
    console.log(e);
  }
});

// /* GET home page. */ at /pokemon endpoint
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // fetch data from external ap
  const pokedex = req.app.get("pokedex");
  const pokemon = pokedex.find((p) => p.id === Number(id));
  if (!pokemon) {
    return res.status(400).send("Pokemon not found");
  }
  console.log(pokemon);
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const mergedPokemonData = {
      ...pokemon,
      image: data.sprites.other.dream_world.front_default,
    };

    res.json(mergedPokemonData);
  } catch (e) {
    res.json(pokemon);
  }
});

router.post("/game/save", async (req, res) => {
  const { nameFighterOne, nameFighterTwo, winner } = req.body;
  try {
    const newGame = await Game.create({
      nameFighterOne,
      nameFighterTwo,
      winner,
    });
    res.json(newGame);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/game/leaderboard", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
