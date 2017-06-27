'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Record = require('../model/record.js');


let recordRouter = module.exports = new Router();

recordRouter.post('/api/records', jsonParser, (req, res, next) => {

  new Record(req.body)
  .save()
  .then(record => res.json(record))
  .catch(next);
});

recordRouter.get('/api/records/:id', (req, res, next) => {

  Record.findById(req.params.id)
  .then(record => res.json(record))
  .catch(next);
});

recordRouter.get('/api/records/', (req, res, next) => {

  Record.find({'_id': {$in: [Schema.Record]}})

  .then(record => res.json(record))
  .catch(next);
});

recordRouter.put('/api/records/:id', jsonParser, (req, res, next) => {

  Record.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(record => res.json(record))
  .catch(next);
});

recordRouter.delete('/api/records/:id', (req, res, next) => {

  Record.findByIdAndRemove(req.params.id)
  .then(() => res.send('deleted'))
  .catch(next);
});
