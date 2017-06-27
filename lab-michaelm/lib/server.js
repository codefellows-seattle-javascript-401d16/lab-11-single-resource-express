'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/team-router.js'));

app.use((err, req, res, next) => {
  if(!err){
    res.sendStatus(500);
  }
  res.sendStatus(err.status);
});

const serverOnOff = module.exports = {};

serverOnOff.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () =>{
      console.log('Server is now up on port: ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverOnOff.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Server is now offline');
      server.isOn = false;
      resolve();
    });
  });
};
