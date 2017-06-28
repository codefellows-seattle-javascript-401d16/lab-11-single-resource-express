'use strict';

const mongoose = require('mongoose');

const heroSchema = mongoose.Schema( {
  hero: {type: String},
  score: {type: Number},
  player: {type: String},
  team: {type: String},
  dateCreated: {type: Date},
});

module.exports = mongoose.model('hero', heroSchema);
