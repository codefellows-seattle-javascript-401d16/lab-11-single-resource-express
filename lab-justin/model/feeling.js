'use strict';

const mongoose = require('mongoose');


const feelingSchema = mongoose.Schema({
  name: {type:String, required: true},
  age: {type:Number, required: true},
  feeling: {type:String, required: true},
  created: {type:Date, required: true},
});

module.exports = mongoose.model('feeling', feelingSchema);
