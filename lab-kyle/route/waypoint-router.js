'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Waypoint = require('../model/waypoint.js');

let waypointRouter = module.exports = new Router();

waypointRouter.post('/api/waypoints', jsonParser, (req, res, next) => {
  console.log('hit /api/waypoints');

  req.body.created = new Date();

  new Waypoint(req.body)
  .save()
  .then(waypoint => res.json(waypoint))
  .catch(next);
});

waypointRouter.get('/api/waypoints/:id', (req, res, next) => {
  console.log('hit get /api/waypoints/:id');

  Waypoint.findById(req.params.id)
  .then(waypoint => res.json(waypoint))
  .catch(next);
});
