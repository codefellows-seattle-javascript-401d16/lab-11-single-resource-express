'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const heroRouter = require('../route/hero-router');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

let server;
const app = express();

app.get('/api/hello', (req, res, next) => {
  res.send('hello world');
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.use(heroRouter);

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server it up, ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server Doooooown');
      server.isOn = false;
      resolve();
    });
  });
};
