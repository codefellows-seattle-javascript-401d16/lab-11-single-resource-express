'use strict';

const express = require('express');
let server;
const app = express();

app.get('/api/hello', (req, res, next) => {
  res.send('hello world');
});

app.use((err, req, res, next) => {
  console.log('ERROR', err);
  res.sendStatus(500);
});

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise(resolve => {
    server = app.listen(process.env.PORT, () => {
      console.log('Server up localhost:', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise(resolve => {
    server.close(() => {
      console.log('Server down');
      server.isOn = false;
      resolve();
    });
  });
};
