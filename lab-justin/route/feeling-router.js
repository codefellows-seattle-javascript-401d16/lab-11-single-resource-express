'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Feeling = require('../model/feeling.js');
const createError = require('http-errors');

let feelingRouter = module.exports = new Router();

feelingRouter.post('/api/feeling', jsonParser, (req, res, next) => {
  console.log('hit /api/feeling');
  if (!req.body || !req.body.name || !req.body.age || !req.body.feeling){
    return next(new createError.BadRequest());
  }
  req.body.created = new Date();

  new Feeling(req.body)
  .save()
  .then(feeling => res.json(feeling))
  .catch(next);
});

feelingRouter.get('/api/feeling/:id', (req, res, next) => {
  console.log('hit get /api/feeling/:id');

  Feeling.findById(req.params.id)
  .then(feeling => res.json(feeling))
  .catch(next);
});

feelingRouter.put('/api/feeling/:id', jsonParser, (req, res, next) => {
  console.log('hit put /api/feeling/:id');
  Feeling.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(feeling => res.json(feeling))
  .catch(next);
});

feelingRouter.delete('/api/feeling/:id', (req, res, next) => {
  console.log('hit delete /api/feeling/:id');
  Feeling.findByIdAndRemove(req.params.id)
  .then(() => res.send('(deleted)'))
  .catch(next);
});
