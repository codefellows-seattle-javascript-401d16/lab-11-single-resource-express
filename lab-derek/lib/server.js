'use strict';

// TODO: Create a HTTP Server using express

//node modules
//npm modules

const mongoose = require('mongoose');
const express = require('express');

//app modules
//module logic
//configure mongoose

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/task-router.js'));

//load error handler

app.use((err, req, res, next) => {
  console.log('err', err);
  res.sendStatus(500);
});

//export server

const serverControl = module.exports;

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
      server.isOn = false;
      console.log('server down');
      resolve();
    });
  });
};
