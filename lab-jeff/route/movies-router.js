'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Movie = require('../model/movies.js');
const createError = require('http-errors');

let moviesRouter = module.exports = new Router();

moviesRouter.post('/api/movies', jsonParser, (req, res, next) => {
  console.log('hit POST /api/movies');
  if (!req.body || !req.body.title || !req.body.year || !req.body.genre) {
    return next(new createError(400, 'Bad Request'));
  }
  req.body.timestamp = new Date();

  new Movie(req.body)
  .save()
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.get('/api/movies/:id', (req, res, next) => {
  console.log('hit GET /api/movies/:id');
  Movie.findById(req.params.id)
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.put('/api/movies/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/movie/:id');

  let options = {
    runValidators: true,
    new: true,
  };
  Movie.findByIdAndUpdate(req.params.id, req.body, options)
  .then(movie => res.json(movie))
  .catch(next);
});

moviesRouter.delete('/api/movies/:id', (req, res, next) => {
  console.log('hit DELETE /api/movie/:id');
  Movie.findByIdAndRemove(req.params.id)
  .then(() => res.send(204))
  .catch(next);
});
