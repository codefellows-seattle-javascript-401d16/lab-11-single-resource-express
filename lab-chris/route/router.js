'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Player = require('../model/player.js');

let playerRouter = module.exports = new Router();

playerRouter.post('/api/players', jsonParser, (req, res, next) => {

  req.body.created = new Date();

  new Player(req.body)
    .save()
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.get('/api/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.put('/api/players/:id', jsonParser, (req, res, next) => {

  Player.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.delete('/api/players/:id', (req, res, next) => {

  Player.findByIdAndRemove(req.params.id)
    .then(() => res.send(`${req.params.id} deleted`))
    .catch(next);
});
