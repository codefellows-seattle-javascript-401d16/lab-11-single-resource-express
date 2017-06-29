'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Shoe = require('../model/shoe.js');

let shoeRouter = module.exports = new Router();

shoeRouter.post('/api/shoes', jsonParser, (req, res, next) => {
  new Shoe(req.body).save()
    .then((shoe) => res.json(shoe))
    .catch(next);
});

shoeRouter.get('/api/shoes/:id', (req, res, next) => {
  Shoe.findById(req.params.id)
    .then((shoe) => res.json(shoe))
    .catch(next);
});

shoeRouter.put('/api/shoes/:id', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Shoe.findByIdAndUpdate(req.params.id, req.body, options)
    .then((shoe) => res.json(shoe))
    .catch(next);
});

shoeRouter.delete('/api/shoes/:id', (req, res, next) => {
  Shoe.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
