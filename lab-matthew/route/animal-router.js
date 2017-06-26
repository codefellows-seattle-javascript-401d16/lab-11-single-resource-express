'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Animal = require('../model/animal.js');

let animalRouter = module.exports = new Router();

animalRouter.post('/api/animals', jsonParser, (req, res, next) => {
  console.log('hit /api/animals');

  req.body.created = new Date();

  new Animal(req.body)
  .save()
  .then(animal => res.json(animal))
  .catch(next);
});

animalRouter.get('/api/animals/:id', (req, res, next) => {
  console.log('hit get /api/animals:id');

  Animal.findById(req.params.id)
  .then(animal => res.json(animal))
  .catch(next);
});

animalRouter.put('/api/animals/:id', jsonParser, (req, res, next) => {
  console.log('hit put /api/animals:id');
  Animal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(animal => res.json(animal))
  .catch(next);
});

animalRouter.delete('/api/animals/:id', (req, res, next) => {
  console.log('hit delete /api/animals:id');
  Animal.findByIdAndRemove(req.params.id)
  .then(() => res.send('Animal released to the wild (deleted)'))
  .catch(next);
});
