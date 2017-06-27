'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

const serverController = module.exports = {};

app.use(require('../route/hero-router.js'));

// app.use((err, req, res, next) => {
//   res.sendStatus(500)
//   .catch(next);
// });

serverController.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server is running on', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverController.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Server is no longer running');
      server.isOn = false;
      resolve();
    });
  });
};
