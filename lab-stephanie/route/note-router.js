'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Note = require('../model/note.js');

let noteRouter = (module.exports = new Router());

noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  console.log('hit /api/notes');

  req.body.created = new Date();

  new Note(req.body).save().then(note => res.json(note)).catch(next);
});

noteRouter.get('/api/notes/:id', (req, res, next) => {
  console.log('hit get /api/notes/:id');

  Note.findById(req.params.id).then(note => res.json(note)).catch(next);
});
