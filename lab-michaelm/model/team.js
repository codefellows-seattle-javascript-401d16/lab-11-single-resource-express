'use strict';

const mongoose = require('mongoose');

// define a schema for the model
const teamSchema = mongoose.Schema( {
  firstName: {type:String, required: true},
  lastName: {type: String, required: true},
  availabilityDates: [{type: Date, required: true}],
  submitted: {type: Date, default: Date.now},
});

module.exports = mongoose.model('team', teamSchema);
