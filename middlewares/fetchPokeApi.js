const axios = require("axios");
const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
let jsonData = require("../data/file.json");
const app = express();
app.use(express.json());

const fs = require("fs");

let pokeImages = [];

const getPokeImagesAndName = async (req, res, next) => {
  let id = 1;
  while (id < 50) {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((data) =>
        pokeImages.push({
          name: data.data.name,
          imageUrl: data.data.sprites.other.dream_world.front_default,
        })
      )
      .catch((err) => next(err));
    id++;
  }
  fs.readFile(
    "../pokefight_backend/data/file.json",
    "utf8",
    (err, data, req, next) => {
      if (err) {
        return console.log(err);
      }
      obj = JSON.parse(data);

      const result = obj.find((o1) => {
        return o1.name.english === "Bulbasaur";
      });

      console.log(result);
    }
  );
  req.pokeImages = pokeImages;
  next();
};

module.exports = getPokeImagesAndName;
// readLocalJsonFile,
