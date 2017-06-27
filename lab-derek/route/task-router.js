'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Task = require('../model/task.js');

let taskRouter = module.exports = new Router();

taskRouter.post('/api/tasks', jsonParser, (req, res, next) => {
  console.log('hit /api/tasks');

  req.body.created = new Date();

  new Task(req.body)
  .save()
  .then(task => res.json(task))
  .catch(next);
});

taskRouter.get('/api/tasks/:id', (req, res, next) => {
  console.log('hit /api/tasks:id');

  Task.findById(req.params.id)
  .then(task => res.json(task))
  .catch(next);
});

taskRouter.get('/api/tasks', (req, res, next) => {
  Task.find({}, '_id')
  .then(task => res.json(task))
  .catch(next);
});

taskRouter.put('/api/tasks/:id', jsonParser, (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(task => res.json(task))
  .catch(next);
});

taskRouter.delete('/api/tasks/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
  .then(() => res.send('task deleted'))
  .catch(next);
});

// TODO: use the body-parser express middleware to on POST and PUT routes
// TODO: save your data using the storage module with file system persistence from last week


// /api/resource-name
//
// TODO: POST request - pass data as stringified json in the body of a post request to create a resource /api/resource-name/:id
//
// TODO: GET request - pass the id of a resource though the query string to fetch a resource
// TODO: PUT request - pass data as stringified json in the body of a put request to update a resource
// TODO: DELETE request - pass the id of a resource though the query string to delete a resource
