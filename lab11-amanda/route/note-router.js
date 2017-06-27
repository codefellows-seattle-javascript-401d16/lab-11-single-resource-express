'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Note = require('../model/note.js');

let noteRouter = module.exports = new Router();

//POST
noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  console.log('hit /api/notes');
  new Note(req.body)
    .save()
    .then(note => res.json(note))
    .catch(next);
});

//GET
noteRouter.get('/api/notes/:id', (req, res, next) => {
  console.log('hit get /api/notes/:id');
  Note.findById(req.params.id)
  .then(note => res.json(note))
  .catch(next);
});
