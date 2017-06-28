'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Burger = require('../model/burger.js');


let burgerRouter = module.exports = new Router();

burgerRouter.get('/api/burgers/:id', jsonParser, (req, res, next) => {
  Burger.findById(req.params.id)
    .then(burger => res.json(burger))
    .catch(next);
});

burgerRouter.post('/api/burgers', jsonParser, (req, res, next) => {
  new Burger(req.body)
    .save()
    .then((burger) => res.json(burger))
    .catch(next);
});

burgerRouter.put('/api/burgers/:id', jsonParser, (req, res, next) => {
  let options = {
    runValidators: true,
    new: true,
  };

  Burger.findByIdAndUpdate(req.params.id, req.body, options)
    .then(burger => res.json(burger))
    .catch(next);
});

burgerRouter.delete('/api/burgers/:id', jsonParser, (req, res, next) => {
  Burger.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});