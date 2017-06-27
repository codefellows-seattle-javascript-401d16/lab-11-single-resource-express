'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Beer = require('../model/beer.js');

let beerRouter = module.exports = new Router();

beerRouter.post('/api/beers', jsonParser, (req, res) => {
  console.log('hit /api/beers');

  req.body.created = new Date();

  new Beer(req.body)
    .save()
    .then(beer => res.status(201).json(beer))
    .catch(err => {
      res.status(400)
        .send(err);
    });
});

beerRouter.get('/api/beers', (req, res) => {
  console.log('hit /api/beers');

  Beer.find()
    .then(beers => beers.map(beer => beer._id))
    .then(ids => res.status(200).json(ids))
    .catch(err => {
      res.status(404)
        .send(err);
    });
});

beerRouter.get('/api/beers/:id', (req, res) => {
  console.log('hit /api/beers/:id');

  Beer.findById(req.params.id)
    .then(beer => res.status(200).json(beer))
    .catch(err => {
      res.status(404)
        .send(err);
    });
});

beerRouter.put('/api/beers/:id', jsonParser, (req, res) => {
  console.log('hit /api/beers/:id');

  Beer.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(beer => res.status(202).json(beer))
    .catch(err => {
      res.status(404)
        .send(err);
    });
});

beerRouter.delete('/api/beers/:id', (req, res) => {
  console.log('hit /api/beers/:id');

  Beer.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send('deleted'))
    .catch(err => {
      res.status(404)
        .send(err);
    });
});

//secret method to delete all beer objects from DB
beerRouter.delete('/api/beers', (req, res) => {
  console.log('hit /api/beers');

  Beer.remove()
    .then(() => res.status(204).send('deleted'))
    .catch(err => {
      res.status(404)
        .send(err);
    });
});
