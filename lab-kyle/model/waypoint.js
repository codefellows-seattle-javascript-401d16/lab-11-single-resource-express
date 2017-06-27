'use strict';

const mongoose = require('mongoose');

const waypointSchema = mongoose.Schema({
  name: {type: String, required: true},
  lat: {type: Number, required: true},
  long: {type: Number, required: true},
});

module.exports = mongoose.model('waypoint', waypointSchema);
