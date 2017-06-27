'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Team = require('../model/team.js');
const createError = require('http-errors');

let teamRouter = module.exports = new Router();

teamRouter.post('/api/team', jsonParser, (req, res, next) => {
  console.log('hit api/team POST route:\n');
  if(!req.body) return next(new createError.BadRequest());
  new Team(req.body)
  .save()
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.get('/api/team:id', (req, res, next) => {
  console.log('hit api/team GET route:\n');
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.put('/api/team/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/team route\n');
  Team.findByIdAndUpdate(req.params.id, req.body)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.delete('/api/team/:id', (req, res, next) => {
  console.log('hit DELETE /api/team route\n');
  Team.findByIdAndRemove(req.params.id)
  .then(() => res.send('Team member deleted'))
  .catch(next);
});
