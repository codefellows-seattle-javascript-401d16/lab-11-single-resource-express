'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
//configure mongoose
mongoose.Promise = Promise;
//connecting mongoose to mongodb
mongoose.connect(process.env.MONGODB_URI);
let server;

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server is up on ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server shut down');
      server.isOn = false;
      resolve();
    });
  });
};
