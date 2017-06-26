'use strict';

const mongoose = require('mongoose');

const sofaSchema = mongoose.Schema({
  material: {
    type: String,
    enum: ['leather', 'cloth', 'wicker'],
    required: true,
  },
  colors: { type: [String], required: true },
  price: { type: Number, required: true },
  discount: {
    price: {
      type: Number,
      validate: {
        validator: function(v) {
          return v < this.price;
        },
        message: 'Discount must be lower than regular price!',
      },
    },
    endDate: {
      type: Date,
      min: Date.now(),
    },
  },
});

module.exports = mongoose.model('sofa', sofaSchema);
