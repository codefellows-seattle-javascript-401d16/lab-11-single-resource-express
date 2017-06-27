'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Movie = require('../model/movies.js');
const createError = require('http-errors');

let moviesRouter = module.exports = new Router();

moviesRouter.post('/api/movies', jsonParser, (req, res, next) => {
  console.log('hit /api/movies');
  if (!req.body || !req.body.title || !req.body.year || !req.body.genre) {
    return next(new createError.BadRequest());
  }
  req.body.created = new Date();

  new Movie(req.body)
  .save()
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.get('/api/movies/:id', (req, res, next) => {
  console.log('hit get /api/movies/:id');
  Movie.findById(req.params.id)
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.put('/api/movies/:id', jsonParser, (req, res, next) => {
  console.log('hit put /api/movie/:id');
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.delete('/api/movies/:id', (req, res, next) => {
  console.log('hit delete /api/movie/:id');
  Movie.findByIdAndDelete(req.params.id)
  .then(() => res.send('Movie successfully deleted'))
  .catch(next);
});
