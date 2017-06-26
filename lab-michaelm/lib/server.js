'use strict';

// node modules
// npm modules
const express = require('express');
const mongoose = require('mongoose');
// app modules
// module logic
// configure mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI);

let server;

const app = express();
// load middleware
// load routes
app.get('/api/team', (req,res,next) => {
  res.send(/*something here*/);
});

app.use(require('..route/team-router.js'));

// load err handler
app.use((err, req, res, next) => {
  res.sendStatus(500);
  console.error(err);
});

// export server
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
