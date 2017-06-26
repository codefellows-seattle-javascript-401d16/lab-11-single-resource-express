'use strict';

const mongoose = require('mongoose');

//define schema
const beerSchema = mongoose.Schema({
  name: {type:String, required: true},
  grain: {type:String, required: true},
  hops: {type:String, required: true},
  yeast: {type:String, required: true},
  created: {type:Date, required: true},
});

//export a model
module.exports = mongoose.model('beer', beerSchema);
