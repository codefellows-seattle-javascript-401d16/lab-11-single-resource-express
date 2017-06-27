'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Note = require('../model/note.js');
const noteRouter = module.exports = new Router();

//POST
noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  console.log('POST /api/notes');
  new Note(req.body)
    .save()
    .then(note => res.json(note))
    .catch(next);
});

//GET
noteRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => res.json(note))
  .catch(next);
});

//PUT
noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
