'use strict';

'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Article = require('../model/article.js');

let articleRouter = module.exports = new Router();

articleRouter.post('/api/articles', jsonParser, (req, res, next) => {
  console.log('hit /api/articles');

  req.body.created = new Date();

  new Article(req.body)
    .save()
    .then(article => res.json(article))
    .catch(next);
});

articleRouter.get('/api/articles/:id', (req, res, next) => {
  console.log('hit get /api/articles/:id');

  Article.findById(req.params.id)
  .then(article => res.json(article))
  .catch(next);
});
