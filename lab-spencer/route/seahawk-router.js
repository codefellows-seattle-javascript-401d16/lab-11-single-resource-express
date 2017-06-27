'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Seahawk = require('../model/seahawk.js');

let seahawkRouter = module.exports = new Router();

seahawkRouter.post('/api/seahawks', jsonParser, (req, res, next) => {
  new Seahawk(req.body)
    .save()
    .then(seahawk => res.json(seahawk))
    .catch(next);
});

seahawkRouter.get('/api/seahawks', (req, res, next) => {
  Seahawk.find({})
    .then(seahawk => res.json(seahawk))
    .catch(next);
});

seahawkRouter.get('/api/seahawks/:id', (req, res, next) => {
  Seahawk.findById(req.params.id)
    .then(seahawk => res.json(seahawk))
    .catch(next);
});

seahawkRouter.put('/api/seahawks/:id', jsonParser, (req, res, next) => {
  Seahawk.update({_id: req.params.id}, {name: req.body.name, height: req.body.height, weight: req.body.weight, position: req.body.position, picture: req.body.picture})
    .then(seahawk => res.json(seahawk))
    .catch(next);
});

seahawkRouter.delete('/api/seahawks/:id', (req, res, next) => {
  Seahawk.remove({_id: req.params.id})
    .then()
    .catch(next);
});
