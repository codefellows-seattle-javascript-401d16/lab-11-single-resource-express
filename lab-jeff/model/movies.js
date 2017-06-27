'use strict';

const mongoose = require('mongoose');

const movieSchema = mongoose.Schema( {
  title: {type: String, required: true},
  year: {type: String, required: true},
  genre: {type: String, required: true},
  created: {type: Date, required: true},
});

module.exports = mongoose.model('movies', movieSchema);
