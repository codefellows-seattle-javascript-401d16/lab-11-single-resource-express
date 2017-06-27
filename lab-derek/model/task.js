'use strict';

// TODO: Create a Object Constructor using mongoose that creates a resource with at least 3 properties, it can not have the same properties as the in class sample code
// TODO: Also include two other properties of your choice (like name, creationDate, etc.)


const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  taskName: {type: String, required: true},
  xp: {type: Number, required: true},
  questTask: {type: Boolean, required: true},
  questName: {type: String, required: false},
  created: {type: Date, required: true},
});

module.exports = mongoose.model('task', taskSchema);
