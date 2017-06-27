'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  created: { type: Date, required: false },
  employeeID: { type: String, required: false },
  dob: { type: Date, required: false }
});

module.exports = mongoose.model('profile', profileSchema);
