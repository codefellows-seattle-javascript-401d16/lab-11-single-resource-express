'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  nickName: {type: String, required: true},
  age: {type: Number},
  id: {type: Number},
});

module.exports = mongoose.model('profile',  profileSchema);
