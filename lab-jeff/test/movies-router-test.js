'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Movie = require('../model/movies.js');

let tempMovie;
const API_URL = process.env.API_URL;

describe('testing movies routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/movies', () => {
    after(() => Movie.remove({}));

    let data = {
      title: 'The Departed',
      year: '2006',
      genre: 'thriller',
    };

    it('should respond with a movie and 200 status', () => {
      return superagent.post(`${API_URL}/api/movies`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.title).toEqual(data.title);
        expect(res.body.year).toEqual(data.year);
        expect(res.body.genre).toEqual(data.genre);
      });
    });
    it('should reply with a 400', () => {
      return superagent.post(`${API_URL}/api/movies`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('test GET /api/movies/:id', () => {
    afterEach(() => Movie.remove({}));
    beforeEach(() => {
      return new Movie({
        title: 'The Departed',
        year: '2006',
        genre: 'thriller',
      })
      .save()
      .then(movie => {
        tempMovie = movie;
      });
    });
    it('should respond with a movie', () =>  {
      superagent.get(`${API_URL}/api/movies/${tempMovie._id}`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body._id).toEqual(tempMovie._id);
      expect(res.body.title).toEqual(tempMovie.title);
      expect(res.body.year).toEqual(tempMovie.year);
      expect(res.body.genre).toEqual(tempMovie.genre);
    });
    });

    it('should respond with a 404', () => {
      superagent.get(`${API_URL}/api/movies/4`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('test PUT /api/movies/:id', () => {
    afterEach(() => Movie.remove({}));
    beforeEach(() => {
      return new Movie({
        title: 'The Departed',
        year: '2006',
        genre: 'thriller',
      })
      .save()
      .then(movie => {
        tempMovie = movie;
      });
    });

    it('should respond with an updated movie', () => {
      return superagent.put(`${API_URL}/api/movies/${tempMovie._id}`)
      .send({genre: 'drama'})
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempMovie._id);
        expect(res.body.title).toEqual(tempMovie.title);
        expect(res.body.year).toEqual(tempMovie.year);
        expect(res.body.genre).toEqual('drama');

      });
    });
  });
  describe('test DELETE /api/movies/:id', () => {
    afterEach(() => Movie.remove({}));
    beforeEach(() => {
      return new Movie({
        title: 'The Departed',
        year: '2006',
        genre: 'thriller',
      })
      .save()
      .then(movie => {
        tempMovie = movie;
      });
    });

    it('should delete a movie', () => {
      return superagent.delete(`${API_URL}/api/movies/${tempMovie._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
});
