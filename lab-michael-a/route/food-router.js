'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Food = require('../model/food.js');

let foodRouter = module.exports = new Router();

foodRouter.post('/api/foods', jsonParser, (req, res, next) => {
  console.log('hit /api/foods');

  req.body.created = new Date();

  new Food(req.body)
  .save()
  .then(food => res.json(food))
  .catch(next);
});

foodRouter.get('/api/foods/:id', (req, res, next) => {
  console.log('hit get /api/foods/:id');
  if(!req.params.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    // res.end();
    return;
  }
  Food.findById(req.params.id)
  .then(food => res.json(food))
  .catch(next);
  console.log(next);
});

// foodRouter.put('/api/foods', (req, res, next) => {
//   console.log('hit put /api/foods/:id');
//
//   if(!req.body) {
//     res.writeHead(400,{
//       'Content-Type':'plain/text',
//     });
//     res.write('body not found');
//     return;
//   }



  Food.findById(req.params.id)
  .then(food => res.json(food))
  .catch(next);
});
