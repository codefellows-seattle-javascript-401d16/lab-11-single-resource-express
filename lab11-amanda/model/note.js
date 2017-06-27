'use strict';

const mongoose = require('mongoose');

// define a schema for your model
// const noteSchema = mongoose.Schema({
//   content: {type:String, required: true},
//   created: {type:Date, required: true},
// });

const birthSchema = mongoose.Schema({
  name: {type:String, required: true},
  birthday: {type:Date},
  city: {type:String},
  state: {type:String},
  country: {type:String},
});


module.exports = mongoose.model('note', birthSchema);
