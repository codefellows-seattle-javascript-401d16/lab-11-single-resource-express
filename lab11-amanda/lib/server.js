'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;

app.use(require('../route/note-router.js'));
app.use((err,req,res,next) => {
  if(err) {
    res.sendStatus(400);
  }
  res.sendStatus(err.status);
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
