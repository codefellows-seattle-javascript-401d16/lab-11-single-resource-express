'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Hero = require('../model/hero.js');

let heroRouter = module.exports = new Router();

heroRouter.post('/api/heros', jsonParser, (req, res, next) => {
  req.body.dateCreated = new Date();

  new Hero(req.body)
  .save()
  .then(hero => res.json(hero))
  .catch(next);
});

heroRouter.get('/api/heros/:id', (req, res, next) => {
  Hero.findById(req.params.id)
  .then(hero => res.json(hero))
  .catch(next);
});

heroRouter.put('/api/heros/:id', jsonParser, (req, res, next) => {
  Hero.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(hero => res.json(hero))
  .catch(next);
});

heroRouter.delete('/api/heros/:id', (req, res, next) => {
  Hero.findByIdAndRemove(req.params.id)
  .then(res.sendStatus(204))
  .catch(next);
});
