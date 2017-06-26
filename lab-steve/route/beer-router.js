'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser');
const Beer = require('../model/beer.js');

let beerRouter = module.exports = new Router();

beerRouter.post('/api/beers', jsonParser, (req, res, next) => {
  console.log('hit /api/beers');

  req.body.created = new Date();

  new Beer(req.body)
    .save()
    .then(beer => res.json(beer))
    .catch(next);
});

beerRouter.get('/api/beers:id', (req, res, next) => {
  console.log('hit /api/beers:id');

  Beer.findById(req.params.id)
    .then(beer => res.json(beer))
    .catch(next);
});
