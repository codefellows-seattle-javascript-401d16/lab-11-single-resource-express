'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Note = require('../model/note.js');

let noteRouter = module.exports = new Router();

noteRouter.post('/api/notes', jsonParser, (req, res, next) => {

  req.body.created = new Date();

  new Note(req.body)
    .save()
    .then(note => res.json(note))
    .catch(next);
});

noteRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
});

noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {

  Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(note => res.json(note))
    .catch(next);
});

noteRouter.delete('/api/notes/:id', (req, res, next) => {

  Note.findByIdAndRemove(req.params.id)
    .then(() => res.send(`${req.params.id} deleted`))
    .catch(next);
});
