'use strict';

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/seahawk-router.js'));

app.use((err, req, res, next) => {
  console.log('MIDDLEWERROR', err);
  res.sendStatus(500);
});

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise(resolve => {
    server = app.listen(process.env.PORT, () => {
      console.log('Server up on localhost:', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise(resolve => {
    server.close(() => {
      console.log('Server down');
      server.isOn = false;
      resolve();
    });
  });
};
