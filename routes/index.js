const express = require('express');
const router = express.Router();
let jsonData = require('../file.json');
const axios = require('axios');

const fetchData = axios
  .get('https://pokeapi.co/api/v2/pokemon?&limit=1118')
  .then((data) => {
    console.log(data.data.results);
  });

// /* GET home page. */ at /pokemon endpoint
router.get('/', (req, res, next) => {
  // fetch data from external api
  res.send(jsonData);
});

module.exports = router;
