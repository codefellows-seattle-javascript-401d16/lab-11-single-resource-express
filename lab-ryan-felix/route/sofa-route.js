
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Sofa = require('../model/sofa.js');

const sofaRouter = new Router();

sofaRouter.post('/api/sofas', jsonParser, (req, res) => {

  console.log('Received POST to /api/sofas');

  new Sofa(req.body)
    .save()
    .then(sofa => res.json(sofa))
    .catch(err => {
      res.status(400)
         .send(err);
    });

});

module.exports = sofaRouter;
