'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Seahawk = require('../model/seahawk.js');

let seahawkRouter = module.exports = new Router();

seahawkRouter.post('/api/seahawks', jsonParser, (req, res, next) => {
  console.log('Hit /api/seahawks');

  new Seahawk(req.body)
    .save()
    .then(seahawk => res.json(seahawk))
    .catch(next);
});

seahawkRouter.get('/api/seahawks/:id', jsonParser, (req, res, next) => {
  console.log('Hit get /api/seahawks/:id');
  Seahawk.findById(req.params.id)
    .then(seahawk => res.json(seahawk))
    .catch(next);
});
