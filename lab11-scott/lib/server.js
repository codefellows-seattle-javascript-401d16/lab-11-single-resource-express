'use strict';

// require('dotenv').config({path: `${__dirname}/../.test.env`});
const express = require('express');
//app creates the server
const app = express();
const mongoose = require('mongoose');
//configure mongoose to accept promises
mongoose.Promise = Promise;
//connecting mongoose to mongodb with uri path in .env
mongoose.connect(process.env.MONGODB_URI);
let server;

//invoke app.use with the path that came in on profile-route
//app.use tells express to apply a middle ware. This is saying add our routes to the server as the middleware.
app.use(require('../route/profile-route.js'));

app.use(require('../lib/error-middleware.js'));

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if (!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        console.log('server is up on', process.env.PORT, '\n');
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        console.log('\nserver shut down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
