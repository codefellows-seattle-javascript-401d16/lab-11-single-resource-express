'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/shoeRouter.js'));

app.use((err, req, res, next) => {
  if (err.message.includes('ObjectId'))
    return res.sendStatus(404);
  if (err.message.includes('validation failed'))
    return res.sendStatus(400);
  res.sendStatus(500);
});

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('Server is up at PORT: ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Server is down');
      server.isOn = false;
      resolve();
    });
  });
};
