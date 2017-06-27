'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/movies-router.js'));

app.use((err, req, res, next) => {
  if(!err) {
    res.sendStatus(500);
  }
  res.sendStatus(err.status);
});
