'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  nickName: {type: String, required: true, unique: true},
  age: {type: Number},
});
//the first argument is the name you want the collection to be called. {profile}
module.exports = mongoose.model('profile',  profileSchema);

//you can add instance methods / validation / hooks to profileSchema
