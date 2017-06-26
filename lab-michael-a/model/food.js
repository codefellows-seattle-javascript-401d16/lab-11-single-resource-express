'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const foodSchema = mongoose.Schema({
  content: {type:String, required: true},
  created: {type:Date, required: true},
});

// export a model
module.exports = mongoose.model('food', foodSchema);
