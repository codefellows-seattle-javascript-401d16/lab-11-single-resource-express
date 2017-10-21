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
<<<<<<< HEAD
    server = app.listen(process.env.PORT, () => { 
=======
    server = app.listen(process.env.PORT, () => {
>>>>>>> 023572297284389f4dc43e81421664c12e39cb06
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
