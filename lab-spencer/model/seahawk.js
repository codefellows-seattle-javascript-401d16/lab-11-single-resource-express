'use strict';

const mongoose = require('mongoose');

const seahawkSchema = mongoose.Schema({
  name: {type: String, required: true},
  height: {type: String, required: true},
  weight: {type: Number, required: true},
  position: {type: String, required: true},
  picture: {type: String, required: true},
});

module.exports = mongoose.model('seahawk', seahawkSchema);
