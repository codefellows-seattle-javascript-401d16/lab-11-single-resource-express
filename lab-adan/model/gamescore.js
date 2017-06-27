'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const gameSchema = mongoose.Schema({
  name: {type:String, required: true},
  score: {type:Number, required: true},
});

// export a model
module.exports = mongoose.model('game', gameSchema);
