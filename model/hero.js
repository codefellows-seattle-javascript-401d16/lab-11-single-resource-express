'use strict';

const mongoose = require('mongoose');

const heroSchema = mongoose.Schema( {
  hero: {type: String, required: true},
  score: {type: Number, required: true},
  player: {type: String, required: true},
  team: {type: String, required: true},
  dateCreated: {type: Date, required: true},
});

module.exports = mongoose.model('hero', heroSchema);
