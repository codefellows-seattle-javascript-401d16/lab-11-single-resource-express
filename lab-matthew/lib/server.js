'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Prommise = Promise;

mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.get('/api/hello', (req, res, next) => {
  res.send('hello universe')
});

app.use(require('../route/animal-router.js'));

app.use((err, req, res, next => {
  res.senddStatus(500);
}));

const serverControl = module.exports = {};

server.Control.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    })
  })
}

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    }
  })
}
