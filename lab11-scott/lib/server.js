'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
//configure mongoose
mongoose.Promise = Promise;
//connecting mongoose to mongodb with uri path in .env
mongoose.connect(process.env.MONGODB_URI);
let server;

const serverControl = module.exports = {};

//invoke app.use with the path that came in on profile-route
app.use(require('../route/profile-route.js'));
//if path is bad, send error, otherwise it goes back to method using next.
app.use((err, req, res, next) => {
  console.log('hit app.use');
  return res.sendStatus(404);
});

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server is up on', process.env.PORT, '\n');
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('\nserver shut down');
      server.isOn = false;
      resolve();
    });
  });
};
