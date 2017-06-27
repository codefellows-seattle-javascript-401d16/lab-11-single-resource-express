'use strict';




const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');

let userRouter = module.exports = new Router();
userRouter.post('/api/user', jsonParser, (req, res, next) => {

  req.body.created = new Date();
  new User(req.body)
    .save()
    .then(user => res.json(user))
    .catch(next);
});

userRouter.get('/api/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
});

userRouter.put('/api/user/:id', jsonParser, (req, res, next) => {
  console.log('here', req.params.id);
  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user => res.json(user))
    .catch(next);
});
