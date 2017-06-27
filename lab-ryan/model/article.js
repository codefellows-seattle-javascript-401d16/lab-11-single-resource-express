'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const articleSchema = mongoose.Schema({
  title: {type:String, required: true},
  author: {type:Date, required: true},
});

// export a model
module.exports = mongoose.model('article', articleSchema);
