'use strict';

const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
  created: {type: Date, default: new Date, required: true},
});

module.exports = mongoose.model('record', recordSchema);
