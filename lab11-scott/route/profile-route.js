'use strict';

//this is taking the Router property off of the object express.
// const Router = require('express').Router;
const {Router} =require('express');
const jsonParser = require('body-parser').json();
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
  .save()
  .then(profile => res.json(profile))
  .catch(err => {
    console.log('err: ', err);
    //will modify the errors with the http-errors module
    next(err);
  });
});

profileRouter.get('/api/profile/:id', (req, res, next) => {
  console.log('you hit the GET route');
  Profile.findById(req.params.id)
  .then(profile => res.json(profile))
  .catch(next);
});

profileRouter.put('/api/profile/:id', jsonParser, (req, res, next) => {
  console.log('you hit the PUT route');
  //these are the options that we are defining that are provided by mongoose
  let options = {
    runValidators: true,
    new: true,
  };
//the findByIdAndUpdate is a method on mongoose and it returns a document, the profile i pass in to .then is the document. We run the .json  on the document.
  Profile.findByIdAndUpdate(req.params.id, req.body, options)
  .then(profile => res.json(profile))
  .catch(next);
});

profileRouter.delete('/api/profile/:id', (req, res, next) => {
  console.log('you hit the DELETE route');
  Profile.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
