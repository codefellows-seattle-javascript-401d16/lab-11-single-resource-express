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

//load middleware
//load routes

app.get('api/hello/', (req, res, next) => {
  res.send('hello world');
});

app.use(require('../route/task-route.js'));

//load error handler

app.use((err, req, res, next) => {
  res.sendStatus(404);
});

//export server

const serverControl = module.exports;

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    server.close(() => {
      server.isOn = false;
      console.log('server down');
      resolve();
    });
  });
};
