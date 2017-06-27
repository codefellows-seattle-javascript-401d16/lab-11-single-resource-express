'use strict';
// node modules (none needed in this app)
// npm modules
const express = require('express');
const mongoose = require('mongoose');
// app modules
// module logic
// configure mongoose
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI)

let server;
const app = express()
// load middleware
// load routes
app.get('/api/hello', (req, res, next) => {
  res.send('hello world')
})

app.use(require('../route/car-store-router.js'))

// loader err handler
app.use((err, req, res, next) => {
  console.log('err', err);
  res.sendStatus(500)
})

// export server
const serverControl = module.exports = {}

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT)
      server.isOn = true;
      resolve()
    })
  })
}

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down')
      server.isOn = false;
      resolve()
    })
  })
}
