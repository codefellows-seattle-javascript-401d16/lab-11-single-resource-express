'use strict';

const mongoose = require('mongoose');

//define schema
const beerSchema = mongoose.Schema({
  content: {type:String, required: true},
  created: {type:Date, required: true},
});

//export a model
module.exports = mongoose.model('beer', beerSchema);
