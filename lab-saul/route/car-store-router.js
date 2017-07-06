'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Car = require('../model/car-store.js');
const createError = require('http-errors');

let carRouter = module.exports = new Router();

carRouter.post('/api/cars', jsonParser, (req, res, next) => {
  console.log('hit /api/cars');
  if(!req.body.make){
    return next(new createError.BadRequest());
  }
  new Car(req.body)
    .save()
    .then(car => res.json(car))
    .catch(next);
});

carRouter.get('/api/cars/:id', (req, res, next) => {
  console.log('hit get /api/cars/:id');

  Car.findById(req.params.id)
    .then(car => res.json(car))
    .catch(next);
});

carRouter.put('/api/cars/:id', jsonParser, (req, res, next) =>{
  console.log('hit put /api/cars');

  Car.findOneAndUpdate(req.params.id, req.body,{new: true})
    .then(car => res.json(car))
    .catch(next);
});

carRouter.delete('/api/cars/:id', jsonParser, (req, res, next) => {
  console.log('hit delete /api/cars');
  console.log(req.params.id);
  Car.findByIdAndRemove(req.params.id)
    .then(car => {
      console.log(car);
      res.json(car);
    })
    .catch(next);
});
