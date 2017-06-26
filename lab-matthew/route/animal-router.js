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

animalRouter.get('api/animals/:id', (req, res, next) => {
  console.log('hit get /apit/animals:id');

  Animal.findById(req.params.id)
  .then(animal => res.json(animal))
  .catch(next);
});
