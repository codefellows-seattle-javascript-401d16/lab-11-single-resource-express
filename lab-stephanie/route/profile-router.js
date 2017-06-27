'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Profile = require('../model/profile.js');

let profileRouter = (module.exports = new Router());

profileRouter.post('/api/profiles', jsonParser, (req, res, next) => {
  req.body.created = new Date();

  new Profile(req.body).save().then(profile => res.json(profile)).catch(next);
});

profileRouter.get('/api/profiles/:id', (req, res, next) => {
  Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(next);
});

profileRouter.put('/api/profiles/:id', (req, res, next) => {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(profile => res.json(profile))
    .catch(next);
});

profileRouter.delete('/api/profiles/:id', (req, res, next) => {
  Profile.findByIdAndRemove(req.params.id)
    .then(res.send('profile deleted'))
    .catch(next);
});
