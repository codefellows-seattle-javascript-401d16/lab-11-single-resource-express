'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const foodSchema = mongoose.Schema({
  description: {type:String, required: true},
  type: {type:String, required: true},
  timeStamp: {type:Date, required: true},
  foodGroup: {type:String, required: true},
});

// export a model
module.exports = mongoose.model('food', foodSchema);
