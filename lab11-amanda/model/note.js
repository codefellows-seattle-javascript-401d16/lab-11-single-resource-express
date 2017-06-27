'use strict';

const mongoose = require('mongoose');

const birthSchema = mongoose.Schema({
  name: {type:String, required: true},
  birthday: {type:Date},
  city: {type:String},
  state: {type:String},
  country: {type:String},
});

module.exports = mongoose.model('note', birthSchema);
