'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Sofa = require('../model/sofa.js');

const sofaRouter = new Router();

sofaRouter.post('/api/sofas', jsonParser, (req, res) => {

  console.log('Received POST to /api/sofas');

  new Sofa(req.body)
    .save()
    .then(sofa => res.status(201).json(sofa))
    .catch(err => {
      res.status(400)
         .send(err);
    });
});

sofaRouter.get('/api/sofas/:id', (req, res) => {

  console.log('Received GET to /api/sofas/:id');

  Sofa.findById(req.params.id)
    .then(sofa => res.status(200).json(sofa))
    .catch(() => res.status(404).send());
});

sofaRouter.put('/api/sofas/:id', (req, res) => {

  console.log('Received PUT to /api/sofas/:id');

  Sofa.findByIdAndUpdate(req.params.id, req.body)
    .then(sofa => res.status(202).json(sofa))
    .catch(() => res.status(404).send());
});

sofaRouter.delete('/api/sofas/:id', (req, res) => {

  console.log('Received DELETE to /api/sofas/:id');

  Sofa.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send())
    .catch(() => res.status(404).send());
});

module.exports = sofaRouter;
