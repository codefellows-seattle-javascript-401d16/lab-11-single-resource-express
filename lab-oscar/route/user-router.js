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

// noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
//     console.log('hit /api/notes')
//
//     req.body.created = new Date()
//
//     new Note(req.body)
//     .save()
//     .then(note => res.json(note))
//     .catch(next)
// })
//
// noteRouter.get('/api/notes/:id', (req, res, next) => {
//   console.log('hit get /api/notes/:id')
//
//   Note.findById(req.params.id)
//   .then(note => res.json(note))
//   .catch(next)
// })
