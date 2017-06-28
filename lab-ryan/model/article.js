'use strict';

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {type:String, required: true},
  author: {type:String, required: true},
  created: {type:Date, default: new Date, required: true},
});

module.exports = mongoose.model('article', articleSchema);
