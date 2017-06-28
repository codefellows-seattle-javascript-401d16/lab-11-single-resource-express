'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');

let noteRouter = module.exports = new Router();

noteRouter.post('/api/user', jsonParser, (req, res, next) => {
  if (req.body.name && req.body.password) {
    new User(req.body)
      .save()
      .then(user => res.json(user))
      .catch(next);
  } else {
    res.sendStatus(404);
  }
});

noteRouter.get('/api/user', (req, res, next) => {
  User.find({})
    .then(users => res.json(users.map(user => user._id)))
    .catch(next);
});

noteRouter.get('/api/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
});

noteRouter.put('/api/user/:id', jsonParser, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      User.findById(user._id)
        .then(newUser => res.json(newUser))
        .catch(next);
    })
    .catch(next);
});

noteRouter.delete('/api/user/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.json(user))
    .catch(next);
});
