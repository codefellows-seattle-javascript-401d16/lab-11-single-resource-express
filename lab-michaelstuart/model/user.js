'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: {type: String, required: true },
  posts: [{
    title: { type: String },
    content: { type: String },
    created: { type: Date },
  }],
});

module.exports = mongoose.model('user', userSchema);
