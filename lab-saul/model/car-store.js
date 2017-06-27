'use strict';

const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  year: {type: String, required: true},
  color: {type: String, required: true},
  type: {type: String, required: true},
});

module.exports = mongoose.model('car', carSchema);
