'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Note = require('../model/note.js');
const createError = require('http-errors');
const noteRouter = module.exports = new Router();

//POST
noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  if(!req.body){ //do I need this?
    return next(new createError.BadRequest()); //do I need this?
  }

  new Note(req.body)
    .save()
    .then(note => res.json(note))
    .catch(err => next(err)); //new
});

//GET
noteRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => res.json(note))
  .catch(next);
});

//PUT
noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
  console.log('hit PUT /api/notes/:id')
  .then(note => res.json(note))
  .catch(next);
});

//DELETE
noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {
  Note.findByIdAndRemove(req.params.id);
  console.log('hit DELETE /api/notes/:id')
  .then(note => res.send('deleted'))
  .catch(next);
});
