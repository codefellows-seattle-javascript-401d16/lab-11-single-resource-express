'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const heroRouter = require('../route/hero-router.js');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(heroRouter);


app.use((err, req, res, next) => {
  res.sendStatus(404);
});


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
