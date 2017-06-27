'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempArticle;

describe('testing article routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/articles/',() => {
    it('should respond with a new article', () => {
      return superagent.post(`${API_URL}/api/articles`)
      .send({title: 'title', author:'author'})
      .then(res => {
        expect(res.status).toEqual(200);
        tempArticle = res.body;
      });
    });
  });

  describe('testing GET /api/articles',() => {
    it('should respond with an article by id', () => {
      return superagent.get(`${API_URL}/api/articles${tempArticle._id}`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual(tempArticle.title);
      expect(res.body.author).toEqual(tempArticle.author);
      expect(res.body.created).toExist();
      tempArticle = res.body;
    });
    });
  });
  describe('testing GET /api/articles',() => {
    it('should respond with an array of article ids', () => {
      return superagent.get(`${API_URL}/api/articles/`)
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
      console.log(res.body);
    });
    });
  });
  describe('testing PUT by id /api/articles',() => {
    it('should respond with an updated article by id', () => {
      return superagent.put(`${API_URL}/api/articles${tempArticle._id}`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual('updatedtitle');
      expect(res.body.author).toEqual('updatedauthor');
      expect(res.body.created).toExist();
    });
    });
  });
  describe('testing DELETE by id /api/articles',() => {
    it('should delete the article by id', () => {
      return superagent.delete(`${API_URL}/api/articles${tempArticle._id}`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({});
      expect(res.body.artist).toEqual(undefined);
      expect(res.body.title).toEqual(undefined);
    });
    });
  });
  describe('testing to see if non-existant routes return 404',() => {
    it('should return 404', () => {
      return superagent.get(`${API_URL}/api/!articles`)
    .then((err) => {
      expect(err.status).toBe(404);
    });
    });
  });
});
