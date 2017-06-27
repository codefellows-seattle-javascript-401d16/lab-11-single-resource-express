'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Waypoint = require('../model/waypoint.js');

let waypointRouter = module.exports = new Router();

waypointRouter.post('/api/waypoints', jsonParser, (req, res, next) => {

  req.body.created = new Date();

  new Waypoint(req.body)
  .save()
  .then(waypoint => res.json(waypoint))
  .catch(next);
});

waypointRouter.get('/api/waypoints/:id', (req, res, next) => {

  Waypoint.findById(req.params.id)
  .then(waypoint => res.json(waypoint))
  .catch(next);
});

waypointRouter.put('/api/waypoints/:id', jsonParser, (req, res, next) => {

  Waypoint.findById(req.params.id)
  .then(waypoint => {
    if(req.body.name) waypoint.name = req.body.name;
    if(req.body.lat) waypoint.lat = req.body.lat;
    if(req.body.long) waypoint.long = req.body.long;
    waypoint.save()
    .then(waypoint => res.json(waypoint))
    .catch(next);
  })
  .catch(next);
});

waypointRouter.delete('/api/waypoints/:id', (req, res, next) => {

  Waypoint.deleteOne({ name: req.params.id })
  .catch(next);
});
