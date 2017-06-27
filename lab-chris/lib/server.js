'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);


let server;

const app = express();

app.use(require('../route/router.js'));

app.use((err, req, res, next) => {
  console.log('error message', err.message);
  if (err.message.includes('validation failed'))
    return res.sendStatus(400);
  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);
  res.sendStatus(500);
});

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    });
  });
};
