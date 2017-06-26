'use strict';

const mongoose = require('mongoose');

const instaSchema = mongoose.Schema({
  name: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, required: true},
});

module.exports = mongoose.model('insta', instaSchema);
