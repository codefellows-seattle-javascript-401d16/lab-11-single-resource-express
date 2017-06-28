'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Article = require('../model/article.js');

let articleRouter = module.exports = new Router();

articleRouter.post('/api/articles', jsonParser, (req, res, next) => {
  new Article(req.body)
    .save()
    .then((article) => res.json(article))
    .catch(next);
});

articleRouter.get('/api/articles/:id', (req, res, next) => {
  console.log('hit get /api/articles/:id');
  Article.findById(req.params.id)
  .then(article => res.json(article))
  .catch(next);
});

articleRouter.get('/api/articles/', (req, res, next) => {
  Article.find({}, '_id')
  .then(article => res.json(article))
  .catch(next);
});

articleRouter.put('/api/articles/:id', jsonParser, (req, res, next) => {

  Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(article => res.json(article))
  .catch(next);
});

articleRouter.delete('/api/articles/:id', (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
  .then(() => res.send('deleted'))
  .catch(next);
});
