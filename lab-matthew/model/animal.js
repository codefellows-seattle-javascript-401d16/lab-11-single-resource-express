'use strict';

const mongoose = require('mongoose');

//define a schema for my model
const animalSchema = mongoose.Schema({
  name: {type:String, required: true},
  species: {type:String, required: true},
  class: {type:String, required: true},
  created: {type:Date, required: true},
});

module.exports = mongoose.model('animal', animalSchema);
