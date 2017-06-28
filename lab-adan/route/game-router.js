'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const GameScore = require('../model/gamescore.js');

let gameRouter = module.exports = new Router();

gameRouter.post('/api/gamescore', jsonParser, (req, res, next) => {
  console.log('hit /api/gamescore');
  req.body.created = new Date();

  new GameScore(req.body)
  .save()
  .then(gamescore => res.json(gamescore))
  .catch(next);
});
gameRouter.get('/api/gamescore',(req, res, next) => {
  GameScore.find({})
  .then(gamescore => res.json(gamescore))
  .catch(next);

});
gameRouter.get('/api/gamescore/:id', (req, res, next) => {
  console.log('hit get /api/gamescore/:id');
  GameScore.findById(req.params.id)
  .then(gamescore => res.json(gamescore))
  .catch(next);
});
gameRouter.put('/api/game/:id', jsonParser, (req, res, next) => {
  GameScore.update({_id: req.params.id}, {name: req.body.name, score: req.body.score})
    .then(() => res.json(req.body)) // because update doesnt return the updated record
    .catch(next);
});

gameRouter.delete('/api/game/:id', (req, res, next) => {
  GameScore.deleteOne({_id: req.params.id})
    .then(() => res.sendStatus(200))
    .catch(next);
});
