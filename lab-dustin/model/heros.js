'use strict';

const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
  name: {type:String, required: true},
  power: {type:String, required: true},
  dateCreated: {type:String, required: true},
});

module.exports = mongoose.model('hero', heroSchema);
