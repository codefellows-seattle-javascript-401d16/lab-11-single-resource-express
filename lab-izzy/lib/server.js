'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);


let server;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(require('../route/insta-router.js'));

app.use(require('./error-middleware.js'));
app.use((err, req, res, next) => {
  res.sendStatus(500);
});


const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        console.log('servin up some booya yall', process.env.PORT);
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
    if(server && server.isOn){
      server.close(() => {
        console.log('server down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
