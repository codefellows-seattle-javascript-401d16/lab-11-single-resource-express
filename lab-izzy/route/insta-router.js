'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Insta = require('../model/insta.js');

let instaRouter = module.exports = new Router();

instaRouter.post('/api/instas', jsonParser, (req, res, next) => {
  console.log('hit /api/instas');

  req.body.created = new Date();

  new Insta(req.body)
    .save()
    .then(insta => res.json(insta))
    .catch(next);
});

instaRouter.get('/api/instas/:id', (req, res, next) => {
  console.log('hit /api/instas/:id');

  Insta.findById(req.params.id)
    .then(insta => res.json(insta))
    .catch(next);
});
