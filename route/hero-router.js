'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json;
const Hero = require('../model/hero.js');

let heroRouter = module.exports = new Router();

heroRouter.post('/api/hero', jsonParser, (req, res, next) => {
  req.body.dateCreated = new Date();

  new Hero(req.body)
  .save()
  .then(hero => res.json(hero))
  .catch(next);
});

heroRouter.get('/api/hero/:id', (req, res, next) => {
  Hero.findByI(req.params.id)
  .then(hero => res.json(hero))
  .catch(next);
});
