const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const getPokeImagesAndName = require("../middlewares/fetchPokeApi");

// router.use(getPokeImagesAndName);
router.get("/", async (req, res) => {
  // display all the pokemons
  // the pokemons need to be a merged object
  // that merged pokemons we need to sent back
  // 10

  const pokedex = req.app.get("pokedex");

  // const pokemon = pokedex.find((p) => p.id === Number(id));
  // if (!pokemon) {
  //   return res.status(400).send("Pokemon not found");
  // }
  // pokedex.map((pok) => {
  // pok.id === Number(id)
  try {
    const newPokedex = pokedex.map(async (p) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${p.id}`
      );
      const mergedPokemon = {
        ...p,
        image: data.sprites.other.dream_world.front_default,
      };
      return mergedPokemon;
    });
    // not working...
    Promise.all(newPokedex).then((results) => {
      console.log(results);
    });
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

module.exports = router;
