const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  nameFighterOne: {type: String, required: true},
  nameFighterTwo: {type: String, required: true},
  winner: {type: String, /*enum: [nameFighterOne, nameFighterTwo],*/ required: true},
});

const Game = mongoose.model('Fighter', gameSchema);

module.exports = Game;