'use strict'

const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  content: {type:Sting, required: true}
  created: {type:Date, required: true}
})

module.exports = mongoose.model('note', noteSchema)
