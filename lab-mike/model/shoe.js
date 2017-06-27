'use strict';

const mongoose = require('mongoose');

const shoeSchema = mongoose.Schema({
  brand: {type:String, required: true},
  color: {type:String, required: true},
  size: {type:Number, required: true},
});

module.exports = mongoose.model('shoe', shoeSchema);
