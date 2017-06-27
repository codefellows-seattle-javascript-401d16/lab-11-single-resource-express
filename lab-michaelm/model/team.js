'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema( {
  firstName: {type:String, required: true},
  lastName: {type: String, required: true},
  availabilityDate: {type: String, required: true},
  submitted: {type: Date, default: Date.now},
});

module.exports = mongoose.model('team', teamSchema);
