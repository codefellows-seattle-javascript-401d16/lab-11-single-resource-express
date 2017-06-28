'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const gamescoreSchema = mongoose.Schema({
  name: {type:String, required: true},
  score: {type:Number, required: true},
});

// export a model
module.exports = mongoose.model('gamescore', gamescoreSchema);
