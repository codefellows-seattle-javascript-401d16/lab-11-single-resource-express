'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Food = require('../model/food.js');

let foodRouter = module.exports = new Router();

foodRouter.post('/api/foods', jsonParser, (req, res, next) => {
  // console.log('hit /api/foods');

  req.body.timeStamp = new Date();
  // console.log('this is req.body!!!!',req.body);
  new Food(req.body)
  .save()
  .then(food => {
    res.json(food);
    // console.log('this is the food.type ...',food.type);
  })
  .catch(next);
});

foodRouter.get('/api/foods/:id', (req, res, next) => {
  // console.log('hit get /api/foods/:id');
  // console.log(req.params.id);
  if(!req.params.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    // res.end();
    return;
  }
  // console.log('req.params...',req.params);
  Food.findById(req.params.id)
  .then(food => {
    res.json(food);
    // console.log(food);
  })
  .catch(next);
  // console.log(next);
});

foodRouter.put('/api/foods/:id', jsonParser, (req, res, next) => {
  // console.log('hit put /api/foods/:id');
  // console.log('req.params in the put request',req.params);
  if(!req.params.id) {
    res.writeHead(400,{
      'Content-Type':'plain/text',
    });
    res.write('body not found');
    return;
  }

  Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(food => res.json(food))
  .catch(next);
});


foodRouter.delete('/api/foods/:id', (req, res, next) => {
  console.log('this is req.params.id',req.params.id);
  if(!req.params.id) {
    res.writeHead(400,{
      'Content-Type':'plain/text',
    });
    res.write('body not found');
    return;
  }
  Food.remove({id:req.params.id})
  .catch(next);

  // Food.findById(req.params.id)
  // .then((food)=> food.remove( {} ))
  // .catch(next);

});



//   Food.findById(req.params.id)
//   .then(food => res.json(food))
//   .catch(next);
// });
