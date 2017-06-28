'use strict';

const express = require('express');
const mongoose = require('mongoose');
const MLAB_URI = `mongodb://${process.env.MUSER}:${process.env.MPASS}@ds1${process.env.MPORT}.mlab.com:${process.env.MPORT}/express_api_1`;

mongoose.Promise = Promise;
mongoose.connect(MLAB_URI);

let server;
const app = express();

app.use(require('../route/user-router.js'));

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
