'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser');
const Profile = require('../model/profile.js');

//export the Router
let profileRouter = module.exports = new Router();

profileRouter.post('/api/profile', jsonParser, (req, res, next) => {
  console.log('you hit the POST route');
  if (!req.body) {
    res.status(400);
  }
  //create a new profile by passing in the req body
  new Profile(req.body)
  .then(profile => res.json(profile))
  .catch(next);

});
