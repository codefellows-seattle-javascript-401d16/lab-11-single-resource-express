'use strict';

const mongoose = require('mongoose');

const burgerSchema = mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  stars: {type: Number, required: true},
});

module.exports = mongoose.model('burger', burgerSchema);