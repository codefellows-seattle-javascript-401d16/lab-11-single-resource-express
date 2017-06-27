const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

let server;

app.use(require('../route/sofa-route.js'));

const serverController =  {

  start: () => {
    return new Promise((resolve) => {
      server = app.listen(process.env.PORT, () => {
        console.log(`Sofaserver listening on port ${process.env.PORT}`);
        server.isOn = true;
        resolve();
      });
    });
  },

  stop: () => {
    return new Promise((resolve) => {
      server.close(() => {
        console.log('Sofaserver stopped.');
        server.isOn = false;
        resolve();
      });
    });
  },
};

module.exports = serverController;
